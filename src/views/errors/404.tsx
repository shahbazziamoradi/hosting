import React from 'react'
import { Route } from 'react-router-dom'
import { Button, buttonTheme, buttonType } from '../../components/cute-ui/cuteUI'
import './styles/404.css'
export function E404() {
    return (
        <div className='error-404'>
            <label>صفحه مورد نظر وجود ندارد</label>
            <Route render={({ history }) => (
                <Button theme={buttonTheme.outline} type={buttonType.light} onClick={() => {
                    history.goBack()
                }}>بازگشت به صفحه نخست</Button>
            )} />
        </div>
    )
}