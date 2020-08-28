import React from 'react'
import Scroll from '../../baseUI/scroll'
import './index.scss'

const Recommend = ()=>{
    return (
        <div className='Recommend'>
            <Scroll>
                <div>
                    {
                    [1,2,3,43,53,454,654,1,2,3,43,53,4564,65,4,654,1,2,3,43,53,4564,65,4,654].map(item=>{
                        return <div>{item}</div>
                        })
                    }
                </div>
            </Scroll>
        </div>
    )
}

export default Recommend