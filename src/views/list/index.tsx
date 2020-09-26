import React, { useEffect, useState } from 'react'
import './../../assets/fonts/fonts.css'
// import './styles/index.css'
import * as Icon from 'react-bootstrap-icons';
import { Confirm, Layout, Loading, Popup, Toast } from '../layout/layout'
import { Basic, Button, Table } from '../../components/cute-ui/cuteUI';
import { textAlign, type } from '../../components/cute-ui/elements/basics';
import { List, Person, Place } from '../../models/models';
import { Lists } from '../../controllers/controllers';
import { Account } from '../views';
import { PlacesTree, viewType } from '../places/partials/_placeTree';
import { NewList } from './partial/_newList';

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
        <Layout isAuthenticated={authorize} title='لیست‌های تردد' icon={Icon.House} style={{ padding: 5 }} >
            <Table.Table className={'text-small'} dark border>
                <Table.THead>
                    <Table.Tr>
                        <Table.Th width={30}>#</Table.Th>
                        <Table.Th width={50}>نوع</Table.Th>
                        <Table.Th textAlign={textAlign.right}>عنوان</Table.Th>
                        <Table.Th width={50}>وضعیت</Table.Th>
                        <Table.Th width={84}>
                            <Button full type={Basic.type.light} outline size={Basic.size.small} onClick={() => {
                                Popup('لیست جدید', <NewList onSubmit={(e) => {
                                    setData([...data, e]);
                                }}></NewList>)
                            }}>
                                <Icon.Plus size={20}></Icon.Plus>
                                لیست
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

                                    <Button size={Basic.size.small} type={(list.status) ? Basic.type.danger : Basic.type.success} style={{ marginLeft: 2 }} onClick={() => {
                                        Loading(true)
                                        list.toggle().then((e: boolean) => {
                                            var temp = data;
                                            temp[index].status = e;
                                            setData([...temp]);
                                            Toast('عملیات موفق', Basic.type.success);
                                        }).catch((e) => {
                                            Toast(e.error.Message, Basic.type.danger);
                                        }).finally(() => {
                                            Loading(false)
                                        });
                                    }}>
                                        {(list.status) ? <Icon.X size={20}></Icon.X> : <Icon.Check size={20}></Icon.Check>}
                                    </Button>
                                    <Button size={Basic.size.small} type={Basic.type.secondary} style={{ marginLeft: 2 }} onClick={() => {
                                        Popup('لیست اشخاص', <ListPersons list={list}></ListPersons>)
                                    }}>
                                        <Icon.People size={20}></Icon.People>
                                    </Button>
                                    <Button size={Basic.size.small} type={Basic.type.secondary} style={{ marginLeft: 2 }} onClick={() => {
                                        Popup('لیست مکان‌ها', <ListPlaces list={list}></ListPlaces>
                                        )
                                    }}>
                                        <Icon.Diagram3 size={20}></Icon.Diagram3>
                                    </Button>
                                    {/* <Button disabled={true} size={Basic.size.small} type={Basic.type.info} style={{ marginLeft: 2 }}>
                                        <Icon.Pencil size={20}></Icon.Pencil>
                                    </Button>
                                    <Button disabled={true} size={Basic.size.small} type={Basic.type.danger}>
                                        <Icon.Trash size={20}></Icon.Trash>
                                    </Button> */}
                                </span>
                            </Table.Td>
                        </Table.Tr>
                    })}
                </Table.TBody>
            </Table.Table>
        </Layout >
    )
}

function ListPersons({ list }: { list: List }) {
    const [persons, setPersons] = useState([...list.persons])
    return (
        <span>
            <Button full primary outline style={{ marginBottom: 5 }} onClick={() => {
                const [closer] = Popup('', <Account.PersonList onSelect={(selectedPerson: Person) => {
                    Loading(true);
                    list.addPerson(selectedPerson).then(() => {
                        Toast('عملیات با موفقیت انجام شد', Basic.type.success);
                        setPersons([...persons, selectedPerson])
                        list.persons.push(selectedPerson);
                    }).catch((e) => {
                        Toast(e.error.Message, Basic.type.danger);
                    }).finally(() => {
                        Loading(false);
                        closer()
                    });
                }}></Account.PersonList>)
            }}>
                افزودن شخص جدید
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
                    {persons.map((person: Person, index: number) => {
                        return <Table.Tr key={index}>
                            <Table.Td textAlign={textAlign.center}>{index + 1}</Table.Td>
                            <Table.Td textAlign={textAlign.center}>{person.nationalId}</Table.Td>
                            <Table.Td>
                                {person.firstName + ' ' + person.lastName}
                            </Table.Td>
                            <Table.Td>
                                <Button size={Basic.size.small} type={Basic.type.danger} onClick={() => {
                                    Confirm('آیا مایل به حذف هستید', Basic.type.info, () => {
                                        Loading(true)
                                        list.deletePerson(person).then(() => {
                                            Toast('عملیات با موفقیت انجام شد', Basic.type.success);
                                            persons.splice(index, 1)
                                            list.persons.splice(index, 1)
                                            setPersons([...persons])
                                        }).catch((e) => { Toast(e.error.Message, Basic.type.danger) }).finally(() => { Loading(false) })
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

function ListPlaces({ list }: { list: List }) {
    const [places, setPlaces] = useState(list.places)
    return (
        <span>
            <Button full primary outline style={{ marginBottom: 5 }} onClick={() => {
                const [closer] = Popup('', <div style={{ direction: 'ltr' }}><PlacesTree type={viewType.selectable} onSelect={(selectedPlace: Place) => {

                    Loading(true)
                    list.addPlace(selectedPlace).then(() => {
                        Toast('عملیات با موفقیت انجام شد', Basic.type.success);
                        setPlaces([...places, selectedPlace])
                        list.places.push(selectedPlace);
                    }).catch((e) => {
                        Toast(e.error.Message, Basic.type.danger);
                    }).finally(() => {
                        Loading(false);
                        closer();
                    });
                }} /></div>)
            }}>الساق به مکان جدید
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
                    {places.map((place: Place, index: number) => {
                        return <Table.Tr key={index}>
                            <Table.Td textAlign={textAlign.center}>{index + 1}</Table.Td>
                            <Table.Td textAlign={textAlign.right}>{place.title}</Table.Td>
                            <Table.Td>
                                <Button size={Basic.size.small} type={Basic.type.danger} onClick={() => {
                                    Confirm('آیا مایل به حذف هستید', Basic.type.info, () => {
                                        Loading(true)
                                        list.deletePlace(place).then(() => {
                                            Toast('عملیات با موفقیت انجام شد', Basic.type.success);
                                            places.splice(index, 1)
                                            list.places.splice(index, 1)
                                            setPlaces([...places])
                                        }).catch((e) => { Toast(e.error.Message, Basic.type.danger) }).finally(() => { Loading(false) })
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

