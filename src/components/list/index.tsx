import React from "react";
import LazyLoad from "react-lazyload";
import "./index.scss";
function RecommendList(props) {
  const { recommendList } = props;
  const enterDetail = (id) => {
    console.log(id)
  }

  return (
    <div className="listWrapper">
      <h1 className="title">推荐歌单</h1>
      <div className="list">
        {recommendList.map((item, index) => {
          return (
            <div className="listItem" key={index} onClick={() => enterDetail(item.id)}>
              <div className="imgWrap">
                <div className="decorate"></div>
                {/* <LazyLoad  scroll placeholder={<img width="100%" height="100%" src={require('./music.png')} alt="music"/>}> */}
                <img src={item.picUrl + "?param=300x300"} width="100%" height="100%" alt="music" />
                {/* </LazyLoad> */}
                <div className="play_count">
                  <i className="iconfont play">&#xe885;</i>
                  <span className="count">
                    {Math.floor(item.playCount / 10000)}万
                  </span>
                </div>
              </div>
              <div className="desc">{item.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecommendList;
