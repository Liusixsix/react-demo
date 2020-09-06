import React, { useState, useRef, useEffect, useCallback } from "react";
import { CSSTransition } from "react-transition-group";

import './index.scss'

const NormalPlayer = (props) => {
  const { full,song,playing } = props;

  return (
    <CSSTransition
      classNames="normal"
      in={full}
      timeout={400}
      mountOnEnter
    >
        <div className='NormalPlayerContainer'>
            <div className="background">
            <img
                src={song.al.picUrl + "?param=300x300"}
                width="100%"
                height="100%"
                alt="歌曲图片"
            />
            </div>
        </div>


    </CSSTransition>
  );
};

export default React.memo(NormalPlayer)