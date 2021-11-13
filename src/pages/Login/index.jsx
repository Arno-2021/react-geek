import React from 'react'
import './index.scss'
import { Card, Form, Input, Button, Checkbox } from 'antd'
import logo from '@/assets/logo.png'
export default function Login() {
    const onFinish = val => {
        console.log(val)
    }
    return (
        <div className='login'>
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
                        <Button type='primary' htmlType='submit' block>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}
