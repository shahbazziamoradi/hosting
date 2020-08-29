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

export enum buttonSize {
    xSmall = 'x-small',
    small = 'small',
    medium = 'medium',
    larg = 'larg'
}

type buttonProps = {
    style?: React.CSSProperties | undefined,
    className?: string,
    type?: buttonType,
    disabled?: boolean,
    active?: boolean,
    theme?: buttonTheme,
    children?: object | string,
    onClick?: (e?: object) => void,
    rounded?: boolean,
    full?: boolean,
    value?: any,
    size?: buttonSize
}

export default function Button({ active = false, full = false, className, style, type = buttonType.default, theme = buttonTheme.fill, size = buttonSize.medium, children = '', onClick = () => { }, disabled = false, rounded = false }: buttonProps) {
    return (
        <button disabled={disabled} className={`cute-ui ${type} ${theme} ${size} ${(rounded) ? 'rounded' : ''} ${(full) ? 'full' : ''} ${(active) ? 'active' : ''} ${className}`} style={style} onClick={(e) => {
            onClick(e)
        }}>{children}</button>
    )
}