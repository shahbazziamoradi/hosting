import React, { useEffect, useState } from 'react'
import './styles/users.css'
import * as Icon from 'react-bootstrap-icons';
import { Layout, Loading, Toast, Popup, Confirm } from '../layout/layout'
import { Button, Table, Basic } from '../../components/cute-ui/cuteUI';
import { Accounts } from '../../controllers/controllers';
import { Person, AccessMode } from '../../models/models';

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
                                    <Button size={Basic.size.small} type={Basic.type.secondary} style={{ marginLeft: 2 }} onClick={() => {
                                        showAccessModes(person)
                                    }}>
                                        <Icon.CreditCard size={20}></Icon.CreditCard>
                                    </Button>
                                    {/* <Button size={Basic.size.small} type={Basic.type.secondary} style={{ marginLeft: 2 }}>
                                        <Icon.ClockHistory size={20}></Icon.ClockHistory>
                                    </Button>
                                    <Button size={Basic.size.small} type={Basic.type.info}>
                                        <Icon.Pencil size={20}></Icon.Pencil>
                                    </Button> */}
                                </span>
                            </Table.Td>
                        </Table.Tr>
                    })}
                </Table.TBody>
            </Table.Table>
        </Layout>
    )
}

const showAccessModes = (person: Person) => {
    const [closer] = Popup('', <AccessModesList list={person.AccessModes} person={person}></AccessModesList>);
}

function AccessModesList({ list, person }: { list: Array<AccessMode> | null, person: Person }) {
    const [data, setData] = useState(list)
    return (
        <span dir='rtl'>
            <Button full primary outline style={{ marginBottom: 10 }} onClick={() => {
                Popup('لطفا کارت خود را به دستگاه نزدیک کنید', <AddNewAccessCard person={person}></AddNewAccessCard>)
            }}>
                افزودن کارت جدید
            </Button>
            <Table.Table className='text-small' center dark border>
                <Table.THead>
                    <Table.Tr>
                        <Table.Th width={30}>#</Table.Th>
                        <Table.Th right>عنوان</Table.Th>
                        <Table.Th width={50}>وضعیت</Table.Th>
                        <Table.Th width={50}>
                        </Table.Th>
                    </Table.Tr>
                </Table.THead>
                <Table.TBody>
                    {data?.map((value, index) => {
                        return <Table.Tr key={index}>
                            <Table.Td>{index + 1}</Table.Td>
                            <Table.Td right>{value.title}</Table.Td>
                            <Table.Td>{(value.active) ? 'فعال' : 'غیرفعال'}</Table.Td>
                            <Table.Td>
                                <span style={{ display: 'flex' }}>
                                    <Button size={Basic.size.small} type={(!value.active) ? Basic.type.success : Basic.type.danger} style={{ marginLeft: 2 }} onClick={() => {
                                        Loading(true);
                                        value.toggle().then((e) => {
                                            data[index].active = e
                                            setData([...data]);
                                            Toast('عملیات موفق', Basic.type.success);
                                        }).catch((e) => {
                                            Toast(e.error.Message, Basic.type.danger);
                                        }).finally(() => {
                                            Loading(false)
                                        })
                                    }}>
                                        {(!value.active) ? <Icon.Check size={20}></Icon.Check> : <Icon.X size={20}></Icon.X>}
                                    </Button>
                                    <Button size={Basic.size.small} danger onClick={() => {
                                        Confirm('حذف کارت اعتبار سنجی را تایید میکنید', Basic.type.danger, () => {
                                            Loading(true);
                                            value.delete().then((e) => {
                                                if (e) {
                                                    data.splice(index, 1);
                                                    setData([...data]);
                                                    Toast('عملیات موفق', Basic.type.success);
                                                } else {
                                                    Toast('عملیات ناموفق', Basic.type.warning);
                                                }
                                            }).catch((e) => {
                                                Toast(e.error.Message, Basic.type.danger);
                                            }).finally(() => {
                                                Loading(false)
                                            })
                                        })
                                    }}>
                                        <Icon.Trash size={20}></Icon.Trash>
                                    </Button>
                                </span>
                            </Table.Td>
                        </Table.Tr>
                    })}
                </Table.TBody>
            </Table.Table >
        </span>
    )
}

function AddNewAccessCard({ person }: { person: Person }) {
    const [wait, setWait] = useState(false);
    const [ok, setOk] = useState(false);
    const [notOk, setNotOk] = useState(false);
    const run = () => {
        setWait(true)
        setOk(false)
        setNotOk(false)
        person.addAccessCard().then((e: any) => {
            setOk(true)
        }).catch((e) => {
            Toast(e.error.Message, Basic.type.danger)
            setNotOk(true)
        }).finally(() => {
            setWait(false)
        })
    }
    useEffect(() => {
        run()
    }, [])
    return (
        <span dir='rtl' style={{ height: 150, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch' }}>
            <span style={{ display: 'flex', justifyContent: 'center' }}>
                {wait ? <Icon.HourglassSplit size={50} color={Basic.colors.secondary}></Icon.HourglassSplit> : null}
                {ok ? <Icon.CheckCircleFill size={50} color={Basic.colors.success}></Icon.CheckCircleFill> : null}
                {notOk ? <Icon.XCircleFill size={50} color={Basic.colors.danger}></Icon.XCircleFill> : null}
            </span>
            <span style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
                {notOk ? <Button primary onClick={() => { run() }}>تلاش مجدد <Icon.ArrowRepeat size={25} style={{ marginRight: 10 }}></Icon.ArrowRepeat></Button> : null}
                {ok ? <Button primary onClick={() => { run() }}>کارت جدید <Icon.Plus size={25} style={{ marginRight: 10 }}></Icon.Plus></Button> : null}
            </span>
        </span>
    )
}



export function PersonList({ onSelect = (e: Person) => { } }: { onSelect: (e: Person) => {} | void }) {
    const [people, setPeople] = useState(new Array<Person>())
    useEffect(() => {
        Loading(true);
        Accounts.getPersons().then((e) => {
            setPeople([...e]);
        }).catch((e) => {
            Toast(e.error.Message, Basic.type.danger);
        }).finally(() => {
            Loading(false)
        })
    }, [])
    return <Table.Table className='text-small' border dark >
        <Table.THead>
            <Table.Tr>
                <Table.Th width={30}>#</Table.Th>
                <Table.Th textAlign={Basic.textAlign.right}>نام و نام خانوادگی</Table.Th>
                <Table.Th width={90}>شماره پرسنلی</Table.Th>
                <Table.Th width={90}>شماره تماس</Table.Th>
                <Table.Th width={90}>کد ملی</Table.Th>
                <Table.Td></Table.Td>
            </Table.Tr>
        </Table.THead>
        <Table.TBody>
            {people.map((person: Person, index: number) => {
                return <Table.Tr key={index}>
                    <Table.Td textAlign={Basic.textAlign.center}>{index + 1}</Table.Td>
                    <Table.Td textAlign={Basic.textAlign.right}>{person.firstName + ' ' + person.lastName}</Table.Td>
                    <Table.Td textAlign={Basic.textAlign.center}>{person.employeeCode}</Table.Td>
                    <Table.Td textAlign={Basic.textAlign.center}>{person.mobile}</Table.Td>
                    <Table.Td textAlign={Basic.textAlign.center}>{person.nationalId}</Table.Td>
                    <Table.Td>
                        <Button outline type={Basic.type.primary} size={Basic.size.small} onClick={() => { onSelect(person) }}>انتخاب</Button>
                    </Table.Td>
                </Table.Tr>
            })}

        </Table.TBody>
    </Table.Table>
}