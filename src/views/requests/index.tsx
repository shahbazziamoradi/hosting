import React, { useEffect, useState } from 'react'
import './../../assets/fonts/fonts.css'
import './styles/index.css'
import * as Icon from 'react-bootstrap-icons';
import { Layout, Loading, Popup, Toast } from '../layout/layout'
import { PersianCalendar } from '../../components/cute-ui/persianCalendar/persianCalendar';
import { Basic, Button, Table, DropDown, Item, Input } from '../../components/cute-ui/cuteUI';
import { Request, RequestState, Person } from '../../models/models'
import { Requests, Accounts } from '../../controllers/controllers';
import { data } from 'jquery';

export function Index({ authorize = false }: { authorize: boolean }) {
    const [requests, setRequests] = useState(new Array<Request>())
    useEffect(() => {
        // const [closer] = Popup('ثبت درخواست', <NewRequest onSubmit={() => { closer() }}></NewRequest>)
        Loading(true)
        Requests.getRequests().then((e) => {
            setRequests([...e])
        }).catch((e) => {
            Toast(e.error.Message, Basic.type.danger);
        }).finally(() => { Loading(false) })
    }, [])
    return (
        <Layout isAuthenticated={authorize} title='درخواست‌ها' icon={Icon.House} style={{ padding: 5 }}>
            <Table.Table className={'text-small text-right'} dark border>
                <Table.THead>
                    <Table.Tr>
                        <Table.Th textAlign={Basic.textAlign.center} width={30}>#</Table.Th>
                        <Table.Th textAlign={Basic.textAlign.center} width={80}>کد درخواست</Table.Th>
                        <Table.Th textAlign={Basic.textAlign.center} width={80}>نوع درخواست</Table.Th>
                        <Table.Th textAlign={Basic.textAlign.center} width={140}>زمان درخواست</Table.Th>
                        <Table.Th>میزبان/میهمان</Table.Th>
                        <Table.Th textAlign={Basic.textAlign.center} width={140}>زمان آخرین وضعیت</Table.Th>
                        <Table.Th textAlign={Basic.textAlign.center} width={100}>آخرین وضعیت</Table.Th>
                        <Table.Th width={80}>
                            <Button full size={Basic.size.small} type={Basic.type.light} outline onClick={() => {
                                const [closer] = Popup('ثبت درخواست', <NewRequest onSubmit={() => { closer() }}></NewRequest>)
                            }}>
                                <Icon.Plus size={20}></Icon.Plus>
                                درخواست
                            </Button>
                        </Table.Th>
                    </Table.Tr>
                </Table.THead>
                <Table.TBody>
                    {requests.map((request: Request, index: number) => {
                        return <Table.Tr key={index}>
                            <Table.Td textAlign={Basic.textAlign.center}>{index + 1}</Table.Td>
                            <Table.Td textAlign={Basic.textAlign.center}>{request.code}</Table.Td>
                            <Table.Td textAlign={Basic.textAlign.center}>{(request.type == 1) ? 'میزبان' : 'میهمان'}</Table.Td>
                            <Table.Td textAlign={Basic.textAlign.center}>{new Date(request.requestedDate).toLocaleString('fa-IR')}</Table.Td>
                            <Table.Td>{(request.type == 1) ? request.guest.firstName + ' ' + request.guest.lastName : request.host.firstName + ' ' + request.host.lastName}</Table.Td>
                            <Table.Td textAlign={Basic.textAlign.center}></Table.Td>
                            <Table.Td textAlign={Basic.textAlign.center}></Table.Td>
                            <Table.Td>
                                <span style={{ display: 'flex' }}>
                                    <Button size={Basic.size.small} type={Basic.type.danger} style={{ marginLeft: 2 }} disabled>
                                        <Icon.Trash size={20}></Icon.Trash>
                                    </Button>
                                    <Button size={Basic.size.small} type={Basic.type.info} style={{ marginLeft: 2 }} disabled>
                                        <Icon.Pencil size={20}></Icon.Pencil>
                                    </Button>
                                    <Button size={Basic.size.small} type={Basic.type.secondary} style={{ marginLeft: 2 }}>
                                        <Icon.ListCheck size={20}></Icon.ListCheck>
                                    </Button>
                                    <Button size={Basic.size.small} type={Basic.type.secondary} onClick={() => {
                                        Popup('ثبت درخواست', <RequestDetails subject={request.subject} description={request.description}></RequestDetails>)
                                    }}>
                                        <Icon.ChatSquareText size={20}></Icon.ChatSquareText>
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

function NewRequest({ onSubmit = (e: Array<Request>) => { } }: { onSubmit: (e: Array<Request>) => {} | void }) {
    const [type, setType] = useState(1);
    const [host, setHost] = useState(new Person());
    const [date, setDate] = useState('');
    const [name, setName] = useState('');
    const [family, setFamily] = useState('');
    const [mobile, setMobile] = useState('');
    const [id, setId] = useState('');
    const [guest, setGuest] = useState(new Person());

    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    return <div>
        <select onChange={(e) => { setType(parseInt(e.target.value)) }} style={{ width: '100%', borderRadius: 3, height: 35, marginBottom: 10 }} value={type}>
            <option value={1}>درخواست ملاقات</option>
            <option value={2}>درخواست میهمان (درون سازمان)</option>
            <option value={3}>درخواست میهمان (برون سازمان)</option>
        </select>

        <Button outline full type={Basic.type.primary} style={{ marginBottom: 10 }} onClick={() => {
            const [closer] = Popup('', <PersianCalendar onChange={(e) => { setDate(e); closer() }}></PersianCalendar>)
        }}>انتخاب تاریخ ملاقات</Button>
        {(date) ? <Item full value={date} onAction={() => { setDate('') }} style={{ marginBottom: 10 }}>{date}</Item> : null}
        {(type == 1 || type == 2) ?
            <span>
                <Button outline full type={Basic.type.primary} style={{ marginBottom: 10 }} onClick={() => {
                    const [closer] = Popup('', <PersonList onSelect={(e: Person) => { setHost(e); closer() }}></PersonList>)
                }}>{`انتخاب ${(type == 1) ? 'میزبان' : 'میهمان'}`}</Button>
                {(host.id) ? <Item full value={host.id} onAction={() => { setHost(new Person()) }} style={{ marginBottom: 10 }}>{host.firstName + ' ' + host.lastName}</Item> : null}
            </span>
            :
            <span>
                <Input title={'نام'} onChange={(e) => { setName(e) }}>{name}</Input>
                <Input title={'نام خانوادگی'} onChange={(e) => { setFamily(e) }}>{family}</Input>
                <Input title={'شماره تماس'} onChange={(e) => { setMobile(e) }}>{mobile}</Input>
                <Input title={'کد ملی'} onChange={(e) => { setId(e) }}>{id}</Input>
            </span>
        }
        <Input title={'موضوع ملاقات'} onChange={(e) => { setSubject(e) }}>{subject}</Input>
        <Input title={'توضیحات'} onChange={(e) => { setDescription(e) }}>{description}</Input>
        <Button disabled={
            ((type == 1 || type == 2) && (subject == '' || description.length < 25 || host.id == null || date == ''))
            ||
            ((type == 3) && (subject == '' || description.length < 25 || name == '' || family == '' || mobile == '' || id == '' || date == ''))
        } full type={Basic.type.primary} onClick={() => {
            Loading(true);
            Requests.add(subject, description, host.id, date, type, name, family, mobile, id).then((e: Array<Request>) => {
                onSubmit(e);
                Toast('درخواست با موفقیت ثبت شد', Basic.type.success)
            }).catch((e: any) => {
                console.log(e)
                Toast(e.error.Message, Basic.type.danger)
            }).finally(() => { Loading(false) })
        }}>ثبت</Button>
    </div>
}

function RequestDetails({ subject, description }: { subject?: string, description?: string }) {
    return <div>
        <h4>
            {subject}
        </h4>
        <p>
            {description}
        </p>
    </div>
}

function PersonList({ onSelect = (e: Person) => { } }: { onSelect: (e: Person) => {} | void }) {
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