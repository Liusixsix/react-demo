import React, { useRef, useState, useCallback, useEffect } from 'react'
import { CSSTransition } from "react-transition-group";
import Header from '../../baseUI/header'
import { getSingerInfo, changeEnterLoading } from "./store/actionCreators";
import './index.scss'
import { connect } from 'react-redux';

const Singer = (props) => {
    const initialHeight = useRef(0);
    const [showStatus, setShowStatus] = useState(true);
    const header = useRef();
    const imageWrapper = useRef()
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


    useEffect(()=>{
        const id = props.match.params.id;
        getSingerDataDispatch(id);

    },[])

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
                    ref={header}
                ></Header>
                <div className="imgWrapper" ref={imageWrapper}>
                    <div className='filter'></div>
                </div>
            </div>
        </CSSTransition>
    )
}


const mapStateToProps = state => ({
    artist: state.singerInfo.artist,
    songs: state.singerInfo.songsOfArtist,
    loading: state.singerInfo.loading,
    songsCount: state.playList.length
})

const mapDispatchToProps = dispatch => {
    return {
        getSingerDataDispatch(id) {
            dispatch(changeEnterLoading(true))
            dispatch(getSingerInfo(id))
        }
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(React.memo(Singer))