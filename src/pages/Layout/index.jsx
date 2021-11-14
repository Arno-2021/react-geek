import React, { useEffect } from 'react'
import { Layout, Menu } from 'antd'
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
    LogoutOutlined,
    HomeOutlined,
    HddOutlined,
    EditOutlined,
} from '@ant-design/icons'
import { Route, Link, Switch, useLocation } from 'react-router-dom'
import Home from './Home'
import Article from './Article'
import Publish from './Publish'
import { getUserInfo } from '@/store/actions/user'
const { Header, Sider } = Layout
export default function MyLayout() {
    const location = useLocation()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    useEffect(() => {
        dispatch(getUserInfo())
    }, [dispatch])
    return (
        <div className={styles.root}>
            <Layout>
                <Header className='header'>
                    <div className='logo' />
                    <div className='profile'>
                        <span>{user.name}</span>
                        <span>
                            <LogoutOutlined></LogoutOutlined> 退出
                        </span>
                    </div>
                </Header>
                <Layout>
                    <Sider width={200} className='site-layout-background'>
                        <Menu
                            mode='inline'
                            selectedKeys={[location.pathname]}
                            style={{ height: '100%', borderRight: 0 }}
                            theme='dark'
                        >
                            <Menu.Item key='/home' icon={<HomeOutlined />}>
                                <Link to='/home'>数据预览</Link>
                            </Menu.Item>
                            <Menu.Item
                                key='/home/article'
                                icon={<HddOutlined />}
                            >
                                <Link to='/home/article'>内容管理</Link>
                            </Menu.Item>
                            <Menu.Item
                                key='/home/publish'
                                icon={<EditOutlined />}
                            >
                                <Link to='/home/publish'>发布文章</Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Switch>
                            <Route exact path='/home' component={Home}></Route>
                            <Route
                                path='/home/article'
                                component={Article}
                            ></Route>
                            <Route
                                path='/home/publish'
                                component={Publish}
                            ></Route>
                        </Switch>
                    </Layout>
                </Layout>
            </Layout>
        </div>
    )
}
