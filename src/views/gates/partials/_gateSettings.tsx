import React, { useState } from 'react'
import * as Icon from 'react-bootstrap-icons';
import { Basic, Button, DropDown, Input, Item } from '../../../components/cute-ui/cuteUI';
import { Table } from '../../../components/cute-ui/cuteUI';
import { Gate } from '../../../models/models';

import '../styles/gateSettings.css'
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
    const [section, setSection] = useState(2)
    return (
        <div className='gate-settings-main'>
            <div className='right-side'>
                {/* <Button sharp outline={!(section == 0)} secondary onClick={() => { setSection(0) }}>
                    <Icon.Sliders size={20}></Icon.Sliders>
                </Button> */}
                <Button sharp outline={!(section == 1)} secondary onClick={() => { setSection(1) }}>
                    <Icon.CloudDownload size={20}></Icon.CloudDownload>
                </Button>
                {/* <Button sharp outline={!(section == 3)} secondary onClick={() => { setSection(3) }}>
                    <Icon.Command size={20}></Icon.Command>
                </Button> */}
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
                                    <Table.Th>تکراری</Table.Th>
                                </Table.Tr>
                            </Table.THead>
                        </Table.Table>
                    </div> : null}
                {(section == 2) ? <div className='info-tab'>
                    <Table.Table className={'text-small'} right dark border style={{ marginBottom: 5 }}>
                        <Table.TBody>
                            <Table.Tr>
                                <Table.Td width={100}>نام دستگاه</Table.Td>
                                <Table.Td width={200} center>{gate.title}</Table.Td>
                                <Table.Td width={30}>آی‌پی</Table.Td>
                                <Table.Td width={200} center>{gate.ip}</Table.Td>
                                <Table.Td width={25}>
                                    <Button info size={Basic.size.xSmall}><Icon.Pencil size={20}></Icon.Pencil></Button>
                                </Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td width={100}>مدل</Table.Td>
                                <Table.Td full colSpan={4} center>{gate.modelNo}</Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td width={100}>نسخه نرم‌افزار</Table.Td>
                                <Table.Td full colSpan={4} center>{gate.softwareVersion}</Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td width={100}>نسخه سخت افزار</Table.Td>
                                <Table.Td full colSpan={4} center>{gate.hardwareVersion}</Table.Td>
                            </Table.Tr>
                        </Table.TBody>
                    </Table.Table>
                    <Item primary icon={Icon.Folder2Open}>به روزرسانی
                        <Icon.CloudUpload style={{ marginRight: 10 }} size={20}></Icon.CloudUpload></Item>
                </div> : null}
                {(section == 3) ? <div>
                    <DropDown title='دستور'></DropDown>
                    <Button outline primary style={{ marginTop: 5 }}>ارسال به دستگاه</Button>
                </div> : null}
            </div>
        </div>
    )
}