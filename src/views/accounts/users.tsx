import React, { useEffect, useState } from 'react'
import './styles/users.css'
import * as Icon from 'react-bootstrap-icons';
import { Layout, Loading, Toast } from '../layout/layout'
import { Button, Table, Basic } from '../../components/cute-ui/cuteUI';
import { Accounts } from '../../controllers/controllers';
import { Person } from '../../models/models';

export function Users({ authorize = false }: { authorize: boolean }) {
    const [data, setData] = useState(Array<Person>())

    useEffect(() => {
        Loading(true);
        var promise = Accounts.getPersons();
        promise.then((e: Array<Person>) => {
            setData([...e]);
        });
        promise.catch((e) => {
            Toast(e.error.Message, Basic.type.danger)
        });
        promise.finally(() => {
            Loading(false)
        })
    }, [])
    return (
        <Layout isAuthenticated={authorize} title='کاربران' icon={Icon.House} style={{ padding: 5 }}>
            <Table.Table className={'text-small text-right'} border dark >
                <Table.THead>
                    <Table.Tr>
                        <Table.Th width={30} textAlign={Basic.textAlign.center}>#</Table.Th>
                        <Table.Th width={100} textAlign={Basic.textAlign.center}>کد پرسنلی</Table.Th>
                        <Table.Th width={120} textAlign={Basic.textAlign.center}>کد ملی</Table.Th>
                        <Table.Th width={120} textAlign={Basic.textAlign.center}>شماره تماس</Table.Th>
                        <Table.Th>نام و نام خانوادگی</Table.Th>
                        <Table.Th width={60} textAlign={Basic.textAlign.center}>سازمانی</Table.Th>
                        <Table.Th width={100} textAlign={Basic.textAlign.center}>وضعیت</Table.Th>
                        <Table.Th width={80}></Table.Th>
                    </Table.Tr>
                </Table.THead>
                <Table.TBody>
                    {data.map((person: Person, index: number) => {
                        return <Table.Tr key={index}>
                            <Table.Td textAlign={Basic.textAlign.center}>{index + 1}</Table.Td>
                            <Table.Td textAlign={Basic.textAlign.center}>{person.employeeCode}</Table.Td>
                            <Table.Td textAlign={Basic.textAlign.center}>{person.nationalId}</Table.Td>
                            <Table.Td>{person.mobile}</Table.Td>
                            <Table.Td>{person.firstName + ' ' + person.lastName}</Table.Td>
                            <Table.Td width={60} textAlign={Basic.textAlign.center}>بله</Table.Td>
                            <Table.Td textAlign={Basic.textAlign.center}>{
                                (person.user.id) ? (person.user.lock ? 'غیر فعال' : 'فعال') : 'فاقد کاربری'
                            }</Table.Td>
                            <Table.Td>
                                <span style={{ display: 'flex' }}>
                                    {(person.user.id != null) ? (
                                        <span style={{ display: 'flex' }}>

                                            <Button size={Basic.size.small} type={(person.user.lock) ? Basic.type.success : Basic.type.danger} style={{ marginLeft: 2 }} onClick={() => {
                                                Loading(true);
                                                person.user.toggle().then((e) => {
                                                    data[index].user.lock = e
                                                    setData([...data]);
                                                    Toast('عملیات موفق', Basic.type.success);
                                                }).catch((e) => {
                                                    Toast(e.error.Message, Basic.type.danger);
                                                }).finally(() => {
                                                    Loading(false)
                                                })
                                            }}>
                                                {(person.user.lock) ? <Icon.Check size={20}></Icon.Check> : <Icon.X size={20}></Icon.X>}
                                            </Button>
                                            <Button size={Basic.size.small} type={Basic.type.secondary} style={{ marginLeft: 2 }} onClick={() => {
                                                Loading(true);
                                                person.user.resetPassword().then((e) => {
                                                    if (e) {
                                                        Toast('کلمه عبور پیشفرض اعمال شد', Basic.type.success)
                                                    } else {
                                                        Toast('عملیات غیر مجاز', Basic.type.warning)
                                                    }
                                                }).catch((e) => {
                                                    Toast(e.error.Message, Basic.type.danger);
                                                }).finally(() => {
                                                    Loading(false)
                                                })
                                            }}>
                                                <Icon.Key size={20}></Icon.Key>
                                            </Button>
                                            {/* <Button size={Basic.size.small} type={Basic.type.secondary} style={{ marginLeft: 2 }}>
                                            <Icon.CreditCard size={20}></Icon.CreditCard>
                                        </Button>
                                        <Button size={Basic.size.small} type={Basic.type.secondary} style={{ marginLeft: 2 }}>
                                            <Icon.ClockHistory size={20}></Icon.ClockHistory>
                                        </Button>
                                        <Button size={Basic.size.small} type={Basic.type.info}>
                                            <Icon.Pencil size={20}></Icon.Pencil>
                                        </Button> */}
                                        </span>
                                    ) : (
                                            <Button size={Basic.size.small} type={Basic.type.primary} style={{ marginLeft: 2, flexGrow: 1 }} onClick={() => {
                                                Loading(true);
                                                person.createUser().then((e) => {
                                                }).catch((e) => {
                                                    Toast(e.error.Message, Basic.type.danger);
                                                }).finally(() => {
                                                    Loading(false)
                                                })
                                            }}><Icon.PersonPlus size={20}></Icon.PersonPlus></Button>
                                        )}
                                    <Button size={Basic.size.small} type={Basic.type.secondary} style={{ marginLeft: 2 }}>
                                        <Icon.CreditCard size={20}></Icon.CreditCard>
                                    </Button>
                                    <Button size={Basic.size.small} type={Basic.type.secondary} style={{ marginLeft: 2 }}>
                                        <Icon.ClockHistory size={20}></Icon.ClockHistory>
                                    </Button>
                                    <Button size={Basic.size.small} type={Basic.type.info}>
                                        <Icon.Pencil size={20}></Icon.Pencil>
                                    </Button>
                                </span>
                            </Table.Td>
                        </Table.Tr>
                    })}
                </Table.TBody>
            </Table.Table>
        </Layout>
    )
}