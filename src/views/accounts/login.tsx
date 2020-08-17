import React, { useState } from 'react'
import { Button, Input, inputType } from '../../components/cute-ui/cuteUI'
import './../../assets/fonts/fonts.css'
import './login.css'
import { buttonType, buttonTheme } from '../../components/cute-ui/elements/button'
import * as Icon from 'react-bootstrap-icons';
import { Layout, Header, Body } from '../layout/layout'
export function Login(props: object) {
    return (
        <Layout>
            <Body className='login'>
                <PartialLogin>

                </PartialLogin>
            </Body>
        </Layout>
    )
}

export function PartialLogin(props: object) {
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    return (
        <div className='partial-login' style={{ left: x, top: y }} onDrag={(e) => {
            setX(e.pageX);
            setY(e.pageY)
        }}>
            {/* <Input title='نام کاربری'></Input>
            <Input type={inputType.password} title='کلمه عبور'></Input>
            <Button type={buttonType.primary} theme={buttonTheme.outline} style={{ marginTop: 10 }}>
                <Icon.BoxArrowInLeft size={20}></Icon.BoxArrowInLeft>
                ورود به سیستم
            </Button> */}
        </div>
    )
}