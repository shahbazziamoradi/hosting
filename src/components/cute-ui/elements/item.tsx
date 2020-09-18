import React from 'react'
import '../styles/item.css'
import * as Icon from 'react-bootstrap-icons';
import Button from './button';
import * as Basic from './basics';

type itemProps = {
    style?: React.CSSProperties | undefined,
    className?: string,
    type?: Basic.type,
    disabled?: boolean,
    active?: boolean,
    theme?: Basic.theme,
    children?: object | string,
    onClick?: (e?: object) => void,
    onAction?: (e?: object) => void,
    sharp?: boolean,
    full?: boolean,
    value?: any,
    size?: Basic.size,
    icon?: any,
    primary?: boolean,
    success?: boolean,
    info?: boolean,
    warning?: boolean,
    danger?: boolean,
    secondary?: boolean,
    dark?: boolean,
    light?: boolean
}

export default function Item({
    active = false,
    full = false,
    className,
    style,
    type = Basic.type.primary,
    theme = Basic.theme.fill,
    size = Basic.size.medium,
    children = '',
    onClick = () => { },
    onAction = () => { },
    disabled = false,
    sharp = false,
    icon: ActionIcon = Icon.X,
    primary = false,
    success = false,
    info = false,
    warning = false,
    danger = false,
    secondary = false,
    dark = false,
    light = false
}: itemProps) {
    return (
        <div className={`cute-ui item-block ${full ? 'full' : ''} ${className}`} style={style}>
            <Button className='item-title' size={size} primary={primary}
                success={success}
                info={info}
                warning={warning}
                danger={danger}
                secondary={secondary}
                dark={dark}
                light={light}
                onClick={() => { onClick() }}>
                {children}
            </Button>
            <Button className='item-remove' size={size} primary={primary}
                success={success}
                info={info}
                warning={warning}
                danger={danger}
                secondary={secondary}
                dark={dark}
                light={light}
                onClick={() => { onAction() }}>
                <ActionIcon size={21}></ActionIcon>
            </Button>
        </div >
    )
}