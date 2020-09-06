import React from "react";
import "./index.scss";
import SongList from "../../pages/SongList";
interface Iprops {
  currentAlbum: any;
  musicAnimation: (x, y) => void;
}

const AlbumDetail: React.FC<Iprops> = (props) => {
  const { currentAlbum, musicAnimation } = props;

  const renderTopDesc = () => {
    return (
      <div className="TopDesc">
        <div
          className="background"
          style={{ backgroundImage: `url(${currentAlbum.coverImgUrl})` }}
        >
          <div className="filter"></div>
        </div>

        <div className="img_wrapper">
          <div className="decorate"></div>
          <img
            src={currentAlbum.coverImgUrl}
            width="100%"
            height="100%"
            alt=""
          />
          <div className="play_count">
            <i className="iconfont play">&#xe885;</i>
            <span className="count">
              {Math.floor(currentAlbum.subscribedCount / 1000) / 10}万
            </span>
          </div>
        </div>

        <div className="desc_wrapper">
          <div className="title">{currentAlbum.name}</div>
          <div className="person">
            <div className="avatar">
              <img src={currentAlbum.creator.avatarUrl} alt="" />
            </div>
            <div className="name">{currentAlbum.creator.nickname}</div>
          </div>
        </div>
      </div>
    );
  };

  const renderMenu = () => {
    return (
      <div className="album-menu">
        <div>
          <i className="iconfont icon-pinglun"></i>
          评论
        </div>
        <div>
          <i className="iconfont icon-icon_good"></i>
          点赞
        </div>
        <div>
          <i className="iconfont icon-siteseomarketi"></i>
          收藏
        </div>
        <div>
          <i className="iconfont icon-caidan"></i>
          更多
        </div>
      </div>
    );
  };

  const renderSongList = () => {
    return (
      <SongList
        songs={currentAlbum.tracks}
        musicAnimation={musicAnimation}
        showCollect={true}
        collectCount={currentAlbum.subscribedCount}
      ></SongList>
    );
  };

  return (
    <div>
      {renderTopDesc()}
      {renderMenu()}
      {renderSongList()}
    </div>
  );
};

export default AlbumDetail;
