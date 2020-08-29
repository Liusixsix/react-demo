import React from 'react'

function RecommendList(props) {
    const { recommendList } = props
    return (
        <div className='listWrapper'>
            <h1 className='title'>推荐歌单</h1>
            <div className='list'>
                {
                    recommendList.map((item,index) => {
                        return (
                            <div className='listItem' key={index}>
                                
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default RecommendList