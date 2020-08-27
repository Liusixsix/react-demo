import React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Route, Switch } from 'react-router-dom'
import './fade.css'
const AnimatedSwitch = props => {
    const { children } = props
    const ANIMATION_MAP = {
        PUSH: 'forward', //前进动画
        POP: 'back' //后退动画
    }
    return (
        <Route render={({ location, history }) => {
            return (
                <TransitionGroup
                    className={'router-wrapper'}
                    childFactory={child => React.cloneElement(
                        child,
                        { classNames: ANIMATION_MAP[history.action] }
                    )}
                >
                    <CSSTransition
                        key={location.pathname}
                        timeout={300}
                    >
                        <Switch location={location}>
                            {children}
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
            )
        }}>
        </Route>
    )
}
export default AnimatedSwitch