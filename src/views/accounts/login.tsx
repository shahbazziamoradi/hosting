import React, { useState } from 'react'
import { Button, Input, inputType, buttonType, buttonTheme } from '../../components/cute-ui/cuteUI'
import './../../assets/fonts/fonts.css'
import './login.css'
import * as Icon from 'react-bootstrap-icons';
import { Layout, accessType } from '../layout/layout'
import { Route, Link } from 'react-router-dom';

export function Login(props: { authorize: boolean }) {
    return (
        <Layout {...props} bodyClass='login' access={accessType.public}>
            <PartialLogin>

            </PartialLogin>
        </Layout >
    )
}

export function PartialLogin(props: object) {
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    return (
        <div className='partial-login'>
            <Input title='نام کاربری' onChange={(e) => {
                setUsername(e); console.log(e);
            }}></Input>
            <Input type={inputType.password} title='کلمه عبور' onChange={(e) => {
                setPassword(e); console.log(e);
            }}></Input>
            <Route render={({ history }) => (
                <Button disabled={(password && username) ? false : true} type={buttonType.primary} theme={buttonTheme.outline} style={{ marginTop: 10 }} onClick={() => {
                    if (password && username) {
                        history.push('/')
                    }
                }}>
                    <Icon.BoxArrowInLeft size={20}></Icon.BoxArrowInLeft>
                ورود به سیستم
                </Button>
            )} />
        </div>
    )
}