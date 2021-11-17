import {
    Card,
    Breadcrumb,
    Form,
    Radio,
    DatePicker,
    Button,
    Table,
    Image,
    Space,
    Tag,
    Popconfirm,
    message,
} from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Link, useHistory } from 'react-router-dom'
import { articleType } from '@/constant/articles'
import Channels from '@/components/Channels'
import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { getArticles } from '@/store/actions/article'
import { useSelector } from 'react-redux'
import eImage from '@/assets/error.png'
import { delArticle } from '@/store/actions/article'
export default function Article() {
    const aRef = useRef({})
    const history = useHistory()
    const articles = useSelector(state => state.article.articles)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getArticles())
    }, [dispatch])
    const onFinish = val => {
        if (val.status !== -1) {
            aRef.current.status = val.status
        } else {
            aRef.current.status = undefined
        }
        if (val.channel_id) {
            aRef.current.channel_id = val.channel_id
        } else {
            aRef.current.channel_id = undefined
        }

        if (val.date) {
            aRef.current.begin_pubdate = val.date[0]
                .startOf('day')
                .format('YYYY-MM-DD HH:mm:ss')
            aRef.current.end_pubdate = val.date[0]
                .endOf('day')
                .format('YYYY-MM-DD HH:mm:ss')
        } else {
            aRef.current.begin_pubdate = undefined
            aRef.current.end_pubdate = undefined
        }
        aRef.current.page = 1
        dispatch(getArticles(aRef.current))
    }
    const onConfirm = async id => {
        await dispatch(delArticle(id))
        await dispatch(getArticles(aRef.current))
        message.success('删除成功')
    }
    const columns = [
        {
            title: '封面',
            dataIndex: 'cover',
            render(text) {
                if (text.type === 0) {
                    return <Image src={eImage} width={300} height={200}></Image>
                } else {
                    return (
                        <Image
                            src={text.images[0]}
                            width={300}
                            height={200}
                        ></Image>
                    )
                }
            },
        },
        {
            title: '标题',
            dataIndex: 'title',
        },
        {
            title: '状态',
            dataIndex: 'status',
            render(text) {
                const item = articleType.find(item => item.id === text)
                return <Tag color={item.color}>{item.value}</Tag>
            },
        },
        {
            title: '发布时间',
            dataIndex: 'address',
        },
        {
            title: '阅读数',
            dataIndex: 'pubdate',
        },
        {
            title: '评论数',
            dataIndex: 'comment_count',
        },
        {
            title: '点赞数',
            dataIndex: 'like_count',
        },
        {
            title: '操作',
            dataIndex: 'id',
            render(text) {
                return (
                    <Space>
                        <Button
                            type='primary'
                            shape='circle'
                            icon={<EditOutlined />}
                            onClick={() =>
                                history.push(`/home/publish/${text}`)
                            }
                        ></Button>
                        <Popconfirm
                            title='确定要删除该文章吗？'
                            onConfirm={() => onConfirm(text)}
                        >
                            <Button
                                type='danger'
                                shape='circle'
                                icon={<DeleteOutlined />}
                            ></Button>
                        </Popconfirm>
                    </Space>
                )
            },
        },
    ]
    return (
        <div>
            <Card
                title={
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to='/home'>首页</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>内容管理</Breadcrumb.Item>
                    </Breadcrumb>
                }
            >
                <Form initialValues={{ status: -1 }} onFinish={onFinish}>
                    <Form.Item label='状态' name='status'>
                        <Radio.Group>
                            {articleType.map(item => (
                                <Radio value={item.id} key={item.id}>
                                    {item.value}
                                </Radio>
                            ))}
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label='频道' name='channel_id'>
                        <Channels></Channels>
                    </Form.Item>
                    <Form.Item label='日期' name='date'>
                        <DatePicker.RangePicker></DatePicker.RangePicker>
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit'>
                            筛选
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            <Card
                title={`根据筛选结果查询到${articles.total_count}条结果`}
                style={{ marginTop: '10px' }}
            >
                <Table
                    dataSource={articles.results}
                    columns={columns}
                    rowKey='id'
                    pagination={{
                        current: articles.page,
                        pageSize: articles.per_page,
                        total: articles.total_count,
                    }}
                    onChange={val => {
                        if (aRef.current.per_page !== val.pageSize) {
                            aRef.current.page = 1
                        } else {
                            aRef.current.page = val.current
                        }
                        aRef.current.per_page = val.pageSize
                        dispatch(getArticles(aRef.current))
                    }}
                />
            </Card>
        </div>
    )
}
