import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import { Button, Input } from '../../components/cute-ui/cuteUI'
import './../../assets/fonts/fonts.css'
import './styles/login.css'
import * as Icon from 'react-bootstrap-icons';
import { Layout, accessType, Toast, Loading } from '../layout/layout'
import { Route, Link } from 'react-router-dom';
import * as Basic from '../../components/cute-ui/elements/basics'
import { Accounts } from '../../controllers/controllers';

export function Login(props: { authorize: boolean }) {
    return (
        <Layout {...props} bodyClass='login' access={accessType.public}>
            <PartialLogin />
        </Layout >
    )
}

export function PartialLogin(props: object) {
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    useEffect(() => {
        // ReactDOM.render('ورود به سیستم', document.getElementsByTagName('title')[0]);
    }, [])
    return (
        <div className='partial-login'>
            <Input title='نام کاربری' onChange={(e) => {
                setUsername(e);
            }}></Input>
            <Input type={Basic.input.password} title='کلمه عبور' onChange={(e) => {
                setPassword(e);
            }}></Input>
            <Route render={({ history }) => (
                <Button disabled={(password && username) ? false : true} type={Basic.type.primary} theme={Basic.theme.outline} style={{ marginTop: 10 }} onClick={() => {
                    if (password && username) {
                        Loading(true)
                        Accounts.login(username, password).then((e) => {
                            history.push('/')
                        }).catch((e) => {
                            Toast(e.message, Basic.type.danger)
                        }).finally(() => {
                            Loading(false)
                        })
                    }
                }}>
                    <Icon.BoxArrowInLeft size={20}></Icon.BoxArrowInLeft>
                ورود به سیستم
                </Button>
            )} />
        </div>
    )
}