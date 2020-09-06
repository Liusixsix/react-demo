import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { playMode } from "./../../api/config";
import MiniPlayer from "./mini-player";
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
const Player = (props) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [preSong, setPreSong] = useState<any>({});
  const [currentPlayingLyric, setPlayingLyric] = useState("");

  let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration;

  const audioRef = useRef<HTMLAudioElement>();
  const currentLyric = useRef();

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

    // eslint-disable-next-line
  }, [currentIndex, playList]);

  useEffect(() => {
    playing ? audioRef.current.play() : audioRef.current.pause();
  }, [playing]);

  const getLyric = (id) => {};

  // 切换播放状态
  const clickPlaying = (e, state) => {
    e.stopPropagation();
    togglePlayingDispatch(state);
  };

  const updateTime = (e) => {
    //更新当前播放时间
    setCurrentTime(e.target.currentTime);
  };

  const handleEnd = () => {};

  const handleError = () => {};

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
