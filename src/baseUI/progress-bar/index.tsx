import React, { useEffect, useRef, useState } from 'react';
import './index.scss'

const ProgressBar = (props) => {
    const progressBar = useRef<HTMLDivElement>();
    const progress = useRef<HTMLDivElement>();
    const progressBtn = useRef<HTMLDivElement>();
    const [touch, setTouch] = useState<any>({});


    const { percent } = props
    const progressBtnWidth = 16;

    useEffect(() => {
        if (percent >= 0 && percent <= 1) {
            //   获取总长度 减去按钮的宽度
            const barWidth = progressBar.current.clientWidth - progressBtnWidth
            //   总长度 * 当前播放比例  = 进度长度
            const offSetWidth = percent * barWidth
            //   设置进度长度
            progress.current.style.width = `${offSetWidth}px`

            progressBtn.current.style['transform'] = `translate3d(${offSetWidth}px, 0, 0)`;

        }
    }, [percent])


    const _offset = (offsetWidth) => {
        progress.current.style.width = `${offsetWidth}px`
        progressBtn.current.style['transform'] = `translate3d(${offsetWidth}px, 0, 0)`;
    }

    const _changePercent = () => {
        const barWidth = progressBar.current.clientWidth - progressBtnWidth
        const curPercent = progress.current.clientWidth / barWidth
        props.percentChange(curPercent)
    }

    const progressClick = (e) => {
        const rect = progressBar.current.getBoundingClientRect();
        const offsetWidth = e.pageX - rect.left
        _offset(offsetWidth)
        _changePercent()
    }


    const progressTouchStart = (e: TouchEvent | any) => {
        const startTouch: any = {}
        startTouch.initiated = true
        startTouch.startX = e.touches[0].pageX
        startTouch.left = progress.current.clientWidth
        setTouch(startTouch)
    }


    const progressTouchMove = (e: TouchEvent | any) => {
        if (!touch.initiated) return
        const deltaX = e.touches[0].pageX - touch.startX
        const barWidth = progressBar.current.clientWidth - progressBtnWidth
        const offsetWidth = Math.min(Math.max(0, touch.left + deltaX), barWidth)
        _offset(offsetWidth);
        _changePercent();
    }

                
    const progressTouchEnd = (e)=>{
        const endTouch = JSON.parse(JSON.stringify(touch));
        endTouch.initiated = false;
        setTouch(endTouch);
        _changePercent();
    }

    return (
        <div className='ProgressBarWrapper'>
            <div className='bar-inner' ref={progressBar} onClick={progressClick}>
                <div className="progress" ref={progress}></div>
                <div className='progress-btn-wrapper'
                    ref={progressBtn}
                    onTouchStart={progressTouchStart}
                    onTouchMove={progressTouchMove}
                    onTouchEnd={progressTouchEnd}
                >
                    <div className='progress-btn'> </div>
                </div>
            </div>
        </div>
    )
}


export default React.memo(ProgressBar)