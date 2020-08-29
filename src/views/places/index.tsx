import React, { useEffect, useState } from 'react'
import './../../assets/fonts/fonts.css'
import './styles/index.css'
import * as Icon from 'react-bootstrap-icons';
import { Layout, Loading, Popup, Toast } from '../layout/layout'
import { PersianCalendar } from '../../components/cute-ui/persianCalendar/persianCalendar';
import { Button, Input, Basic } from '../../components/cute-ui/cuteUI';
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
                    <PlacesTree />
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
export type place = { id: number, title: string, childrens: Array<place> | Array<null> }
function Place({ data, viewType, onSelect = () => { } }: {
    data: place, viewType: viewType, onSelect?: (e?: place) => {} | void
}) {
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
                        <Button theme={Basic.theme.outline} type={Basic.type.danger} style={{ padding: 0 }}>
                            <Icon.Trash size={15} />
                        </Button>
                        <Button theme={Basic.theme.outline} type={Basic.type.primary} style={{ padding: 0 }} onClick={() => {
                            const [closer] = Popup('افزوردن گره جدید', <NewPlace onSubmit={() => {
                                closer()
                            }}></NewPlace>);
                        }}>
                            <Icon.Plus size={15} />
                        </Button>
                        <Button theme={Basic.theme.outline} type={Basic.type.secondary} style={{ padding: 0 }}>
                            <Icon.EyeFill size={15} />
                        </Button>
                    </div>
                ) : null}
                {(viewType == "selectable") ? (
                    <div className='place-options'>
                        <Button theme={Basic.theme.outline} type={Basic.type.secondary} size={Basic.size.xSmall} onClick={() => { onSelect(data) }}>
                            انتخاب
                        </Button>
                    </div>
                ) : null}
            </div>
            <PlacesTree init={false} data={data.childrens} visiblity={visiblity} type={viewType} onSelect={onSelect}></PlacesTree>
        </div>
    )
}

function NewPlace({ onSubmit = () => { } }: { onSubmit: () => {} | void }) {
    const [title, setTitle] = useState('');
    return (
        <div>
            <Input title='عنوان گره' onChange={(e) => { setTitle(e) }}></Input>
            <Button disabled={title.length == 0} theme={Basic.theme.outline} type={Basic.type.primary} style={{ fontSize: 13, width: '100%', marginTop: 5 }}
                onClick={() => { Toast('گره جدید به موفقیت ایجاد شد', Basic.type.success, Icon.Check); onSubmit() }}>ثبت</Button>
        </div>
    )
}

export enum viewType {
    normal = 'normal',
    readOnly = 'readOnly',
    selectable = 'selectable'
}

export function PlacesTree({
    init = true,
    data = [],
    visiblity = visiblityType.visible,
    type = viewType.normal,
    onSelect = () => { }
}: {
    init?: boolean,
    data?: Array<place> | Array<null>,
    visiblity?: visiblityType,
    type?: viewType,
    onSelect?: (e?: place) => {} | void
}) {
    const [struct, setStruct] = useState(Array<place | null>());
    useEffect(() => {
        if (init) {
            setStruct([{
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
            }]);
        }
        else {
            setStruct([...data])
        }
    }, [])
    return (
        (struct.length > 0) ? (
            <div className={`childrens ${visiblity}`}>
                {
                    (struct as Array<place>).map((value: place, index: any) =>
                        <Place key={index} data={value} viewType={type} onSelect={onSelect} />
                    )
                }
            </div>
        ) : null
    )
}