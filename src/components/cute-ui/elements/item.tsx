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
    onRemove?: (e?: object) => void,
    sharp?: boolean,
    full?: boolean,
    value?: any,
    size?: Basic.size
}

export default function Item({ active = false, full = false, className, style, type = Basic.type.default, theme = Basic.theme.fill, size = Basic.size.medium, children = '', onClick = () => { }, onRemove = () => { }, disabled = false, sharp = false }: itemProps) {
    return (
        <div className={`cute-ui item-block ${full ? 'full' : ''}`} style={style}>
            <Button className='item-title' size={size} onClick={() => { onClick() }}>
                {children}
            </Button>
            <Button className='item-remove' onClick={() => { onRemove() }}>
                <Icon.X size={21}></Icon.X>
            </Button>
        </div >
    )
}