import React, { forwardRef, useState, useEffect, useRef, useImperativeHandle, useMemo, ReactElement } from 'react'
import styled from 'styled-components'
import BScroll from 'better-scroll'

const ScrollContainer = styled.div`
    width:100%,
    height:100%,
    overflow:hidden;
`
const pullUpLoading = styled.div`
    

`
interface Iprops {
    pullUp?: any,
    pullDown?: any,
    onScroll?: any,
    children?: any
}


const Scroll = forwardRef((props: Iprops, ref) => {
    const [bScroll, setScroll] = useState<any>()

    const scrollContaninerRef = useRef()

    const { pullUp, pullDown, onScroll } = props;

    let pullUpDebounce = useMemo(() => {
        return pullUp
    }, [pullUp])

    let pullDownDebounce = useMemo(() => {
        return pullDown
    }, [pullDown]);

    useEffect(() => {
        if (!bScroll || !onScroll) return
        bScroll.on('scroll', onScroll)
        return () => {
            bScroll.off('scroll', onScroll)
        }
    }, [onScroll, bScroll])


    useEffect(() => {
        if (!bScroll || !pullUp) return
        console.log(bScroll.maxScrollY)
        const handlePullUp = () => {
            // 是否滑动到底部
            if (bScroll.y <= bScroll.maxScrollY + 100) {
                console.log(bScroll.y)
                // pullUpDebounce()
            }
        }
        bScroll.on('scrollEnd', handlePullUp)
        return () => {
            bScroll.off('scrollEnd', handlePullUp)
        }
    }, [pullUp, pullDownDebounce, bScroll])

    useEffect(() => {
        if(!bScroll || !pullDown) return;
        const handlePullDown = (pos) => {
          //判断用户的下拉动作
          if(pos.y > 50) {
            pullDownDebounce();
          }
        };
        bScroll.on('touchEnd', handlePullDown);
        return () => {
          bScroll.off('touchEnd', handlePullDown);
        }
      }, [pullDown, pullDownDebounce, bScroll]);

    useEffect(() => {
        const scroll = new BScroll(scrollContaninerRef.current, {
            scrollX: false,
            scrollY: true,
            probeType: 3,
            click: true,
            bounce: {
                top: true,
                bottom: true
            }
        })
        setScroll(scroll)
        return () => {
            setScroll(null)
        }
    }, [])

    return (
        <ScrollContainer ref={scrollContaninerRef}>
            {props.children}
        </ScrollContainer>
    )
})

export default Scroll