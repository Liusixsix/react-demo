import React, { useRef, useState, useCallback, useEffect } from 'react'
import { CSSTransition } from "react-transition-group";
import { connect } from 'react-redux';
import classnames from 'classnames'
import { getSingerInfo, changeEnterLoading } from "./store/actionCreators";
import Header from '../../baseUI/header'
import Scroll from '../../baseUI/scroll'
import MusicNote from '../../baseUI/music-note'
import SongList from '../SongList'
import './index.scss'

const Singer = (props) => {
    const initialHeight = useRef(0);
    const [showStatus, setShowStatus] = useState(true);

    const header = useRef();
    const layer = useRef<HTMLDivElement>()
    const collectButton = useRef();
    const songScrollWrapper = useRef<HTMLDivElement>();
    const songScroll = useRef<any>();
    const imageWrapper = useRef<HTMLDivElement>()
    const musicNoteRef = useRef<any>();
    const OFFSET = 5


    const {
        artist,
        songs,
        loading,
        songsCount
    } = props;

    const { getSingerDataDispatch } = props;


    const setShowStatusFalse = useCallback(() => {
        setShowStatus(false);
    }, [])


    useEffect(() => {
        const id = props.match.params.id;
        getSingerDataDispatch(id);
        let h = imageWrapper.current.offsetHeight
        initialHeight.current = h
        songScrollWrapper.current.style.top = `${h - OFFSET}px`;
        layer.current.style.top = `${h - OFFSET}px`;
        songScroll.current.refresh()
    }, [])


    const handleScroll = (pos:any) => {            
        let height = initialHeight.current
        const newY = pos.y
        const imageDom = imageWrapper.current
        const buttomDom = collectButton.current
        const headerDom = header.current
        const layerDom = layer.current
            


    }           

    const musicAnimation = (x, y) => {
        musicNoteRef.current.startAnimation({ x, y });
    };

    return (
        <CSSTransition
            in={showStatus}
            timeout={300}
            classNames='fly'
            appear={true}
            unmountOnExit
            onExited={() => props.history.goBack()}
        >
            <div className="singerContainer">
                <Header
                    handleClick={setShowStatusFalse}
                    title={artist.name}
                    isMarquee={false}
                    ref={header}
                ></Header>
                <div className="imgWrapper" ref={imageWrapper}  
                     style={{background:`url(${artist.picUrl})`}}
                     >
                    <div className='filter' ></div>
                </div>

                <div className='CollectButton' ref={collectButton} >
                    <span className="text">收藏</span>
                </div>

                <div className='BgLayer' ref={layer}></div>

                <div className={classnames('SongListWrapper', { 'play': songsCount })} ref={songScrollWrapper} >
                    <Scroll onScroll={handleScroll} ref={songScroll}>
                        <SongList
                            songs={songs}
                            showCollect={false}
                            musicAnimation={musicAnimation}
                        >
                        </SongList>
                    </Scroll>
                </div>
                <MusicNote ref={musicNoteRef}></MusicNote>

            </div>
        </CSSTransition>
    )
}


const mapStateToProps = state => ({
    artist: state.singerInfo.artist,
    songs: state.singerInfo.songsOfArtist,
    loading: state.singerInfo.loading,
    songsCount: state.play.playList.length
})

const mapDispatchToProps = dispatch => {
    return {
        getSingerDataDispatch(id) {
            dispatch(changeEnterLoading(true))
            dispatch(getSingerInfo(id))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singer))