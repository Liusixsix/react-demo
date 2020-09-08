import React, { useState, useRef, useEffect, useCallback } from "react";
import { CSSTransition } from "react-transition-group";

import "./index.scss";
import { getName } from "../../../utils";

const NormalPlayer = (props) => {
  const { full, song, playing } = props;
  const [currentState, setCurrentState] = useState(0);
  return (
    <CSSTransition classNames="normal" in={full} timeout={400} mountOnEnter>
      <div className="NormalPlayerContainer">
        <div className="background">
          <img
            src={song.al.picUrl + "?param=300x300"}
            width="100%"
            height="100%"
            alt="歌曲图片"
          />
        </div>
        <div className="background layer"></div>
        <div className="top">
          <div className="back">
            <i className="iconfont icon-fanhui"></i>
          </div>
          <div className="text">
            <h1 className="title">{song.name}</h1>
            <h1 className="subtitle">{getName(song.ar)}</h1>
          </div>
        </div>

        <div className="middle">
          <CSSTransition timeout={400} classNames="fade">
            <div className="cdWrapper">
              <div className={`needle ${playing ? "" : "pause"}`}></div>
              <div className="cd">
                <img
                  className={`image play ${playing ? "" : "pause"}`}
                  src={song.al.picUrl + "?param=400x400"}
                  alt=""
                />
              </div>
              <p className="playing_lyric">这是歌词呀</p>
            </div>
          </CSSTransition>
        </div>
      </div>
    </CSSTransition>
  );
};

export default React.memo(NormalPlayer);
