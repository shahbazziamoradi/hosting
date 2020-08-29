import React, { useEffect, useState } from 'react'
import '../styles/table.css'
export enum tableTheme {
    primary = 'primary',
    secondary = 'secondary',
    success = 'success',
    info = 'info',
    warning = 'warning',
    danger = 'danger',
    light = 'light',
    dark = 'dark'
}
type TablePropsType = {
    children?: any,
    theme?: tableTheme,
    border?: boolean,
    striped?: boolean,
    style?: React.CSSProperties | undefined,
    className?: string,
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
    rowSpan?: number
}

export function Table({ children,
    theme = tableTheme.dark,
    className,
    striped,
    style,
    border }: TablePropsType) {

    return (
        <table className={`cute-ui-table ${theme} ${className} ${(border) ? 'border' : ''}`} cellPadding={0} style={style}>
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
        <th colSpan={props.colSpan} rowSpan={props.rowSpan} className={`cute-ui-th ${props.className} ${(props.active) ? 'active' : ''}`} style={props.style}>{props.children}</th>
    )
}

export function Td(props: TableCellPropsType) {

    return (
        <td colSpan={props.colSpan} rowSpan={props.rowSpan} className={`cute-ui-td ${props.className} ${(props.active) ? 'active' : ''}`} style={props.style}>{props.children}</td>
    )
}