import React, { useEffect, useState } from 'react'
import '../styles/table.css'
import * as Basic from './basics'
type TablePropsType = {
    children?: any,
    type?: Basic.type,
    border?: boolean,
    striped?: boolean,
    style?: React.CSSProperties | undefined,
    className?: string,
    primary?: boolean,
    success?: boolean,
    info?: boolean,
    warning?: boolean,
    danger?: boolean,
    default?: boolean,
    secondary?: boolean,
    dark?: boolean,
    light?: boolean,
    right?: boolean,
    center?: boolean,
    left?: boolean,
    fixed?: boolean
}
type TableSectionPropsType = {
    active?: boolean,
    className?: string,
    children?: any,
    style?: React.CSSProperties | undefined
}
type TableRowPropsType = {
    active?: boolean,
    className?: string,
    children?: any,
    style?: React.CSSProperties | undefined
}
type TableCellPropsType = {
    active?: boolean,
    className?: string,
    children?: any,
    style?: React.CSSProperties | undefined,
    colSpan?: number,
    rowSpan?: number,
    textAlign?: Basic.textAlign,
    width?: number,
    full?: boolean,
    nowrap?: boolean,
    right?: boolean,
    center?: boolean,
    left?: boolean
}

export function Table({ children,
    className,
    striped,
    style,
    border,
    fixed = false,
    primary = false,
    success = false,
    info = false,
    warning = false,
    danger = false,
    secondary = false,
    dark = false,
    light = false, ...props }: TablePropsType) {

    return (
        <table className={`cute-ui-table ${className} ${(border) ? 'border' : ''}
            ${(fixed) ? ' fixed ' : ''}
            ${(primary) ? ' primary ' : ''}
            ${(success) ? ' success ' : ''}
            ${(info) ? ' info ' : ''}
            ${(warning) ? ' warning ' : ''}
            ${(danger) ? ' danger ' : ''}
            ${(secondary) ? ' secondary ' : ''} 
            ${(dark) ? ' dark ' : ''}
            ${(light) ? ' light ' : ''}
            ${(props.right) ? ' text-right ' : ''}
            ${(props.left) ? ' text-left ' : ''}
            ${(props.center) ? ' text-center ' : ''}
        `} cellPadding={0} style={style}>
            {children}
        </table>
    )
}
export function THead(props: TableSectionPropsType) {

    return (
        <thead className={`cute-ui-thead ${props.className} ${(props.active) ? 'active' : ''}`} style={props.style}>{props.children}</thead>
    )
}
export function TBody(props: TableSectionPropsType) {
    return (
        <tbody className={`cute-ui-tbody ${props.className} ${(props.active) ? 'active' : ''}`} style={props.style}>{props.children}</tbody>
    )
}

export function Tr(props: TableRowPropsType) {

    return (
        <tr className={`cute-ui-tr ${props.className} ${(props.active) ? 'active' : ''}`} style={props.style}>{props.children}</tr>
    )
}

export function Th(props: TableCellPropsType) {

    return (
        <th colSpan={props.colSpan} rowSpan={props.rowSpan} className={`cute-ui-th ${props.className} ${(props.active) ? 'active' : ''} ${props.textAlign}${props.right ? ' text-right' : ''}${props.center ? ' text-center' : ''}${props.left ? ' text-left' : ''}`} style={{ width: props.width, maxWidth: props.width, minWidth: props.width, ...props.style }}>{props.children}</th>
    )
}

export function Td({ nowrap = true, ...props }: TableCellPropsType) {

    return (
        <td colSpan={props.colSpan} rowSpan={props.rowSpan} className={`cute-ui-td ${props.className} ${(nowrap) ? 'nowrap' : ''} ${(props.active) ? 'active' : ''} ${(props.full) ? 'full' : ''} ${props.textAlign}${props.right ? ' text-right' : ''}${props.center ? ' text-center' : ''}${props.left ? ' text-left' : ''}`} style={{ width: props.width, maxWidth: props.width, minWidth: props.width, ...props.style }}>{props.children}</td>
    )
}