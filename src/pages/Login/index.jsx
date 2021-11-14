import React, { useState } from 'react'
import styles from './index.module.scss'
import { Card, Form, Input, Button, Checkbox, message } from 'antd'
import logo from '@/assets/logo.png'
import { useDispatch } from 'react-redux'
import { login } from '@/store/actions/login'
import { useHistory, useLocation } from 'react-router'
export default function Login() {
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()
    const [loading, setLoading] = useState(false)
    const onFinish = async val => {
        let from = location.state ? location.state.from : '/home'
        setLoading(true)
        try {
            await dispatch(login(val))
        } catch (e) {
            setLoading(false)
            message.error(e.response?.data.message, 1)
            return
        }
        message.success('登录成功', 1, () => history.replace(from))
    }
    return (
        <div className={styles.root}>
            <Card className='login-container'>
                <img className='login-logo' src={logo} alt='' />
                {/* 登录表单 */}
                <Form
                    name='basic'
                    wrapperCol={{ span: 24 }}
                    initialValues={{
                        agreement: true,
                        mobile: '13702890345',
                        code: '246810',
                    }}
                    autoComplete='off'
                    size='large'
                    validateTrigger={['onChange', 'onBlur']}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name='mobile'
                        rules={[
                            {
                                pattern: /^1[3-9]\d{9}$/,
                                message: '请输入正确的手机格式',
                            },
                            {
                                required: true,
                                message: '请输入您的手机号',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name='code'
                        rules={[
                            { pattern: /^\d{6}$/, message: '请输入6位验证码' },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name='agreement'
                        valuePropName='checked'
                        rules={[
                            {
                                validator: (_, val) => {
                                    if (val) {
                                        return Promise.resolve()
                                    } else {
                                        return Promise.reject(
                                            new Error('请阅读并同意相关条款')
                                        )
                                    }
                                },
                            },
                        ]}
                    >
                        <Checkbox>
                            我已阅读并同意[隐私条款]和[用户协议]
                        </Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type='primary'
                            htmlType='submit'
                            block
                            loading={loading}
                        >
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}
