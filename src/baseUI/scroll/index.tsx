import React, { forwardRef, useState, useEffect, useRef, useImperativeHandle, useMemo, ReactElement } from 'react'
import styled from 'styled-components'
import BScroll from 'better-scroll'
import PropTypes from "prop-types"
import { debounce } from '../../utils/index'

const ScrollContainer = styled.div`
    width:100%;
    height:100%;
    overflow:hidden;
  
`
const pullUpLoading = styled.div`
    

`
interface Iprops {
    pullUp?: any,
    pullDown?: any,
    onScroll?: any,
    children?: any,
    direction: 'vertical' | 'horizental'
}


const Scroll = forwardRef((props: any, ref) => {
    const [bScroll, setScroll] = useState<any>()

    const scrollContaninerRef = useRef()

    const { direction, click, refresh, pullUpLoading, pullDownLoading, bounceTop, bounceBottom } = props;

    const { pullUp, pullDown, onScroll } = props;

    let pullUpDebounce = useMemo(() => {
        return debounce(pullUp, 500)
    }, [pullUp]);

    let pullDownDebounce = useMemo(() => {
        return debounce(pullDown, 500)
    }, [pullDown])

    useEffect(() => {
        const scroll = new BScroll(scrollContaninerRef.current, {
            scrollX: direction === "horizental",
            scrollY: direction === "vertical",
            probeType: 3,
            click: true,
            bounce: {
                top: bounceTop,
                bottom: bounceBottom
            }
        })
        setScroll(scroll)
    }, [])

    useEffect(()=>{
        if(!bScroll || !onScroll) return
        bScroll.on('scroll',onScroll)
        return ()=>{
            bScroll.off('scroll',onScroll)
        }
    },[onScroll,bScroll])

    useEffect(() => {
        if (!bScroll || !pullUp) return
        const handlePullUp = () => {
            if (bScroll.y <= bScroll.maxScrollY + 100) {
                pullUpDebounce()
            }
        }
        bScroll.on('scrollEnd', handlePullUp)
        return () => {
            bScroll.off('scrollEnd', handlePullUp)
        }
    }, [pullUp, pullUpDebounce, bScroll])

    useEffect(() => {
        if (!bScroll || !pullDown) return
        const handlePullDown = (pos) => {
            // 用户下拉动作
            if (pos.y>50) {
                pullDownDebounce()
            }
        }
        bScroll.on('touchEnd', handlePullDown)
        return () => {
            bScroll.off('touchEnd', handlePullDown)
        }
    },[pullDown,pullDownDebounce,bScroll])


    useEffect(() => {
        if (refresh && bScroll) {
            bScroll.refresh()
        }
    })

    useImperativeHandle(ref, () => ({
        refresh() {
            if (bScroll) {
                bScroll.refresh()
                bScroll.scrollTo(0, 0)
            }
        }
    }))

    return (
        <ScrollContainer ref={scrollContaninerRef}>
            {props.children}
        </ScrollContainer>
    )
})

Scroll.defaultProps = {
    direction: "vertical",
    click: true,
    refresh: true,
    onScroll: null,
    pullUpLoading: false,
    pullDownLoading: false,
    pullUp: () => { },
    pullDown: () => { },
    bounceTop: true,
    bounceBottom: true
};

Scroll.propTypes = {
    direction: PropTypes.oneOf(['vertical', 'horizental']),
    refresh: PropTypes.bool,
    onScroll: PropTypes.func,
    pullUp: PropTypes.func,
    pullDown: PropTypes.func,
    pullUpLoading: PropTypes.bool,
    pullDownLoading: PropTypes.bool,
    bounceTop: PropTypes.bool,//是否支持向上吸顶
    bounceBottom: PropTypes.bool//是否支持向上吸顶
};


export default React.memo(Scroll);