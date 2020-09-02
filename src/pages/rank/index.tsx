import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import Scroll from '../../baseUI/scroll'
import Loading from '../../baseUI/loading'
import { getRankList } from './store'
import { filterIndex } from '../../utils'
import './index.scss'

const Rank = (props) => {
    const { rankList, loading } = props
    const { getRankListDataDispatch } = props

    useEffect(() => {
        if (!rankList.length) {
            getRankListDataDispatch()
        }
    }, [])

    const enterDetail = (item) =>{
        console.log(item)
    }


    const renderSongList = (list) => {
        return list.length ? (
            <ul className='son-list'>
                {
                    list.map((item, index) => {
                        return <li key={index}>{index + 1}. {item.first} - {item.second}</li>
                    })
                }
            </ul>
        ) : null
    }

    const renderRankList = (list, global?) => {
        return (
            <ul className={classnames('list', {
                'list-global': global,
                'list-offical': !global
            })}>
                {
                    list.map((item, index) => {
                        return (
                            <li
                                key={index}
                                onClick={() => enterDetail(item)}
                                className={classnames('item', {
                                    "item-global": global,
                                    'item-offical': !global
                                })}>
                                <div className='img_wrapper'>
                                    <img src={item.coverImgUrl} alt="" />
                                    <div className='decorate'></div>
                                    <div className='update_frequecy'>{item.updateFrequency}</div>
                                </div>
                                {renderSongList(item.tracks)}
                            </li>
                        )
                    })
                }
            </ul>
        )
    }

    let globalStartIndex = filterIndex(rankList)
    let officalList = rankList.slice(0, globalStartIndex)
    let globalList = rankList.slice(globalStartIndex);

    return (
        <div className='rank-container'>
            <Scroll>
                <div>
                    <h1 className="offical">官方榜</h1>
                    {renderRankList(officalList)}
                    <h1 className="global" >全球榜</h1>
                    {renderRankList(globalList, true)}
                   { loading &&<Loading></Loading>}
                </div>
            </Scroll>
        </div>
    )
}


const mapStateToProps = ({ rank }) => ({
    rankList: rank.rankList,
    loading: rank.loading
})

const mapDispatchProps = (dispatch) => {
    return {
        getRankListDataDispatch() {
            dispatch(getRankList())
        }
    }
}

export default connect(mapStateToProps, mapDispatchProps)(React.memo(Rank))