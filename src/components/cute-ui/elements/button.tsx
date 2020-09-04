import React from 'react'
import '../styles/button.css'
import * as Basic from './basics'

type buttonProps = {
    style?: React.CSSProperties | undefined,
    className?: string,
    type?: Basic.type,
    disabled?: boolean,
    active?: boolean,
    theme?: Basic.theme,
    children?: object | string,
    onClick?: (e?: object) => void,
    rounded?: boolean,
    sharp?: boolean,
    full?: boolean,
    outline?: boolean,
    value?: any,
    size?: Basic.size | number
}

export default function Button({ active = false, full = false, outline = false, className, style, type = Basic.type.default, theme = Basic.theme.fill, size = Basic.size.medium, children = '', onClick = () => { }, disabled = false, rounded = false, sharp = false }: buttonProps) {

    return (
        <button disabled={disabled} className={`cute-ui ${type} ${theme} ${((typeof size) == typeof Basic.size) ? size : null} ${(rounded) ? 'rounded' : ''}  ${size} ${(sharp) ? 'sharp' : ''} ${(full) ? 'full' : ''} ${(active) ? 'active' : ''} ${(outline) ? 'outline' : ''} ${className}`} style={{ ...style }} onClick={(e) => {
            onClick(e)
        }}>{children}</button>
    )
}