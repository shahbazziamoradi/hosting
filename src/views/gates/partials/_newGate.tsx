import React, { useState } from 'react'
import * as Icon from 'react-bootstrap-icons';
import { Button, Input, Item, Basic } from '../../../components/cute-ui/cuteUI'
import { Popup } from '../../layout/layout'
import { PlacesTree, viewType, place } from '../../places'

export function NewGate({ onSubmit = () => { } }: { onSubmit?: (e?: any) => {} | void }) {
    const [node, setNode] = useState(null);
    const [dist, setDist] = useState(null);
    const [ip, setIp] = useState('');
    return (
        <div>
            <Button full theme={Basic.theme.outline} type={Basic.type.primary} onClick={() => {
                const [closer] = Popup('', <div style={{ direction: 'ltr' }}><PlacesTree type={viewType.selectable} onSelect={(e: any) => {
                    setNode(e); closer();
                }} /></div>)
            }}>
                <Icon.GeoAlt size={18} style={{ marginLeft: 10 }}></Icon.GeoAlt>
                محل استقرار
            </Button>
            {(node) ? <Item full type={Basic.type.primary} style={{ marginTop: 5 }} onRemove={() => { setNode(null) }}>{(node as unknown as place).title}</Item> : ''}
            <Button full style={{ marginTop: 5 }} theme={Basic.theme.outline} type={Basic.type.primary} onClick={() => {
                const [closer] = Popup('', <div style={{ direction: 'ltr' }}><PlacesTree type={viewType.selectable} onSelect={(e: any) => {
                    setDist(e); closer();
                }} /></div>)
            }}>
                <Icon.BoxArrowLeft size={18} style={{ marginLeft: 10 }}></Icon.BoxArrowLeft>
                خروجی</Button>
            {(dist) ? <Item full type={Basic.type.primary} style={{ marginTop: 5 }} onRemove={() => { setDist(null) }}>{(dist as unknown as place).title}</Item> : ''}
            <Input type={Basic.input.ipAddress} title='آی‌پی آدرس' onChange={(e) => { setIp(e) }}>{ip}</Input>
            <Button disabled={(dist == null || node == null || ip == '')} type={Basic.type.primary} full onClick={() => { onSubmit() }}>ثبت</Button>
        </div>
    )
}