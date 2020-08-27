import React, { useRef, useState, useMemo } from 'react'
import { Link, Route, useRouteMatch,useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { add, min } from '../../store/actions'

type Data = {
    time: number
}

const Aa: React.FC<Data> = ({ children, time }) => {
    const history = useHistory()
    function changeTime(time: number): string {
        console.log('changeTime excuted...')
        return new Date(time).toISOString()
    }

    const newTime: string = useMemo(() => {
        return changeTime(time)
    }, [time])

    return (
        <div>{children} -- {newTime}</div>
    )
}

const About = (props) => {
    const history = useHistory()
    const { count, add, min, Async } = props
    const inputEl = useRef<HTMLInputElement>(null)
    const [time, setTime] = useState<number>(0)
    const [random, setRandom] = useState<number>(0)
    const { path } = useRouteMatch()

    return (
        <div>
            
            <h1>{count}</h1>
      
            <button onClick={() => add()}>加</button>
            <button onClick={() => min()}>减</button>
            <button onClick={() => history.goBack()}>异步</button>
            <button onClick={() => setTime(new Date().getTime())}>获取当前时间</button>
            <button onClick={() => setRandom(Math.random())}>获取当前随机数</button>
            <Aa time={time}>{random}</Aa>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        count: state
    }
}

const mapDispatchToProps = dispatch => ({
    add: () => { dispatch(add()) },
    min: () => { dispatch(min()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(About)