import React from 'react'
import '../styles/button.css'

export enum buttonType {
    primary = 'primary',
    success = 'success',
    info = 'info',
    warning = 'warning',
    danger = 'danger',
    default = 'light',
    secondary = 'secondary',
    dark = 'dark',
    light = 'light'
}

export enum buttonTheme {
    fill = 'fill',
    outline = 'outline'
}

type buttonProps = {
    style?: object,
    type?: buttonType,
    theme?: buttonTheme,
    children?: object | string,
    onChange?: (e: string) => {}
}

export default function Button({ style, type = buttonType.default, theme = buttonTheme.fill, children = {}, onChange = (e: string) => { return e; } }: buttonProps) {
    return (
        <button className={`cute-ui ${type} ${theme}`} style={style}>{children}</button>
    )
}