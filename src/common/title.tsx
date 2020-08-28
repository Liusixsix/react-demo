import React, { Component, useMemo } from 'react';
import classnames from 'classnames'
import './title.scss'

interface Iprops {
    scrollTop: boolean
}

const Title: React.FC<Iprops> = React.memo(({ scrollTop }) => {

    const isShowSearch: boolean = useMemo(() => {
        return scrollTop
    }, [scrollTop])

    return (
        <div className={classnames('search-bar-wrapper', {
            'show-search': isShowSearch
        })}>
            <div className='title-search-wrapper'>
                <div className='title-search-page-wrapper'>书城</div>
                <div className='icon-back-wrapper'>
                    <i className='iconfont icon-fanhui'></i>
                </div>

                <div className="search-wrapper">
                    <div className='search-back-wrapper'>
                        <i className='iconfont icon-fanhui'></i>
                    </div>
                    <div className="search-bg">
                        <i className='iconfont icon-sousuo2'></i>
                        <input type="text" className='search' placeholder='计算机科学' />
                    </div>
                </div>
            </div>
        </div>
    )
})

export default Title;