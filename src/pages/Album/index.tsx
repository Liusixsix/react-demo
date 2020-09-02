import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import Scroll from "../../baseUI/scroll";
import { getAlbumList } from "./store/actionCreators";
import "./index.scss";

export const Album = (props) => {
    
  const { getAlbumDataDispatch } = props;
  const [showStatus, setShowStatus] = useState(true);
  const id = props.match.params.id;

    useEffect(()=>{
        getAlbumDataDispatch(id)
    },[getAlbumDataDispatch, id])

  return (
    <CSSTransition
      in={showStatus}
      timeout={500}
      classNames="fly"
      appear={true}
      onExited={props.history.goBack}
    >
      <div className="album-container">Album</div>
    </CSSTransition>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    getAlbumDataDispatch(id) {
      dispatch(getAlbumList(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Album));
