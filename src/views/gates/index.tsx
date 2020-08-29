import React, { useState } from 'react'
import './../../assets/fonts/fonts.css'
import './styles/index.css'
import * as Icon from 'react-bootstrap-icons';
import { Layout, Loading, Popup, Toast, toastType } from '../layout/layout'
import { PersianCalendar } from '../../components/cute-ui/persianCalendar/persianCalendar';
import { Button, buttonTheme, buttonType, Table, tableTheme, buttonSize } from '../../components/cute-ui/cuteUI';
import { NewGate } from './partials/_newGate';

export function Index({ authorize = false }: { authorize: boolean }) {
    openNewGate()
    return (
        <Layout isAuthenticated={authorize} title='گیت‌ها' icon={Icon.House} style={{ padding: 5 }}>
            <Table.Table className={'text-medium text-right'} border={true} theme={tableTheme.dark}>
                <Table.THead>
                    <Table.Tr>
                        <Table.Th style={{ width: 30 }} className='text-center'>#</Table.Th>
                        <Table.Th style={{ width: 30, paddingTop: 4, paddingBottom: 4 }}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Button theme={buttonTheme.outline} rounded type={buttonType.light} size={buttonSize.small} onClick={openCheckConnection}>
                                    <Icon.ArrowRepeat size={18}></Icon.ArrowRepeat>
                                </Button>
                            </div>
                        </Table.Th>
                        <Table.Th className='text-center' style={{ width: 120 }}>آی‌پی</Table.Th>
                        <Table.Th>آدرس</Table.Th>
                        {/* <Table.Th>عنوان</Table.Th> */}
                        <Table.Th style={{ paddingTop: 4, paddingBottom: 4 }}>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <Button theme={buttonTheme.outline} type={buttonType.light} size={buttonSize.small} full onClick={openNewGate}>
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
                                <Button disabled size={buttonSize.small} style={{ paddingLeft: 10, paddingRight: 10, margin: 2.5, whiteSpace: 'nowrap' }}>تهران</Button>
                                <Button disabled size={buttonSize.small} style={{ paddingLeft: 10, paddingRight: 10, margin: 2.5, whiteSpace: 'nowrap' }}>بازرگانی و خدمات همگام خودرو</Button>
                                <Button disabled size={buttonSize.small} style={{ paddingLeft: 10, paddingRight: 10, margin: 2.5, whiteSpace: 'nowrap' }}>تعمیرگاه مرکزی 1067</Button>
                                <Button disabled size={buttonSize.small} style={{ paddingLeft: 10, paddingRight: 10, margin: 2.5, whiteSpace: 'nowrap' }}>سایت جنوبی</Button>
                                <Button disabled size={buttonSize.small} style={{ paddingLeft: 10, paddingRight: 10, margin: 2.5, whiteSpace: 'nowrap' }}>درب شرقی</Button>
                            </div>
                        </Table.Td>
                        {/* <Table.Td></Table.Td> */}
                        <Table.Td style={{ paddingTop: 2.5, paddingBottom: 2.5, width: 70 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                {/* <Button rounded type={buttonType.primary} size={buttonSize.small}>
                                    <Icon.CloudUpload size={21}></Icon.CloudUpload>
                                </Button>
                                <Button rounded type={buttonType.success} size={buttonSize.small}>
                                    <Icon.Wifi size={21}></Icon.Wifi>
                                </Button> */}
                                {/* <Button rounded type={buttonType.danger} size={buttonSize.small}>
                                    <Icon.WifiOff size={21}></Icon.WifiOff>
                                </Button> */}
                                <Button type={buttonType.secondary} size={buttonSize.small} onClick={openCheckConnection}>
                                    <Icon.ArrowRepeat size={21}></Icon.ArrowRepeat>
                                </Button>
                                <Button type={buttonType.secondary} size={buttonSize.small} onClick={openTrafficList}>
                                    <Icon.ArrowLeftRight size={21}></Icon.ArrowLeftRight>
                                </Button>
                                <Button type={buttonType.secondary} size={buttonSize.small} onClick={openSettings}>
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
    const [closer] = Popup('افزودن گیت جدید', <NewGate onSubmit={() => { closer() }} />);
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
    return (
        <div></div>
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
    const [closer] = Popup('لیست تردد', <CheckConnection />);
}