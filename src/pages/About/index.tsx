import React, { useRef, useState, useMemo, useEffect } from 'react'
import { Link, Route, useRouteMatch, useHistory } from 'react-router-dom'
import classnames from 'classnames'
import './index.scss'
interface list {
    id: number,
    father_id: number,
    status: number
    name: string
    _child?: list[]
}

const lists: list[] = [
    {
        id: 1,
        father_id: 0,
        status: 1,
        name: '生命科学竞赛',
        _child: [
            {
                id: 2,
                father_id: 1,
                status: 1,
                name: '野外实习类',
                _child: [{ id: 3, father_id: 2, status: 1, name: '植物学' }],
            },
            {
                id: 7,
                father_id: 1,
                status: 1,
                name: '科学研究类',
                _child: [
                    { id: 8, father_id: 7, status: 1, name: '植物学与植物生理学' },
                    { id: 9, father_id: 7, status: 1, name: '动物学与动物生理学' },
                    { id: 10, father_id: 7, status: 1, name: '微生物学' },
                    { id: 11, father_id: 7, status: 1, name: '生态学' },
                ],
            },
            { id: 71, father_id: 1, status: 1, name: '添加' },
        ],
    },
    {
        id: 56,
        father_id: 0,
        status: 1,
        name: '考研相关',
        _child: [
            { id: 57, father_id: 56, status: 1, name: '政治' },
            { id: 58, father_id: 56, status: 1, name: '外国语' },
        ],
    },
]

const NestMenu = (props) => {
    const { list } = props

    const [activeid, setId] = useState(null)

    const getSubMenu = () => {
        if (Array.isArray(list) && list.length) {
            return ((list.find(({ id }) => id === activeid) || {})._child) || []
        }
    }

    const setAction = (id) => {
        setId(id)
    }
    return (
        <div className='wrap' >
            <div className="menu-wrap">
                {
                    list && list.map((item: list, index: number) => {
                        return (
                            <div className='menu-item' key={item.id} onClick={() => setAction(item.id)}>
                                {item.name}
                            </div>
                        )
                    })
                }
            </div>
            {list && <NestMenu list={getSubMenu()}></NestMenu>}
        </div>
    )
}

const Demo = () => {
    const [list, setList] = useState(lists)
    const activeId = 1
    return <NestMenu list={list} activeId={1} ></NestMenu>
}

export default Demo