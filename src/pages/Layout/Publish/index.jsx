import React, { useEffect, useRef, useState } from 'react'
import {
    Card,
    Breadcrumb,
    Form,
    Input,
    Button,
    Space,
    Radio,
    Upload,
    message,
    Modal,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import Channels from '@/components/Channels'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import styles from './index.module.scss'
import { Link, useHistory, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addArticle } from '@/store/actions/publish'
import { getArticleDetail } from '@/store/actions/publish'
import { editArticle } from '@/store/actions/publish'
export default function Publish() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const form = useRef(null)
    const [type, setType] = useState(1)
    const [fileList, setflieList] = useState([])
    const [visible, setVisble] = useState(false)
    const [preview, setPreview] = useState('')
    const imgRef = useRef(fileList)
    useEffect(() => {
        if (!id) return
        dispatch(getArticleDetail(id)).then(res => {
            const showImg = res.data.cover.images.map(item => {
                return {
                    url: item,
                }
            })
            form.current.setFieldsValue({
                ...res.data,
                type: res.data.cover.type,
            })
            setType(res.data.cover.type)
            setflieList(showImg)
            imgRef.current = showImg
        })
    }, [id, dispatch])
    const changeType = e => {
        setType(e.target.value)
        if (e.target.value === 1) {
            setflieList(imgRef.current.slice(0, 1))
        } else if (e.target.value === 3) {
            setflieList(imgRef.current.slice(0, 3))
        } else {
            setflieList(imgRef.current.slice(0, 0))
        }
    }
    const onChangImg = e => {
        imgRef.current = e.fileList
        setflieList(imgRef.current)
        form.current.validateFields(['type'])
    }
    const subArticle = (val, draft = false) => {
        if (id) {
            return editArticle(
                {
                    ...val,
                    cover: {
                        type: val.type,
                        images: fileList.map(item => {
                            if (item.url) {
                                return item.url
                            } else {
                                return item.response.data.url
                            }
                        }),
                    },
                },
                id
            )
        } else {
            return addArticle(
                {
                    ...val,
                    cover: {
                        type,
                        images: fileList.map(item => {
                            if (item.url) {
                                return item.url
                            } else {
                                return item.response.data.url
                            }
                        }),
                    },
                },
                draft
            )
        }
    }
    const onPreview = val => {
        if (val.url) {
            setPreview(val.url)
        } else {
            setPreview(val.response.data.url)
        }
        setVisble(true)
    }
    const pubArticle = async val => {
        await dispatch(subArticle(val))
        message.success('????????????')
        history.push('/home/article')
    }
    const saveArticle = () => {
        form.current
            .validateFields()
            .then(res => dispatch(subArticle(res, true)))
        message.success('????????????')
        history.push('/home/article')
    }
    return (
        <div className={styles.root}>
            <Card
                title={
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to='/home'>??????</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            {id ? '??????' : '??????'}??????
                        </Breadcrumb.Item>
                    </Breadcrumb>
                }
            >
                <Form
                    ref={form}
                    labelCol={{
                        span: 3,
                    }}
                    initialValues={{
                        content: '',
                        type,
                    }}
                    onFinish={pubArticle}
                >
                    <Form.Item
                        label='??????'
                        name='title'
                        rules={[{ required: true, message: '???????????????' }]}
                    >
                        <Input style={{ width: 400 }}></Input>
                    </Form.Item>
                    <Form.Item
                        label='??????'
                        name='channel_id'
                        rules={[{ required: true, message: '???????????????' }]}
                    >
                        <Channels></Channels>
                    </Form.Item>
                    <Form.Item
                        label='??????'
                        name='type'
                        rules={[
                            {
                                validator: (_, val) => {
                                    if (val > fileList.length) {
                                        return Promise.reject(
                                            new Error(`?????????${val}?????????`)
                                        )
                                    } else {
                                        return Promise.resolve()
                                    }
                                },
                            },
                        ]}
                    >
                        <Radio.Group onChange={changeType} value={type}>
                            <Radio value={1}>??????</Radio>
                            <Radio value={3}>??????</Radio>
                            <Radio value={0}>??????</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 3 }}>
                        <Upload
                            action={`${process.env.REACT_APP_BASE_URL}upload`}
                            listType='picture-card'
                            onChange={onChangImg}
                            onPreview={onPreview}
                            fileList={fileList}
                            name='image'
                            maxCount={type}
                        >
                            {type > imgRef.current.length && <PlusOutlined />}
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        label='??????'
                        name='content'
                        rules={[{ required: true, message: '???????????????' }]}
                    >
                        <ReactQuill></ReactQuill>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 3 }}>
                        <Space>
                            <Button type='primary' htmlType='submit'>
                                {id ? '??????' : '??????'}??????
                            </Button>
                            <Button onClick={saveArticle}>????????????</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
            <Modal
                title='????????????'
                visible={visible}
                footer={null}
                onCancel={() => setVisble(false)}
            >
                <img src={preview} style={{ width: '100%' }} alt='' />
            </Modal>
        </div>
    )
}
