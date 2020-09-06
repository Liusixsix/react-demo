import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { renderRoutes } from 'react-router-config'
import classnames from 'classnames'
import Scroll from '../../baseUI/scroll'
import * as actionTypes from './store/actionCreators'
import Slider from '../../components/slider'
import RecommendList from '../../components/list'
import './index.scss'

const Recommend = (props) => {
   
    const { bannerList, recommendList, songCount,getBannerDataDispatch, getRecommendListDispatch } = props

    useEffect(() => {
        if (!bannerList.length) {
            getBannerDataDispatch()
        }
        if (!recommendList.length) {
            getRecommendListDispatch()
        }
    }, [bannerList.length, getBannerDataDispatch, getRecommendListDispatch, recommendList.length])



    return (
        <div className={classnames('Recommend',{'play':!!songCount})} >
            <Scroll>
                <div>
                    <Slider bannerList={bannerList}></Slider>
                    <RecommendList recommendList={recommendList}></RecommendList>
                </div>
            </Scroll>
            {renderRoutes(props.route.routes)}
        </div>
    )
}

const mapStateToProps = (state) => ({
    bannerList: state.recommend.bannerList,
    recommendList: state.recommend.recommendList,
    songCount:state.play.playList.length,
})


const mapDispatchToProps = (dispatch) => {
    return {
        getBannerDataDispatch() {
            dispatch(actionTypes.getBannerList())
        },
        getRecommendListDispatch() {
            dispatch(actionTypes.getRecommendList())
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend))