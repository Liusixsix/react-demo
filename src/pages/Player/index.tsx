import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { playMode } from "./../../api/config";
import MiniPlayer from "./mini-player";
import Lyric from "../../api/lyric-parser";
import { isEmptyObject, getSongUrl } from "../../utils";
import {
  changePlayingState,
  changeShowPlayList,
  changeCurrentIndex,
  changeCurrentSong,
  changePlayList,
  changePlayMode,
  changeFullScreen,
  changeSpeed,
} from "./store/actionCreators";
import NormalPlayer from "./normal-player";
import { getLyricRequest } from "../../api/request";
const Player = (props) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [preSong, setPreSong] = useState<any>({});
  const [currentPlayingLyric, setPlayingLyric] = useState("");

  let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration;

  const audioRef = useRef<HTMLAudioElement>();
  const currentLyric = useRef<any>();
  const currentLineNum = useRef(0);
  const songReady = useRef(true);
  const {
    speed,
    playing,
    currentSong,
    currentIndex,
    playList,
    mode,
    sequencePlayList,
    fullScreen,
  } = props;
  const {
    togglePlayingDispatch,
    togglePlayListDispatch,
    changeCurrentIndexDispatch,
    changeCurrentDispatch,
    changePlayListDispatch,
    changeModeDispatch,
    toggleFullScreenDispatch,
    changeSpeedDispatch,
  } = props;
  useEffect(() => {
    if (
      !playList.length ||
      currentIndex === -1 ||
      !playList[currentIndex] ||
      playList[currentIndex].id === preSong.id
    )
      return;
    let current = playList[currentIndex];
    changeCurrentDispatch(current);
    setPreSong(current);
    setPlayingLyric("");
    audioRef.current.src = getSongUrl(current.id);
    audioRef.current.autoplay = true;
    audioRef.current.playbackRate = speed;
    togglePlayingDispatch(true);
    getLyric(current.id);
    setCurrentTime(0)
    
    // eslint-disable-next-line
  }, [currentIndex, playList]);

  useEffect(() => {
    playing ? audioRef.current.play() : audioRef.current.pause();
  }, [playing]);

  const handleLyric:any = ({ lineNum, txt }:{lineNum:any,txt:any}):void => {
    if (!currentLyric.current) return;
    currentLineNum.current = lineNum;
    setPlayingLyric(txt);
  };
  useEffect(() => {
    if (!fullScreen) return;
    if (currentLyric.current && currentLyric.current.lines.length) {
      handleLyric({
        lineNum: currentLineNum.current,
        txt: currentLyric.current.lines[currentLineNum.current].txt,
      });
    }
  }, [fullScreen]);


  const getLyric = (id) => {
      let lyric = "";
      if (currentLyric.current) {
        currentLyric.current.stop();
      }
        // 避免songReady恒为false的情况
    setTimeout(() => {
      songReady.current = true;
    }, 3000);
      getLyricRequest(id).then((data:any)=>{
        lyric = data.lrc && data.lrc.lyric;
        if (!lyric) {
          currentLyric.current = null;
          return;
        }
        currentLyric.current = new Lyric(lyric, handleLyric, speed);
        currentLyric.current.play();
        currentLineNum.current = 0;
        currentLyric.current.seek(0);
      }).catch(() => {
        currentLyric.current = "";
        songReady.current = true;
        audioRef.current.play();
      });
  };




  // 切换播放状态
  const clickPlaying = (e, state) => {
    e.stopPropagation();
    togglePlayingDispatch(state);
  };

  const clickSpeed = (newSpeed) => {
    changeSpeedDispatch(newSpeed);
    audioRef.current.playbackRate = newSpeed;
    currentLyric.current.changeSpeed(newSpeed);
    currentLyric.current.seek(currentTime * 1000);
  };

  const handleLoop = () => {
    audioRef.current.currentTime = 0;
    togglePlayingDispatch(true);
    audioRef.current.play();
    if (currentLyric.current) {
      currentLyric.current.seek(0);
    }
  };

  const handlePrev = ()=>{
    if (playList.length === 1) {
      handleLoop();
      return;
    }
    let index = currentIndex - 1;
    if (index === 0) index = playList.length - 1;
    if (!playing) togglePlayingDispatch(true);
    changeCurrentIndexDispatch(index);
  }

  const handleNext = () => {
    if (playList.length === 1) {
      handleLoop();
      return;
    }
    let index = currentIndex + 1;
    if (index === playList.length) index = 0;
    if (!playing) togglePlayingDispatch(true);
    changeCurrentIndexDispatch(index);
  };

  const updateTime = (e) => {
    //更新当前播放时间
    setCurrentTime(e.target.currentTime);
  };
  

  const handleEnd = () => {
    if (mode === playMode.loop) {
      handleLoop();
    } else {
      handleNext();
    }
  };

  const handleError = () => {
    songReady.current = true;
    handleNext();
    alert("播放出错");
  };

  return (
    <div>
      {isEmptyObject(currentSong) ? null : (
        <MiniPlayer
          playing={playing}
          full={fullScreen}
          song={currentSong}
          percent={percent}
          clickPlaying={clickPlaying}
          setFullScreen={toggleFullScreenDispatch}
        ></MiniPlayer>
      )}

      {isEmptyObject(currentSong) ? null :(
         <NormalPlayer 
          playing={playing}
          full={fullScreen}
          song={currentSong}
          percent={percent}
          toggleFullScreenDispatch={toggleFullScreenDispatch}
          handlePrev={handlePrev}
          currentLineNum={currentLineNum.current}
          currentPlayingLyric={currentPlayingLyric}
          currentLyric={currentLyric.current}
          speed={speed}
          clickSpeed={clickSpeed}
         >

         </NormalPlayer>
      )}

      <audio
        ref={audioRef}
        
        onTimeUpdate={updateTime}
        onEnded={handleEnd}
        onError={handleError}
      ></audio>
    </div>
  );
};

// 映射Redux全局的state到组件的props上
const mapStateToProps = (state) => ({
  fullScreen: state.play.fullScreen,
  playing: state.play.playing,
  currentSong: state.play.currentSong,
  showPlayList: state.play.showPlayList,
  mode: state.play.mode,
  speed: state.play.speed,
  currentIndex: state.play.currentIndex,
  playList: state.play.playList,
  sequencePlayList: state.play.sequencePlayList,
});

const mapDispatchToProps = (dispatch) => {
  return {
    togglePlayingDispatch(data) {
      dispatch(changePlayingState(data));
    },
    toggleFullScreenDispatch(data) {
      dispatch(changeFullScreen(data));
    },
    togglePlayListDispatch(data) {
      dispatch(changeShowPlayList(data));
    },
    changeCurrentIndexDispatch(index) {
      dispatch(changeCurrentIndex(index));
    },
    changeCurrentDispatch(data) {
      dispatch(changeCurrentSong(data));
    },
    changeModeDispatch(data) {
      dispatch(changePlayMode(data));
    },
    changePlayListDispatch(data) {
      dispatch(changePlayList(data));
    },
    changeSpeedDispatch(data) {
      dispatch(changeSpeed(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Player));
