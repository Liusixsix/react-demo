import { playMode } from "../../../api/config";
import * as actionTypes from "./constants";
const defaultState = {
  fullScreen: false,
  playing: false,
  sequencePlayList: [],
  playList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  showPlayList: false,
  currentSong: {},
  speed: 1,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_SONG: //修改当前播放
      return { ...state, currentSong: action.data };
    case actionTypes.SET_FULL_SCREEN: //是否全屏
      return { ...state, fullScreen: action.data };
    case actionTypes.SET_PLAYING_STATE: //播放状态
      return { ...state, playing: action.data };
    case actionTypes.SET_SEQUECE_PLAYLIST: //顺序列表
      return { ...state, sequencePlayList: action.data };
    case actionTypes.SET_PLAYLIST: //播放列表
      return { ...state, playList: action.data };
    case actionTypes.SET_PLAY_MODE: //播放模式
      return { ...state, mode: action.data };
    case actionTypes.SET_CURRENT_INDEX: //当前播放下标
      return { ...state, currentIndex: action.data };
    case actionTypes.SET_SHOW_PLAYLIST:
      return { ...state, showPlayList: action.data };
    default:
      return state;
  }
};
