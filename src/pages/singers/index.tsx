import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { renderRoutes } from 'react-router-config'
import { categoryTypes, alphaTypes } from '../../api/config'
import { changeCategory, changeAlpha, getHotSingerList, getSingerList, changeListOffset, refreshMoreHotSingerList, refreshMoreSingerList } from './store/actionCreators'
import Horizen from '../../baseUI/horizen'
import Scroll from '../../baseUI/scroll'
import './index.scss'

const Singers = (props: any) => {
    const scrollRef = useRef(null);
    const { alpha, category, singerList, songCount } = props

    const { updateAlpha, updateCategory, getHotSinger, pullUpRefresh, pullDownRefresh } = props

    const handleUpdateCategory = (newVal) => {
        if (category === newVal) return
        updateCategory(newVal)
        scrollRef.current.refresh();
    }

    const handleUpdateAlpha = (newVal) => {
        if (alpha === newVal) return
        updateAlpha(newVal)
        scrollRef.current.refresh();
    }

    const handlePullUp = () => {
        pullUpRefresh(!category && !alpha)
    }

    const handlePullDown = () => {
        pullDownRefresh(category, alpha)
    }
    const handleClickSinger = (id) => {
        props.history.push(`/singers/${id}`);
    }

    useEffect(() => {
        if (!singerList.length && !alpha && !category) {
            getHotSinger()
        }
    }, [alpha, category, getHotSinger, singerList.length])

    const renderSingerList = () => {
        const { singerList } = props
        return (
            <div className='singer-list'>
                {
                    singerList.map((item, index) => {
                        return (
                            <div className="item" key={index} onClick={() => handleClickSinger(item.id)}>
                                <div className='img_wrapper'>
                                    <img src={`${item.picUrl}?params=300x300`} width='100%' height='100%' alt="" />
                                </div>
                                <span className='name'>{item.name}</span>
                            </div>
                        )
                    })
                }
            </div>
        )
    }


    return (
        <div>
            <div className='navContainer'>
                <Horizen title={"分类(默认热门):"} list={categoryTypes} oldVal={category} handleClick={(v) => handleUpdateCategory(v)}></Horizen>
                <Horizen title={'首字母'} list={alphaTypes} oldVal={alpha} handleClick={(v) => handleUpdateAlpha(v)}></Horizen>
            </div>
            <div className={classnames('ListContainer', { 'play': !!songCount })}>
                <Scroll
                    pullUp={handlePullUp}
                    pullDown={handlePullDown}
                    ref={scrollRef}
                >
                    {renderSingerList()}
                </Scroll>
            </div>
            {renderRoutes(props.route.routes)}
        </div>
    )
}

const mapStateToProps = ({ singers, play }) => ({
    alpha: singers.alpha,
    category: singers.category,
    singerList: singers.singerList,
    songCount: play.playList.length
})

const mapDispatchToPorps = (dispatch) => {
    return {
        getHotSinger() {
            dispatch(getHotSingerList())
        },
        updateCategory(newVal) {
            dispatch(changeCategory(newVal))
            dispatch(getSingerList())
        },
        updateAlpha(newVal) {
            dispatch(changeAlpha(newVal))
            dispatch(getSingerList())
        },
        pullUpRefresh(hot, count) { //滚动到底部
            if (hot) { //没有选中
                dispatch(refreshMoreHotSingerList())
            } else { //选中
                dispatch(refreshMoreSingerList())
            }
        },
        pullDownRefresh(category, alpha) { //下拉刷新
            dispatch(changeListOffset(0))
            if (category === '' && alpha === '') {
                dispatch(getHotSingerList())
            } else {
                dispatch(getSingerList())
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToPorps)(React.memo(Singers))