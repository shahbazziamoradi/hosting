import React, { useState } from 'react'
import './../../assets/fonts/fonts.css'
import './styles/index.css'
import * as Icon from 'react-bootstrap-icons';
import { Layout, Loading, Toast } from '../layout/layout'
import { PersianCalendar } from '../../components/cute-ui/persianCalendar/persianCalendar';
import { Basic, Table } from '../../components/cute-ui/cuteUI';

export function Traffic({ authorize = false }: { authorize: boolean }) {

    return (
        <Layout isAuthenticated={authorize} title='تردد‌ها' icon={Icon.House} style={{ padding: 5 }}>
            <Table.Table className='text-small' border type={Basic.type.dark}>
                <Table.THead>
                    <Table.Tr>
                        <Table.Th width={30}>#</Table.Th>
                        <Table.Th width={120}>زمان تردد</Table.Th>
                        <Table.Th width={100}>نحوه شناسایی</Table.Th>
                        <Table.Th width={200}>مکان ورود</Table.Th>
                        <Table.Th>نام و نام خانوادگی</Table.Th>
                        <Table.Th width={30}></Table.Th>
                    </Table.Tr>
                </Table.THead>
                <Table.TBody></Table.TBody>
            </Table.Table>
        </Layout>
    )
}