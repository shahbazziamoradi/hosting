import React, { useState } from 'react'
import './../../assets/fonts/fonts.css'
import './styles/index.css'
import * as Icon from 'react-bootstrap-icons';
import { Layout, Loading, Popup, Toast, toastType } from '../layout/layout'
import { PersianCalendar } from '../../components/cute-ui/persianCalendar/persianCalendar';
import { Button, buttonSize, buttonTheme, buttonType, Input } from '../../components/cute-ui/cuteUI';
import { data } from 'jquery';

export function Index({ authorize = false }: { authorize: boolean }) {
    const [struct, setStruct] = useState([{
        id: 1, title: 'شرکت بازرگانی و خدمات همگام‌خودرو', childrens: [{
            id: 2, title: 'مدیریت طرح‌وبرنامه', childrens: [
                { id: 4, title: 'بخش سیستم‌ها و روش‌ها', childrens: [] }, { id: 5, title: 'بخش پشتیبانی سیستم‌ها مکانیزه', childrens: [] }, { id: 6, title: 'بخش شبکه و امنیت اطلاعات', childrens: [] }
            ]
        }, {
            id: 3, title: 'مدیریت منابع انسانی', childrens: [
                { id: 7, title: 'بخش کارگزینی', childrens: [] },
                { id: 8, title: 'بخش آموزش', childrens: [] },
                { id: 9, title: 'بخش امور پدر', childrens: [] }
            ]
        }]
    }])
    return (
        <Layout isAuthenticated={authorize} title='مکان‌ها' icon={Icon.House}>
            <div className='places-body'>
                <div className='places-side-bar'>
                    <PlacesTree data={struct} />
                </div>
                <div className='places-content'>
                </div>
            </div>
        </Layout>
    )
}
enum visiblityType {
    visible = 'visible',
    invisible = 'invisible'
}
type place = { id: number, title: string, childrens: Array<place> | Array<null> }
function Place({ data, viewType }: { data: place, viewType: viewType }) {
    const [visiblity, setVisiblity] = useState(visiblityType.invisible)
    return (
        <div className='place-node'>
            <div className='place'>
                <div className='place-collapes'>
                    {(data.childrens.length > 0) ? (<Button style={{ padding: 0 }} onClick={() => {
                        if (visiblity == visiblityType.invisible) {
                            setVisiblity(visiblityType.visible)
                        } else {
                            setVisiblity(visiblityType.invisible)
                        }
                    }}>
                        {(visiblity == visiblityType.invisible) ? (
                            <Icon.CaretLeftFill size={15} />
                        ) : (
                                <Icon.CaretDownFill size={15} />
                            )}
                    </Button>) : null}
                </div>
                <div className='place-body'>{data.title}</div>
                {(viewType == "normal") ? (
                    <div className='place-options'>
                        <Button theme={buttonTheme.outline} type={buttonType.danger} style={{ padding: 0 }}>
                            <Icon.Trash size={15} />
                        </Button>
                        <Button theme={buttonTheme.outline} type={buttonType.primary} style={{ padding: 0 }} onClick={() => {
                            const [closer] = Popup('افزوردن گره جدید', <NewPlace onSubmit={() => {
                                closer()
                            }}></NewPlace>);
                        }}>
                            <Icon.Plus size={15} />
                        </Button>
                        <Button theme={buttonTheme.outline} type={buttonType.secondary} style={{ padding: 0 }}>
                            <Icon.EyeFill size={15} />
                        </Button>
                    </div>
                ) : null}
                {(viewType == "selectable") ? (
                    <div className='place-options'>
                        <Button theme={buttonTheme.outline} type={buttonType.secondary} size={buttonSize.xSmall}>
                            انتخاب
                        </Button>
                    </div>
                ) : null}
            </div>
            <PlacesTree data={data.childrens} visiblity={visiblity} type={viewType}></PlacesTree>
        </div>
    )
}

function NewPlace({ onSubmit = () => { } }: { onSubmit: () => {} | void }) {
    const [title, setTitle] = useState('');
    return (
        <div>
            <Input title='عنوان گره' onChange={(e) => { setTitle(e) }}></Input>
            <Button disabled={title.length == 0} theme={buttonTheme.outline} type={buttonType.primary} style={{ fontSize: 13, width: '100%', marginTop: 5 }}
                onClick={() => { Toast('گره جدید به موفقیت ایجاد شد', toastType.success, Icon.Check); onSubmit() }}>ثبت</Button>
        </div>
    )
}

export enum viewType {
    normal = 'normal',
    readOnly = 'readOnly',
    selectable = 'selectable'
}

export function PlacesTree({ data = [], visiblity = visiblityType.visible, type = viewType.normal }: { data: Array<place> | Array<null>, visiblity?: visiblityType, type?: viewType }) {
    return (
        (data.length > 0) ? (
            <div className={`childrens ${visiblity}`}>
                {
                    (data as Array<place>).map((value: place, index: any) =>
                        <Place key={index} data={value} viewType={type} />
                    )
                }
            </div>
        ) : null
    )
}