import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getChannels } from '@/store/actions/article'
import { Select } from 'antd'
export default function Channels(props) {
    const dispatch = useDispatch()
    const channels = useSelector(state => state.article.channels)
    useEffect(() => {
        dispatch(getChannels())
    }, [dispatch])
    return (
        <Select
            style={{ width: 120 }}
            placeholder='请选择频道'
            allowClear
            {...props}
        >
            {channels.map(item => (
                <Select.Option value={item.id} key={item.id}>
                    {item.name}
                </Select.Option>
            ))}
        </Select>
    )
}
