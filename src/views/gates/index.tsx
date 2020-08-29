import React, { useEffect, useState } from 'react'
import './../../assets/fonts/fonts.css'
import './styles/index.css'
import * as Icon from 'react-bootstrap-icons';
import { Layout, Loading, Popup, Toast } from '../layout/layout'
import { PersianCalendar } from '../../components/cute-ui/persianCalendar/persianCalendar';
import { Button, Table, Basic } from '../../components/cute-ui/cuteUI';
import { NewGate } from './partials/_newGate';

export function Index({ authorize = false }: { authorize: boolean }) {
    return (
        <Layout isAuthenticated={authorize} title='گیت‌ها' icon={Icon.House} style={{ padding: 5 }}>
            <Table.Table className={'text-small text-right'} border={true} type={Basic.type.dark}>
                <Table.THead>
                    <Table.Tr>
                        <Table.Th style={{ width: 30 }} className='text-center'>#</Table.Th>
                        <Table.Th style={{ width: 30, paddingTop: 4, paddingBottom: 4 }}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Button theme={Basic.theme.outline} rounded type={Basic.type.light} size={Basic.size.small} onClick={openCheckConnection}>
                                    <Icon.ArrowRepeat size={18}></Icon.ArrowRepeat>
                                </Button>
                            </div>
                        </Table.Th>
                        <Table.Th className='text-center' style={{ width: 120 }}>آی‌پی</Table.Th>
                        <Table.Th>آدرس</Table.Th>
                        {/* <Table.Th>عنوان</Table.Th> */}
                        <Table.Th style={{ paddingTop: 4, paddingBottom: 4 }}>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <Button theme={Basic.theme.outline} type={Basic.type.light} size={Basic.size.small} full onClick={openNewGate}>
                                    <Icon.Plus size={22}></Icon.Plus>
                                    گیت
                                </Button>
                            </div>
                        </Table.Th>
                    </Table.Tr>
                </Table.THead>
                <Table.TBody>
                    <Table.Tr>
                        <Table.Td className='text-center'>1</Table.Td>
                        <Table.Td>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Icon.CircleFill style={{ color: 'var(--success)' }} size={20}></Icon.CircleFill>
                                {/* <Icon.CircleFill style={{ color: 'var(--danger)' }} size={20}></Icon.CircleFill>
                                <Icon.CircleFill style={{ color: 'var(--warning)' }} size={20}></Icon.CircleFill>
                                <Icon.CircleFill style={{ color: 'var(--secondary)' }} size={20}></Icon.CircleFill> */}
                            </div>
                        </Table.Td>
                        <Table.Td className='text-center'>255.255.255.255</Table.Td>
                        <Table.Td>
                            <div style={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap', alignItems: 'center', maxWidth: '100%', overflow: 'hidden' }}>
                                <Button disabled size={Basic.size.small} style={{ paddingLeft: 10, paddingRight: 10, margin: 2.5, whiteSpace: 'nowrap' }}>تهران</Button>
                                <Button disabled size={Basic.size.small} style={{ paddingLeft: 10, paddingRight: 10, margin: 2.5, whiteSpace: 'nowrap' }}>بازرگانی و خدمات همگام خودرو</Button>
                                <Button disabled size={Basic.size.small} style={{ paddingLeft: 10, paddingRight: 10, margin: 2.5, whiteSpace: 'nowrap' }}>تعمیرگاه مرکزی 1067</Button>
                                <Button disabled size={Basic.size.small} style={{ paddingLeft: 10, paddingRight: 10, margin: 2.5, whiteSpace: 'nowrap' }}>سایت جنوبی</Button>
                                <Button disabled size={Basic.size.small} style={{ paddingLeft: 10, paddingRight: 10, margin: 2.5, whiteSpace: 'nowrap' }}>درب شرقی</Button>
                            </div>
                        </Table.Td>
                        {/* <Table.Td></Table.Td> */}
                        <Table.Td style={{ paddingTop: 2.5, paddingBottom: 2.5, width: 70 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                {/* <Button rounded type={Basic.type.primary} size={Basic.size.small}>
                                    <Icon.CloudUpload size={21}></Icon.CloudUpload>
                                </Button>
                                <Button rounded type={Basic.type.success} size={Basic.size.small}>
                                    <Icon.Wifi size={21}></Icon.Wifi>
                                </Button> */}
                                {/* <Button rounded type={Basic.type.danger} size={Basic.size.small}>
                                    <Icon.WifiOff size={21}></Icon.WifiOff>
                                </Button> */}
                                <Button style={{ marginLeft: 2 }} type={Basic.type.secondary} size={Basic.size.small} onClick={openCheckConnection}>
                                    <Icon.ArrowRepeat size={21}></Icon.ArrowRepeat>
                                </Button>
                                <Button style={{ marginLeft: 2 }} type={Basic.type.secondary} size={Basic.size.small} onClick={openTrafficList}>
                                    <Icon.ArrowLeftRight size={21}></Icon.ArrowLeftRight>
                                </Button>
                                <Button type={Basic.type.secondary} size={Basic.size.small} onClick={openSettings}>
                                    <Icon.GearWideConnected size={21}></Icon.GearWideConnected>
                                </Button>
                            </div>
                        </Table.Td>
                    </Table.Tr>
                </Table.TBody>
            </Table.Table>
        </Layout >
    )
}

function openNewGate() {
    const [closer] = Popup('افزودن گیت جدید', <NewGate onSubmit={() => { closer(); alert('asd') }} />);
}

function Settings(props: object) {
    return (
        <div></div>
    )
}
function openSettings() {
    const [closer] = Popup('ویرایش و تنظیمات', <Settings />);
}

function CheckConnection(props: object) {
    const [ind, setInd] = useState(0)
    const [ok, setOk] = useState(false)
    const [notOk, setNotOk] = useState(false)
    useEffect(() => {
        var t = ind;
        var x = setInterval(() => {
            setInd(++t);
        }, 500);

        setTimeout(() => {
            clearInterval(x);
            setInd(0);
            setOk(true);
        }, 5000);
    }, []);
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 100 }}>
            {(ind % 4 == 1) ? <Icon.Wifi1 size={50} color={Basic.colors.secondary}></Icon.Wifi1> : null}
            {(ind % 4 == 2) ? <Icon.Wifi2 size={50} color={Basic.colors.secondary}></Icon.Wifi2> : null}
            {(ind % 4 == 3) ? <Icon.Wifi size={50} color={Basic.colors.secondary}></Icon.Wifi> : null}
            {(notOk) ? <Icon.WifiOff size={50} color={Basic.colors.danger}></Icon.WifiOff> : null}
            {(ok) ? <Icon.Check2Circle size={50} color={Basic.colors.success}></Icon.Check2Circle> : null}
        </div>
    )
}
function openCheckConnection() {
    const [closer] = Popup('تست ارتباط', <CheckConnection />);
}

function TrafficList(props: object) {
    return (
        <div></div>
    )
}
function openTrafficList() {
    const [closer] = Popup('لیست تردد', <TrafficList />);
}