import React, { useState, useRef, useEffect, useCallback } from "react";
import { CSSTransition } from "react-transition-group";
import animations from "create-keyframe-animation";
import "./index.scss";
import { getName } from "../../../utils";
import Scroll from "../../../baseUI/scroll";
import {list} from '../../../api/config'
const NormalPlayer = (props) => {
  const {
    full,
    song,
    playing,
    currentLineNum,
    currentPlayingLyric,
    currentLyric,
    speed
  } = props;
  const { toggleFullScreenDispatch,clickSpeed } = props;
  const [currentState, setCurrentState] = useState<any>(0);
  const normalPlayerRef = useRef<HTMLDivElement>();
  const cdWrapperRef = useRef<HTMLDivElement>();
  const lyricScrollRef = useRef<HTMLDivElement | any>();
  const lyricLineRefs = useRef([]);

  useEffect(() => {
    if (!lyricScrollRef.current) return;
    let bScroll = lyricScrollRef.current.getBScroll();
    if (currentLineNum > 5) {
      let lineEl = lyricLineRefs.current[currentLineNum - 5].current;
      bScroll.scrollToElement(lineEl, 1000);
    } else {
      bScroll.scrollTo(0, 0, 1000);
    }
  }, [currentLineNum]);

  const _getPosAndScale = () => {
    const targetWidth = 40;
    const paddingLeft = 40;
    const paddingBottom = 30;
    const paddingTop = 80;
    const width = window.innerWidth * 0.8;
    const scale = targetWidth / width;
    // 两个圆心的横坐标距离和纵坐标距离
    const x = -(window.innerWidth / 2 - paddingLeft);
    const y = window.innerHeight - paddingTop - width / 2 - paddingBottom;
    return {
      x,
      y,
      scale,
    };
  };

  const enter = () => {
    normalPlayerRef.current.style.display = "block";
    const { x, y, scale } = _getPosAndScale();
    let animation = {
      0: {
        transform: `translate3d(${x}px,${y}px,0) scale(${scale})`,
      },
      60: {
        transform: `translate3d(0, 0, 0) scale(1.1)`,
      },
      100: {
        transform: `translate3d(0, 0, 0) scale(1)`,
      },
    };
    animations.registerAnimation({
      name: "move",
      animation,
      presets: {
        duration: 400,
        easing: "linear",
      },
    });
    animations.runAnimation(cdWrapperRef.current, "move");
  };

  const afterEnter = () => {
    const cdWrapperDom = cdWrapperRef.current;
    animations.unregisterAnimation("move");
    cdWrapperDom.style.animation = "";
  };

  const leave = () => {
    if (!cdWrapperRef.current) return;
    const cdWrapperDom = cdWrapperRef.current;
    cdWrapperDom.style.transition = "all 0.4s";
    const { x, y, scale } = _getPosAndScale();
    cdWrapperDom.style[
      "transform"
    ] = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
  };

  const afterLeave = () => {
    if (!cdWrapperRef.current) return;
    const cdWrapperDom = cdWrapperRef.current;
    cdWrapperDom.style["transform"] = "";
    normalPlayerRef.current.style.display = "none";
  };

  const toggleCurrentState = () => {
    let nextState = "";
    if (currentState !== "lyric") {
      nextState = "lyric";
    } else {
      nextState = "";
    }
    setCurrentState(nextState);
  };

  return (
    <CSSTransition
      classNames="normal"
      in={full}
      timeout={400}
      unmountOnExit
      onEnter={enter}
      onEntered={afterEnter}
      onExit={leave}
      onExited={afterLeave}
    >
      <div className="NormalPlayerContainer" ref={normalPlayerRef}>
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
          <div className="back" onClick={() => toggleFullScreenDispatch(false)}>
            <i className="iconfont icon-fanhui"></i>
          </div>
          <div className="text">
            <h1 className="title">{song.name}</h1>
            <h1 className="subtitle">{getName(song.ar)}</h1>
          </div>
        </div>

        <div className="middle" ref={cdWrapperRef} onClick={toggleCurrentState}>
          <CSSTransition
            timeout={400}
            classNames="fade"
            in={currentState !== "lyric"}
          >
            <div className="cdWrapper">
              <div className={`needle ${playing ? "" : "pause"}`}></div>
              <div className="cd">
                <img
                  className={`image play ${playing ? "" : "pause"}`}
                  src={song.al.picUrl + "?param=400x400"}
                  alt=""
                />
              </div>
              <p className="playing_lyric">{currentPlayingLyric}</p>
            </div>
          </CSSTransition>
          <CSSTransition
            timeout={400}
            classNames="fade"
            in={currentState === "lyric"}
          >
            <div className="LyricContainer">
              <Scroll ref={lyricScrollRef}>
                <div
                  className="LyricWrapper"
                  style={{
                    visibility: currentState === "lyric" ? "visible" : "hidden",
                  }}
                >
                  {currentLyric ? (
                    currentLyric.lines.map((item, index) => {
                      lyricLineRefs.current[index] = React.createRef();
                      return (
                        <p
                          className={`text ${
                            currentLineNum === index ? "current" : ""
                          }`}
                          key={item + index}
                          ref={lyricLineRefs.current[index]}
                        >
                          {item.txt}
                        </p>
                      );
                    })
                  ) : (
                    <p className="text pure">纯音乐，请欣赏。</p>
                  )}
                </div>
              </Scroll>
            </div>
          </CSSTransition>
        </div>

        <div className="Bottom">
          <div className="list">
            <span>倍速听歌</span>
            {list.map((item) => {
              return (
                <span
                  key={item.key}
                  className={`${speed === item.key ? "list-item selected" : "list-item"}`}
                  onClick={() => clickSpeed(item.key)}
                >
                  {item.name}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default React.memo(NormalPlayer);
