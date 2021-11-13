import React from 'react'
import './index.scss'
import { Card, Form, Input, Button, Checkbox } from 'antd'
import logo from '@/assets/logo.png'
export default function Login() {
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
                >
                    <Form.Item name='mobile'>
                        <Input />
                    </Form.Item>

                    <Form.Item name='code'>
                        <Input />
                    </Form.Item>

                    <Form.Item name='agreement' valuePropName='checked'>
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
