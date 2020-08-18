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
    onClick?: (e?: object) => void
}

export default function Button({ style, type = buttonType.default, theme = buttonTheme.fill, children = {}, onClick = () => { } }: buttonProps) {
    return (
        <button className={`cute-ui ${type} ${theme}`} style={style} onClick={(e) => {
            onClick(e)
        }}>{children}</button>
    )
}