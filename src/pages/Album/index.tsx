import React, { Component, useState, useEffect, useRef, useCallback } from "react";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import classnames from 'classnames'
import Scroll from "../../baseUI/scroll";
import Header from '../../baseUI/header'
import AlbumDetail from '../../components/album-detail/index';
import MusicNote from "../../baseUI/music-note";
import { getAlbumList } from "./store/actionCreators";
import {isEmptyObject} from '../../utils/index'

import "./index.scss";

//顶部的高度
export const HEADER_HEIGHT: number = 45;

export const Album = (props) => {

  const { currentAlbum,songCount } = props
  const { getAlbumDataDispatch } = props;
  const [showStatus, setShowStatus] = useState(true);
  const [title, setTitle] = useState("歌单");
  const [isMarquee, setIsMarquee] = useState(false);
  const id = props.match.params.id;

  const headerEl = useRef()
  const musicNoteRef = useRef<any>()

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


  const musicAnimation = (x , y) => {
    musicNoteRef.current.startAnimation({x,y})
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
      <div className={classnames('album-container',{'play':!!songCount})}>  
        <Header ref={headerEl} title={title} isMarquee={isMarquee} handleClick={handleBack}></Header>
        {
          !isEmptyObject(currentAlbum)?(
            <Scroll
              onScroll={handleScroll} 
              bounceTop={false}
         >
            <AlbumDetail currentAlbum={currentAlbum} musicAnimation={musicAnimation}></AlbumDetail>
         </Scroll>
          ):null
        }
        <MusicNote ref={musicNoteRef}></MusicNote>
      </div>
    </CSSTransition>
  );
};

const mapStateToProps = (state) => ({
  currentAlbum: state.album.currentAlbum,
  songCount:state.play.playList.length
});

const mapDispatchToProps = (dispatch) => {
  return {
    getAlbumDataDispatch(id) {
      dispatch(getAlbumList(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Album));
