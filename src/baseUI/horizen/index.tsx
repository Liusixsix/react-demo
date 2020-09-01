import React, { useState, useRef, useEffect } from 'react'
import calssnames from 'classnames'
import Scroll from '../scroll'
import { cate } from '../../api/config'
import './index.scss'

interface iProps {
    title: string,
    list?: cate[],
    oldVal: string,
    handleClick: (v) => void
}
const Horizen: React.FC<iProps> = ({ title, list, oldVal, handleClick }) => {

    const [refreshCate, setRefreshCate] = useState(false)
    const Category = useRef(null)

    useEffect(() => {
        let CategoryDom = Category.current
        let tagElems: HTMLSpanElement[] = CategoryDom.querySelectorAll('span')
        let totalWidth = 0

        Array.from(tagElems).forEach(ele => {
            totalWidth += ele.offsetWidth
        })
        totalWidth += 2
        CategoryDom.style.width = `${totalWidth}px`
        setRefreshCate(true)
    }, [refreshCate])


    const clickHandle = (item) => {
        handleClick(item.key)
    }

    return (
        <div>
            <Scroll direction='horizental' refresh={true}>
                <div ref={Category}>
                    <div className='horizental-list'>
                        <span>{title}</span>
                        {
                            list.map(item => {
                                return (
                                    <span
                                        className={calssnames('horizental-item', {
                                            'selected': oldVal === item.key
                                        })}
                                        key={item.key}
                                        onClick={() => clickHandle(item)}
                                    >
                                        {item.name}
                                    </span>
                                )
                            })
                        }
                    </div>
                </div>
            </Scroll>
        </div>
    )
}

export default React.memo(Horizen)