import React, { useState } from 'react'
import { Button, buttonType, Input, inputType } from '../../../components/cute-ui/cuteUI'
import { Popup } from '../../layout/layout'
import { PlacesTree, viewType } from '../../places'

export function NewGate({ onSubmit = () => { } }: { onSubmit?: (e?: any) => {} | void }) {
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
        <div>
            <Button onClick={() => {
                Popup('', <div style={{ direction: 'ltr' }}><PlacesTree type={viewType.selectable} data={struct} /></div>)
            }}>انتخاب آدرس</Button>
            <Input type={inputType.ipAddress} title='آی‌پی آدرس'></Input>
            <Button type={buttonType.primary} full onClick={() => { onSubmit() }}>ثبت</Button>
        </div>
    )
}