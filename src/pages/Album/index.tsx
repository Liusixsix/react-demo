import React, { Component, useState, useEffect, useRef, useCallback } from "react";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import Scroll from "../../baseUI/scroll";
import Header from '../../baseUI/header'
import { getAlbumList } from "./store/actionCreators";
import "./index.scss";

//顶部的高度
export const HEADER_HEIGHT: number = 45;

export const Album = (props) => {

  const { currentAlbum } = props
  const { getAlbumDataDispatch } = props;
  const [showStatus, setShowStatus] = useState(true);
  const [title, setTitle] = useState("歌单");
  const [isMarquee, setIsMarquee] = useState(false);
  const id = props.match.params.id;

  const headerEl = useRef()

  useEffect(() => {
    getAlbumDataDispatch(id)
  }, [getAlbumDataDispatch, id])

  const handleScroll = useCallback((pos) => {
    let minScrollY = -HEADER_HEIGHT
    let percent = Math.abs(pos.y / minScrollY)
    let headerDom: HTMLDivElement = headerEl.current
    if (pos.y < minScrollY) { //滚动超出header高度
        headerDom.style.backgroundColor = '#d44439'
        headerDom.style.opacity = Math.min(1, (percent - 1) / 2).toString()
        setTitle(currentAlbum && currentAlbum.name)
        setIsMarquee(true)
    } else {
        headerDom.style.backgroundColor = "";
        headerDom.style.opacity = '1'
        setTitle('歌单')
        setIsMarquee(false)
    }
  }, [currentAlbum])


  const handleBack = () => {
    return setShowStatus(false)
  }

  return (
    <CSSTransition
      in={showStatus}
      timeout={500}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={props.history.goBack}
    >
      <div className="album-container">
        <Header ref={headerEl} title={title} isMarquee={isMarquee} handleClick={handleBack}></Header>

      </div>
    </CSSTransition>
  );
};

const mapStateToProps = (state) => ({
  currentAlbum: state.album.currentAlbum
});

const mapDispatchToProps = (dispatch) => {
  return {
    getAlbumDataDispatch(id) {
      dispatch(getAlbumList(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Album));
