import React, {  } from "react";
import { getName } from "../../utils/index";
import { connect } from "react-redux";
import {
  changePlayList,
  changeCurrentIndex,
  changeSequecePlayList,
} from "../Player/store/actionCreators";
import "./index.scss";

const SongList = (props) => {
  const { songs, musicAnimation, showCollect, collectCount } = props;
  const {
    changePlayListDispatch,
    changeCurrentIndexDispatch,
    changeSequecePlayListDispatch
  } = props;
  const totolCount = songs.length;
  const handleClick = (e, i) => {
    changePlayListDispatch(songs)
    changeSequecePlayListDispatch(songs)
    changeCurrentIndexDispatch(i)
    musicAnimation(e.nativeEvent.clientX, e.nativeEvent.clientY);
  };

  let songList = (list) => {
    return list.map((song, i) => {
      return (
        <li key={song.id} onClick={(e) => handleClick(e, i)}>
          <span className="index">{i + 1}</span>
          <div className="info">
            <span>{song.name}</span>
            <span>
              {song.ar ? getName(song.ar) : getName(song.artists)}-
              {song.al ? song.al.name : song.album.name}
            </span>
          </div>
        </li>
      );
    });
  };

  return (
    <div className="songList-container">
      <div className="first_line">
        <div className="play_all">
          <i className="iconfont icon-bofang"></i>
          <span>
            播放全部 <span className="sum">(共{totolCount}首)</span>
          </span>
        </div>
        {showCollect ? (
          <div className="add_list">
            <i className="iconfont icon-icon-test"></i>
            <span>收藏({Math.floor(collectCount / 1000) / 10}万)</span>
          </div>
        ) : null}
      </div>

      <ul className="songItem">{songList(songs)}</ul>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  changePlayListDispatch(data) {
    dispatch(changePlayList(data));
  },
  changeCurrentIndexDispatch(data){
    dispatch(changeCurrentIndex(data))
  },
  changeSequecePlayListDispatch(data){
    dispatch(changeSequecePlayList(data))
  }
});

export default connect(null,mapDispatchToProps)(React.memo(SongList));
