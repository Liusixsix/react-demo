import { time } from 'console';
import React, {useState, useImperativeHandle, forwardRef} from 'react';
import { CSSTransition } from 'react-transition-group';
import './index.scss'

const Toast = forwardRef((props:any,ref)=>{
    const [show, setShow] = useState(false);
    const [timer, setTimer] = useState<any>('');
    const {text} = props;

    useImperativeHandle(ref,()=>{
        return {
            show(){
                if(timer) clearInterval(timer)
                setShow(true)
                setTimer(setTimeout(()=>{
                    setShow(false)
                },3000))
            },
        }
    })

    return (
        <CSSTransition in={show} timeout={300} classNames='drop' unmountOnExit>
            <div className='ToastWrapper'>
                  <div className="text">{text}</div>
            </div>
        </CSSTransition>
    )
})

export default React.memo(Toast)