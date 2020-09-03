import React from 'react'
import './index.scss'

interface Iporps {
    title: string;
    isMarquee: boolean;
    handleClick: () => void;
}

const Header = React.forwardRef<HTMLDivElement, Iporps>((props, ref) => {
    const { title, isMarquee, handleClick } = props
    return (
        <div className='header-wrap' ref={ref}>
            <i className="iconfont icon-fanhui" onClick={handleClick}></i>
            {
                isMarquee ? <h1 className='marquee'><span>{title}</span></h1> :
                    <h1>{title}</h1>
            }
        </div>
    )

})

export default Header