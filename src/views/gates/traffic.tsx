import React, { useEffect, useState } from 'react'
import './../../assets/fonts/fonts.css'
import './styles/traffic.css'
import * as Icon from 'react-bootstrap-icons';
import { Layout, Loading, Toast } from '../layout/layout'
import { PersianCalendar } from '../../components/cute-ui/persianCalendar/persianCalendar';
import { Basic, Table } from '../../components/cute-ui/cuteUI';
import { Places } from '../../controllers/controllers';

export function Traffic({ authorize = false }: { authorize: boolean }) {

    return (
        <Layout isAuthenticated={authorize} title='تردد‌ها' icon={Icon.House} style={{ padding: 5 }}>

            <TrafficList></TrafficList>

        </Layout>
    )
}

export function TrafficList({ placeId = 0 }: { placeId?: number }) {
    const [data, setData] = useState(new Array<any>());
    useEffect(() => {
        Loading(true)
        Places.getTraffic(placeId).then((e) => {
            setData([...e])
            console.log(e)
        }).catch((e) => {
            Toast(e.error.Message, Basic.type.danger)
        }).finally(() => {
            Loading(false)
        })
    }, [])
    return <Table.Table className='text-small' border dark fixed center>
        <Table.THead>
            <Table.Tr>
                <Table.Th width={30}>#</Table.Th>
                <Table.Th right>نام و نام خانوادگی</Table.Th>
                <Table.Th width={120}>زمان تردد</Table.Th>
                <Table.Th width={100}>نحوه شناسایی</Table.Th>
                <Table.Th width={200}>خروج از</Table.Th>
                <Table.Th width={200}>ورود به</Table.Th>
                <Table.Th width={100}>میهمان/پرسنل</Table.Th>
                <Table.Th width={200}>میزبان</Table.Th>
                {/* <Table.Th width={30}></Table.Th> */}
            </Table.Tr>
        </Table.THead>
        <Table.TBody>
            {data.map((row, index) => {
                return (
                    <Table.Tr key={index}>
                        <Table.Td>{index + 1}</Table.Td>
                        <Table.Td right>{row.PPRS_FUL_NAM_GST}</Table.Td>
                        <Table.Td>{row.TIM + ' ' + row.DAT}</Table.Td>
                        <Table.Td>{row.AMOD_TTL}</Table.Td>
                        <Table.Td>{row.APLC_SRC_TTL}</Table.Td>
                        <Table.Td>{row.APLC_DIST_TTL}</Table.Td>
                        <Table.Td>{(row.RTRF_TYP == 1) ? 'پرسنل' : 'میهمان'}</Table.Td>
                        <Table.Td>{row.PPRS_FUL_NAM_HST}</Table.Td>
                    </Table.Tr>
                )
            })}
        </Table.TBody>
    </Table.Table>
}