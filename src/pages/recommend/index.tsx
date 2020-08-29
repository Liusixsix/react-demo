import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Scroll from '../../baseUI/scroll'
import * as actionTypes from './store/actionCreators'
import Slider from '../../components/slider'
import RecommendList from '../../components/list'
import './index.scss'

const Recommend = (props) => {
    const { bannerList, recommendList, getBannerDataDispatch, getRecommendListDispatch } = props

    useEffect(() => {
        if (!bannerList.length) {
            getBannerDataDispatch()
        }
        if (!recommendList.length) {
            getRecommendListDispatch()
        }
    }, [])



    return (
        <div className='Recommend'>
            <Scroll>
                <div>
                    <Slider bannerList={bannerList}></Slider>
                    <RecommendList recommendList={recommendList}></RecommendList>
                </div>
            </Scroll>
        </div>
    )
}

const mapStateToProps = (state) => ({
    bannerList: state.recommend.bannerList,
    recommendList: state.recommend.recommendList
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


export default connect(mapStateToProps, mapDispatchToProps)(Recommend)