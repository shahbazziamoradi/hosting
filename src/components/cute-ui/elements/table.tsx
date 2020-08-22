import React, { useEffect, useState } from 'react'
import '../styles/table.css'
export enum tableTheme {

}
type TablePropsType = {
    children?: Element,
    theme?: tableTheme,
    striped?: boolean,
    style?: object,
    className?: string
}
export function Table(props: TablePropsType) {

    return (
        <table className='cute-ui-table'>
            {props.children}
        </table>
    )
}
export function THead(props: TablePropsType) {

    return (
        <thead className='cute-ui-thead'>{props.children}</thead>
    )
}
export function TBody(props: TablePropsType) {

    return (
        <tbody className='cute-ui-tbody'>{props.children}</tbody>
    )
}

export function Tr(props: TablePropsType) {

    return (
        <tr className='cute-ui-tr'>{props.children}</tr>
    )
}

export function Th(props: TablePropsType) {

    return (
        <th className='cute-ui-th'>{props.children}</th>
    )
}

export function Td(props: TablePropsType) {

    return (
        <td className='cute-ui-td'>{props.children}</td>
    )
}