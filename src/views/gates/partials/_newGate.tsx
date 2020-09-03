import React, { useState } from 'react'
import * as Icon from 'react-bootstrap-icons';
import { Button, Input, Item, Basic } from '../../../components/cute-ui/cuteUI'
import { Place } from '../../../models/models';
import { Gates } from '../../../controllers/controllers';
import { Loading, Popup, Toast } from '../../layout/layout'
import { PlacesTree, viewType } from '../../places/partials/_placeTree';

export function NewGate({ onSubmit = () => { } }: { onSubmit?: (e?: any) => {} | void }) {
    const [src, setSrc] = useState(null);
    const [dest, setDest] = useState(null);
    const [ip, setIp] = useState('');
    const [title, setTitle] = useState('');
    return (
        <div>
            <Button full theme={Basic.theme.outline} type={Basic.type.primary} onClick={() => {
                const [closer] = Popup('', <div style={{ direction: 'ltr' }}><PlacesTree type={viewType.selectable} onSelect={(e: any) => {
                    setSrc(e); closer();
                }} /></div>)
            }}>
                <Icon.GeoAlt size={18} style={{ marginLeft: 10 }}></Icon.GeoAlt>
                محل استقرار
            </Button>
            {(src) ? <Item full type={Basic.type.primary} style={{ marginTop: 5 }} onRemove={() => { setSrc(null) }}>{(src as unknown as Place).title}</Item> : ''}
            <Button full style={{ marginTop: 5 }} theme={Basic.theme.outline} type={Basic.type.primary} onClick={() => {
                const [closer] = Popup('', <div style={{ direction: 'ltr' }}><PlacesTree type={viewType.selectable} onSelect={(e: any) => {
                    setDest(e); closer();
                }} /></div>)
            }}>
                <Icon.BoxArrowLeft size={18} style={{ marginLeft: 10 }}></Icon.BoxArrowLeft>
                خروجی</Button>
            {(dest) ? <Item full type={Basic.type.primary} style={{ marginTop: 5 }} onRemove={() => { setDest(null) }}>{(dest as unknown as Place).title}</Item> : ''}
            <Input type={Basic.input.ipAddress} style={{ textAlign: 'center' }} title='آی‌پی آدرس' onChange={(e) => { setIp(e) }}>{ip}</Input>
            <Input type={Basic.input.text} title='عنوان' onChange={(e) => { setTitle(e) }}>{title}</Input>
            <Button disabled={(dest == null || src == null || ip == '' || title == '')} type={Basic.type.primary} full onClick={() => {
                Loading(true)
                Gates.addGate((dest as unknown as Place).id, (src as unknown as Place).id, ip, title).then((e) => {
                    Toast('عملیات با موفقیت انجام شد.', Basic.type.success)
                    onSubmit(e)
                }).catch((e) => {
                    if (e.code == 500) {
                        Toast(e.error.Message, Basic.type.danger)
                    } else {
                        Toast('خطا در ارتباط با سرور', Basic.type.danger)
                    }
                }).finally(() => {
                    Loading(false)
                })
            }}>ثبت</Button>
        </div>
    )
}