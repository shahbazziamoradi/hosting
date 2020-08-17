import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect, BrowserRouter, useHistory } from 'react-router-dom'

export function Routes(props) {
    return (
        <BrowserRouter>
            <Switch {...props}>
                {props.children}
            </Switch>
        </BrowserRouter>
    )
}

export function Private(props) {
    const { component: Component, path, ...restProps } = props;
    const [auth, setAuth] = useState(false);
    const [checkAuth, setCheckAuth] = useState(true);
    useEffect(() => {
        // AccountsApi.checkRole(path).then((response) => {
        //     if (response) {
        //         setAuth(true);
        //     }
        //     setCheckAuth(false);
        // });
    }, []);
    if (checkAuth) {
        return (<div>
            loading...
        </div>)
    } else {
        return (
            <Route {...restProps} render={(props) => (
                (auth) ? (
                    <Component {...props} />

                ) : (
                        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                    )
            )
            } />
        )
    }

}

export function Public(props) {
    return (
        <Route {...props} />
    )
}