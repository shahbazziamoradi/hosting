import React, { useState } from 'react'
import { Button, Input, inputType } from '../../components/cute-ui/cuteUI'
import './../../assets/fonts/fonts.css'
import './login.css'
import { buttonType, buttonTheme } from '../../components/cute-ui/elements/button'
import * as Icon from 'react-bootstrap-icons';
import { Layout, Header, Body } from '../layout/layout'
import { Route, Link } from 'react-router-dom';

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
    return (
        <div className='partial-login'>
            <Input title='نام کاربری'></Input>
            <Input type={inputType.password} title='کلمه عبور'></Input>
            <Route render={({ history }) => (
                <Button type={buttonType.primary} theme={buttonTheme.outline} style={{ marginTop: 10 }} onClick={() => {
                    history.push('/call');
                }}>
                    <Icon.BoxArrowInLeft size={20}></Icon.BoxArrowInLeft>
                ورود به سیستم
                </Button>
            )} />
        </div>
    )
}