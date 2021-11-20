import React, { useEffect, useState, lazy } from 'react'
import { Layout, Menu, Popconfirm, message } from 'antd'
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
    LogoutOutlined,
    HomeOutlined,
    HddOutlined,
    EditOutlined,
} from '@ant-design/icons'
import { Route, Link, Switch, useLocation, useHistory } from 'react-router-dom'
import { getUserInfo } from '@/store/actions/user'
import { logout } from '@/store/actions/login'
const { Header, Sider } = Layout
const Home = lazy(() => import('./Home'))
const Article = lazy(() => import('./Article'))
const Publish = lazy(() => import('./Publish'))
export default function MyLayout() {
    const { articles } = useSelector(state => state.article)
    const location = useLocation()
    const dispatch = useDispatch()
    const histroy = useHistory()
    const user = useSelector(state => state.user)
    const [pathname, setPathname] = useState(location.pathname)
    useEffect(() => {
        if (location.pathname.startsWith('/home/publish')) {
            setPathname('/home/publish')
        } else {
            setPathname(location.pathname)
        }
    }, [location.pathname])
    useEffect(() => {
        dispatch(getUserInfo())
    }, [dispatch])
    useEffect(() => {
        document.querySelector('.table').scrollTo(0, 0)
    }, [articles.per_page])
    const onConfirm = () => {
        histroy.replace({
            pathname: '/login',
            state: {
                from: location.pathname,
            },
        })
        dispatch(logout())
        message.success('您已成功登出！', 1)
    }
    return (
        <div className={styles.root}>
            <Layout>
                <Header className='header'>
                    <div className='logo' />
                    <div className='profile'>
                        <span>{user.name}</span>
                        <Popconfirm
                            title='您是否要退出登录？'
                            okText='确认'
                            cancelText='取消'
                            placement='bottomRight'
                            onConfirm={onConfirm}
                        >
                            <LogoutOutlined></LogoutOutlined> 退出
                        </Popconfirm>
                        <span></span>
                    </div>
                </Header>
                <Layout>
                    <Sider width={200} className='site-layout-background'>
                        <Menu
                            mode='inline'
                            selectedKeys={[pathname]}
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
                    <Layout
                        style={{ padding: '20px', overflow: 'auto' }}
                        className='table'
                    >
                        <Switch>
                            <Route exact path='/home' component={Home}></Route>
                            <Route
                                path='/home/article'
                                component={Article}
                            ></Route>
                            <Route
                                exact
                                path='/home/publish'
                                key='add'
                                component={Publish}
                            ></Route>
                            <Route
                                path='/home/publish/:id'
                                key='edit'
                                component={Publish}
                            ></Route>
                        </Switch>
                    </Layout>
                </Layout>
            </Layout>
        </div>
    )
}
