import React, { useState } from 'react'
import * as Icon from 'react-bootstrap-icons';
import { Basic, Button, DropDown, Item } from '../../../components/cute-ui/cuteUI';
import { Table } from '../../../components/cute-ui/cuteUI';
import { Gate } from '../../../models/models';
import './styles/gateSettings.css'

import '../styles/gateSettings.css'
import { Loading, Toast } from '../../layout/layout';
// type buttonProps = {
//     style?: React.CSSProperties | undefined,
//     className?: string,
//     disabled?: boolean,
//     active?: boolean,
//     theme?: Basic.theme,
//     children?: object | string,
//     onClick?: (e?: object) => void,
//     rounded?: boolean,
//     sharp?: boolean,
//     full?: boolean,
//     outline?: boolean,
//     value?: any,
//     size?: Basic.size | number
// }

export function GateSettings({ gate, onSubmit = () => { } }: { gate: Gate, onSubmit?: (e?: any) => {} | void }) {
    const [section, setSection] = useState(2);
    const [title, setTitle] = useState(gate.title);
    const [ip, setIp] = useState(gate.ip);
    const [histTitle, setHistTitle] = useState(gate.title);
    const [histIp, setHistIp] = useState(gate.ip);
    return (
        <div className='gate-settings-main' dir='rtl'>
            <div className='right-side'>
                {/* <Button sharp outline={!(section == 0)} secondary onClick={() => { setSection(0) }}>
                    <Icon.Sliders size={20}></Icon.Sliders>
                </Button> */}
                <Button sharp outline={!(section == 1)} secondary onClick={() => { setSection(1) }}>
                    <Icon.CloudDownload size={20}></Icon.CloudDownload>
                </Button>
                <Button sharp outline={!(section == 3)} secondary onClick={() => { setSection(3) }}>
                    <Icon.Command size={20}></Icon.Command>
                </Button>
                <Button sharp outline={!(section == 2)} secondary onClick={() => { setSection(2) }}>
                    <Icon.InfoCircle size={20}></Icon.InfoCircle>
                </Button>
            </div>
            <div className='left-side'>
                {(section == 0) ? <div>
                </div> : null}
                {(section == 1) ?
                    <div>
                        <Button primary style={{ marginBottom: 5 }}>تخلیه اطلاعات
                        <Icon.CloudDownload style={{ marginRight: 10 }} size={20}></Icon.CloudDownload>
                        </Button>
                        <Table.Table className={'text-small'} dark>
                            <Table.THead>
                                <Table.Tr>
                                    <Table.Th>#</Table.Th>
                                    <Table.Th>زمان</Table.Th>
                                    <Table.Th>کاربر</Table.Th>
                                    <Table.Th>تعداد رکورد</Table.Th>
                                    <Table.Th>ثبت شده</Table.Th>
                                </Table.Tr>
                            </Table.THead>
                        </Table.Table>
                    </div> : null}
                {(section == 2) ? <div className='info-tab'>
                    <Table.Table className={'text-small'} right dark border style={{ marginBottom: 10 }}>
                        <Table.TBody>
                            <Table.Tr>
                                <Table.Td width={100}>نام دستگاه</Table.Td>
                                <Table.Td width={200} center>
                                    <input className='edit-box' value={title} onChange={(e) => { setTitle(e.target.value) }}></input>
                                </Table.Td>
                                <Table.Td width={30} center>آی‌پی</Table.Td>
                                <Table.Td width={200} center>
                                    <input dir={'ltr'} className='edit-box' value={ip} onChange={(e) => { setIp(e.target.value) }}></input>
                                </Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td width={100}>مدل</Table.Td>
                                <Table.Td full colSpan={3} center>{gate.modelNo}</Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td width={100}>نسخه نرم‌افزار</Table.Td>
                                <Table.Td full colSpan={3} center>{gate.softwareVersion}</Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td width={100}>نسخه سخت افزار</Table.Td>
                                <Table.Td full colSpan={3} center>{gate.hardwareVersion}</Table.Td>
                            </Table.Tr>
                        </Table.TBody>
                    </Table.Table>
                    <span style={{ display: 'flex', flex: 1, justifyContent: 'space-between' }}>
                        {/* <Item disabled size={Basic.size.small} primary icon={Icon.Folder2Open}>به روزرسانی
                            <Icon.CloudUpload style={{ marginRight: 10 }} size={21}></Icon.CloudUpload>
                        </Item> */}
                        <span style={{ display: 'flex' }}>
                            {(gate.title != title || gate.ip != ip) ?
                                <Button style={{ marginLeft: 5 }} size={Basic.size.small} outline danger disabled={title == '' || ip == '' || (gate.title == title && gate.ip == ip)} onClick={() => {
                                    setTitle(histTitle)
                                    setIp(histIp)
                                }}>
                                    <Icon.ArrowCounterclockwise size={20}></Icon.ArrowCounterclockwise>
                                </Button> : null}
                            <Button size={Basic.size.small} outline success disabled={title == '' || ip == '' || (gate.title == title && gate.ip == ip)} onClick={() => {
                                Loading(true)
                                gate.title = title;
                                gate.ip = ip;
                                gate.save().then(() => {
                                    Toast('ذخیره اطلاعات با موفقیت انجام شد', Basic.type.success)
                                    onSubmit(gate);
                                }).catch((e) => {
                                    Toast(e.error.Message, Basic.type.danger);
                                }).finally(() => {
                                    Loading(false)
                                })
                            }}>
                                ذخیره
                        </Button>

                        </span>
                    </span>
                </div> : null}
                {(section == 3) ? <div>
                    <DropDown title='دستور'></DropDown>
                    <Button outline primary style={{ marginTop: 5 }}>ارسال به دستگاه</Button>
                </div> : null}
            </div>
        </div>
    )
}