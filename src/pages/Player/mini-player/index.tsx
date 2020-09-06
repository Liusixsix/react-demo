import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import {getName} from '../../../utils/index'
import ProgressCircle from '../../../baseUI/progress-circle';
import "./index.scss";

interface Iprops{
    full:boolean
    playing:boolean
    song:any
    percent:any,
    clickPlaying:(e:any,state:boolean)=>void
    setFullScreen:(state:boolean)=>void
}

const MiniPlayer:React.FC<Iprops> = (props) => {
  const { full, song, playing ,percent,clickPlaying,setFullScreen} = props;
  const miniPlayerRef = useRef<any>();

  const miniWrapperRef = useRef();
  const miniImageRef = useRef();

  return (
    <CSSTransition
      in={!full}
      timeout={400}
      classNames="mini"
      onEnter={() => {
          miniPlayerRef.current.style.display = "flex";
      }}
      onExited={() => {
          miniPlayerRef.current.style.display = "none";
      }}
    >
      <div className="MiniPlayerContainer" ref={miniPlayerRef} onClick={()=>setFullScreen(true)}>
      <div className="icon">
          <div className="imgWrapper" ref={miniWrapperRef}>
            <img className={`play ${playing ? "": "pause"}`} ref={miniImageRef} src={song.al.picUrl} width="40" height="40" alt="img"/>
          </div>
        </div>
        <div className="text"> 
          <h2 className="name">{song.name}</h2>
          <p className="desc">{getName(song.ar)}</p>
        </div> 
        
        <div className="control">
            <ProgressCircle radius={64} percent={percent}>
              { playing ? 
                <i className="icon-mini iconfont icon-zanting1" onClick={e => clickPlaying(e, false)}></i>
                :
                <i className="icon-mini iconfont icon-zanting" onClick={e => clickPlaying(e, true)}></i> 
              }
            </ProgressCircle>
        </div>
          
        <div className="control" >
          <i className="iconfont icon-bofangliebiao"></i>
        </div>
          
      </div>
    </CSSTransition>
  );
};

export default MiniPlayer;
