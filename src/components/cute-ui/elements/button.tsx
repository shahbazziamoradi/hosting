import React from 'react'
import '../styles/button.css'

export enum buttonType {
    primary = 'primary',
    success = 'success',
    info = 'info',
    warning = 'warning',
    danger = 'danger',
    default = 'secondary',
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
    className?: string,
    type?: buttonType,
    disabled?: boolean,
    active?: boolean,
    theme?: buttonTheme,
    children?: object | string,
    onClick?: (e?: object) => void,
    rounded?: boolean,
    value?: any
}

export default function Button({ active = false, className, style, type = buttonType.default, theme = buttonTheme.fill, children = '', onClick = () => { }, disabled = false, rounded = false }: buttonProps) {
    return (
        <button disabled={disabled} className={`cute-ui ${type} ${theme} ${(rounded) ? 'rounded' : ''} ${(active) ? 'active' : ''} ${className}`} style={style} onClick={(e) => {
            onClick(e)
        }}>{children}</button>
    )
}