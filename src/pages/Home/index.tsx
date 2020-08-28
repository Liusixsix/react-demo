import React, { useEffect, useRef, useState } from 'react'
import Scroll from '../../common/scroll'
import classnames from 'classnames'
import { Link } from 'react-router-dom'

import { throttle } from '../../utils/index'
import SearchBar from '../../common/title'
import './index.scss'


const Home: React.FC = () => {
    const scrollEl = useRef(null)
    const [scrollTop, SetScrollTop] = useState(false)

    const pullUp = () => {
        console.log('pullUp')
    }
    const onScroll = ({ y }) => {
        SetScrollTop(y < 0)
    }

    return (
        <div className='container'>
            <SearchBar scrollTop={scrollTop}></SearchBar>
            <div className={classnames('wrap', { 'min-wrap': !scrollTop })} ref={scrollEl}>
                <Scroll pullUp={pullUp} onScroll={throttle(onScroll, 100)} >
                    <div>
                        <Link to='/about'>about</Link>
                        {
                            [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((item, index) => {
                                return <h1 key={index}>{item}</h1>
                            })
                        }
                    </div>
                </Scroll>
            </div>
        </div>
    )
}

export default Home