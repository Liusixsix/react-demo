import React from 'react'
import Scroll from '../../baseUI/scroll'
import './index.scss'

const Rank:React.FC = ()=>{


    const renderRankList = ()=>{
        return (
            <div className='list'>

            </div>
        )
    }

    return (
        <div className='rank-container'>
            <Scroll>
                <div>
                <h1 className="offical" >官方榜</h1>
                <h1 className="global" >全球榜</h1>
                </div>
            </Scroll>
        </div>
    )
}

export default Rank