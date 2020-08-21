import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect, BrowserRouter, useHistory } from 'react-router-dom'
import { Account } from '../controllers/controllers';
import './routing.css'
type routesProps = {
    children: object | string
}

export function Routes({ children = '' }: routesProps) {
    return (
        <BrowserRouter>
            <Switch>
                {children}
            </Switch>
        </BrowserRouter>
    )
}

type privateProps = {
    component: any,
    path?: string,
}

export function Private({ component: Component, path = '' }: privateProps) {
    const [auth, setAuth] = useState(true);
    const [checkAuth, setCheckAuth] = useState(true);
    useEffect(() => {
        // Account.isInRole(path).then((response) => {
        //     // if (response) {
        //     //     setAuth(true);
        //     // }
        //     // setCheckAuth(false);
        // });
        setTimeout(() => {
            setCheckAuth(false)
        }, 1);
    }, []);
    if (checkAuth) {
        return (<div className='routing-container-fluid'>
            <div className='spinner'></div>
        </div>)
    } else {
        return (
            <Route render={(e) => (
                (auth) ? (
                    <Component {...e} authorize={auth} />
                ) : (
                        <Redirect to={{ pathname: '/login', state: { from: e.location } }} />
                    )
            )
            } />
        )
    }

}

export function Public(props: object) {
    return (
        <Route {...props} />
    )
}