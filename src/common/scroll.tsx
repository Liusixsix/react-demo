import React, { forwardRef, useState, useEffect, useRef, useImperativeHandle, useMemo, ReactElement } from 'react'
import styled from 'styled-components'
import BScroll from 'better-scroll'
import PropTypes from "prop-types"

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

        if (pullUp) {
            scroll.on('scrollEnd', () => {
                //判断是否滑动到了底部
                if (scroll.y <= scroll.maxScrollY + 100) {
                    pullUp()
                }
            })
        }

        if (pullDown) {
            scroll.on('touchEnd', (pos) => {
                if (pos.y > 50) {
                    pullDown()
                }
            })
        }

        if (onScroll) {
            scroll.on('scroll', scroll => {
                onScroll(scroll)
            })
        }

        if (refresh) {
            scroll.refresh();
        }

        return () => {
            scroll.off('scroll')
            setScroll(null)
        }
    }, [])

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