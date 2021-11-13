import React from 'react'
import { Link } from 'react-router-dom'
export default function NotFound() {
    return (
        <div>
            您所输入的页面不存在！！！<Link to='/home'>返回主页</Link>
        </div>
    )
}
