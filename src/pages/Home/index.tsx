import React, { useEffect, useRef, useState } from 'react'
import Scroll from '../../common/scroll'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import './index.css'


const Home: React.FC = () => {
    const scrollEl = useRef(null)
    const [scrollTop, SetScrollTop] = useState(0)

    useEffect(() => {
        scrollEl.current.addEventListener('scroll', handleScroll)
        return () => {
            scrollEl.current.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const handleScroll = (e) => {
        SetScrollTop(e.target.scrollTop)
    }

    return (
        <div>
            <div className='search-bar-wrapper'>
                <div className={classnames('title-search-wrapper',{'show-search':scrollTop>0})}>
                    <div className="title-search-page-wrapper">
                        <span>书城</span>
                    </div>
                    <div className='icon-back'>
                        返回
                    </div>
                    <div className="search-wrapper">
                        <div className="search-back">返回</div>
                        <div className='search-bg'>
                            <input type="text" className='search' />
                        </div>
                    </div>
                </div>
            </div>
            <div className={classnames('wrap', { h: scrollTop > 0 })} ref={scrollEl}>
           
            <Link to='/about'>about</Link>
                {
                    [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((item, index) => {
                        return <h1 key={index}>{item}</h1>
                    })
                }
            </div>
        </div>
    )
}

export default Home