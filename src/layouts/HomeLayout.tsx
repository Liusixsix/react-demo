import React from 'react'
import { renderRoutes } from 'react-router-config'
import { NavLink } from 'react-router-dom'
import './index.css'

export default function Layout(props: any) {
    const { route } = props
    return (
        <footer >
            {renderRoutes(route.routes)}
            <ul className='nav-footer'>
                <li>
                    <NavLink to='/home' activeClassName='selected'>
                        <div className='tab-title'>发现</div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/home' activeClassName='selected'>
                        <div className='tab-title'>发现</div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/home' activeClassName='selected'>
                        <div className='tab-title'>发现</div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/home' activeClassName='selected'>
                        <div className='tab-title'>发现</div>
                    </NavLink>
                </li>
            </ul>
        </footer>
    )
}