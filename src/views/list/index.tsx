import React, { useEffect, useState } from 'react'
import './../../assets/fonts/fonts.css'
// import './styles/index.css'
import * as Icon from 'react-bootstrap-icons';
import { Confirm, Layout, Loading, Popup, Toast } from '../layout/layout'
import { Basic, Button, Table } from '../../components/cute-ui/cuteUI';
import { textAlign, type } from '../../components/cute-ui/elements/basics';
import { List, Person, Place } from '../../models/models';
import { Lists } from '../../controllers/controllers';

export function Index({ authorize = false }: { authorize: boolean }) {
    const [data, setData] = useState(Array<List>());
    useEffect(() => {
        Loading(true)
        var promise = Lists.getLists();
        promise.then(async (e: Array<List>) => {
            setData([...e])
        })
        promise.catch((e) => {
            console.log(e)
            Toast(e.error.message, Basic.type.danger)
        })
        promise.finally(() => {
            Loading(false)
        })
    }, [])
    return (
        <Layout isAuthenticated={authorize} title='لیست‌ها تردد' icon={Icon.House} style={{ padding: 5 }} >
            <Table.Table className={'text-small'} dark border>
                <Table.THead>
                    <Table.Tr>
                        <Table.Th width={30}>#</Table.Th>
                        <Table.Th width={50}>نوع</Table.Th>
                        <Table.Th textAlign={textAlign.right}>عنوان</Table.Th>
                        <Table.Th width={50}>وضعیت</Table.Th>
                        <Table.Th width={133}>
                            <Button full type={Basic.type.light} outline size={Basic.size.small}>
                                <Icon.Plus size={20}></Icon.Plus>
                                لیست جدید
                            </Button>
                        </Table.Th>
                    </Table.Tr>
                </Table.THead>
                <Table.TBody>
                    {data.map((list: List, index: number) => {
                        return <Table.Tr key={index}>
                            <Table.Td textAlign={textAlign.center}>{index + 1}</Table.Td>
                            <Table.Td textAlign={textAlign.center}>
                                {(list.type == 1) ? 'سفید' : ((list.type == 2) ? 'سیاه' : 'قرمز')}
                            </Table.Td>
                            <Table.Td>{list.title}</Table.Td>
                            <Table.Td textAlign={textAlign.center}>
                                {(list.status) ? 'فعال' : 'غیر فعال'}
                            </Table.Td>
                            <Table.Td>
                                <span style={{ display: 'flex' }}>
                                    {(list.status) ?
                                        <Button size={Basic.size.small} type={Basic.type.danger} style={{ marginLeft: 2 }}>
                                            <Icon.X size={20}></Icon.X>
                                        </Button>
                                        :
                                        <Button size={Basic.size.small} type={Basic.type.success} style={{ marginLeft: 2 }}>
                                            <Icon.Check size={20}></Icon.Check>
                                        </Button>}
                                    <Button size={Basic.size.small} type={Basic.type.secondary} style={{ marginLeft: 2 }} onClick={() => {
                                        Popup('لیست اشخاص', <ListPersons data={list.persons} onDelete={(id) => {
                                            Loading(true)
                                            list.deletePerson(id).then(() => {
                                                Toast('عملبات با موفقیت انجام شد', Basic.type.success);

                                            }).catch((e) => { Toast(e.error.Message, Basic.type.danger) }).finally(() => { Loading(false) })
                                        }}></ListPersons>)
                                    }}>
                                        <Icon.People size={20}></Icon.People>
                                    </Button>
                                    <Button size={Basic.size.small} type={Basic.type.secondary} style={{ marginLeft: 2 }} onClick={() => {
                                        Popup('لیست مکان‌ها', <ListPlaces data={list.places}></ListPlaces>)
                                    }}>
                                        <Icon.Diagram3 size={20}></Icon.Diagram3>
                                    </Button>
                                    <Button disabled={true} size={Basic.size.small} type={Basic.type.info} style={{ marginLeft: 2 }}>
                                        <Icon.Pencil size={20}></Icon.Pencil>
                                    </Button>
                                    <Button disabled={true} size={Basic.size.small} type={Basic.type.danger}>
                                        <Icon.Trash size={20}></Icon.Trash>
                                    </Button>
                                </span>
                            </Table.Td>
                        </Table.Tr>
                    })}
                </Table.TBody>
            </Table.Table>
        </Layout >
    )
}

function ListPersons({ data, onDelete = (id: number) => { } }: { data: Array<Person>, onDelete: (id: number) => {} | void }) {
    return (
        <span>
            <Button full primary outline style={{ marginBottom: 5 }}>افزودن شخص جدید
            <Icon.PersonPlus style={{ marginRight: 10 }} size={20}></Icon.PersonPlus>
            </Button>
            <Table.Table className={'text-small'} dark border>
                <Table.THead>
                    <Table.Tr>
                        <Table.Th width={30}>#</Table.Th>
                        <Table.Th width={70} textAlign={textAlign.center}>کد ملی</Table.Th>
                        <Table.Th textAlign={textAlign.right} width={250}>نام و نام خانوادگی</Table.Th>
                        <Table.Th width={22}></Table.Th>
                    </Table.Tr>
                </Table.THead>
                <Table.TBody>
                    {data.map((person: Person, index: number) => {
                        return <Table.Tr key={index}>
                            <Table.Td textAlign={textAlign.center}>{index + 1}</Table.Td>
                            <Table.Td textAlign={textAlign.center}>{person.nationalId}</Table.Td>
                            <Table.Td>
                                {person.firstName + ' ' + person.lastName}
                            </Table.Td>
                            <Table.Td>
                                <Button size={Basic.size.small} type={Basic.type.danger} onClick={() => {
                                    Confirm('آیا مایل به حذف هستید', Basic.type.info, () => {
                                        onDelete(person.id)
                                    })
                                }}>
                                    <Icon.Trash size={20}></Icon.Trash>
                                </Button>
                            </Table.Td>
                        </Table.Tr>
                    })}
                </Table.TBody>
            </Table.Table>
        </span>
    )
}

function ListPlaces({ data }: { data: Array<Place> }) {
    return (
        <span>
            <Button full primary outline style={{ marginBottom: 5 }}>الساق به محل جدید
            <Icon.Paperclip style={{ marginRight: 10 }} size={20}></Icon.Paperclip>
            </Button>
            <Table.Table className={'text-small'} dark border>
                <Table.THead>
                    <Table.Tr>
                        <Table.Th width={30}>#</Table.Th>
                        <Table.Th textAlign={textAlign.right} width={250}>عنوان</Table.Th>
                        <Table.Th width={22}></Table.Th>
                    </Table.Tr>
                </Table.THead>
                <Table.TBody>
                    {data.map((place: Place, index: number) => {
                        return <Table.Tr key={index}>
                            <Table.Td textAlign={textAlign.center}>{index + 1}</Table.Td>
                            <Table.Td textAlign={textAlign.right}>{place.title}</Table.Td>
                            <Table.Td>
                                <Button size={Basic.size.small} type={Basic.type.danger}>
                                    <Icon.Trash size={20}></Icon.Trash>
                                </Button>
                            </Table.Td>
                        </Table.Tr>
                    })}
                </Table.TBody>
            </Table.Table>
        </span>
    )
}