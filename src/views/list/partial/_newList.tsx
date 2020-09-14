import React, { useState } from 'react'
import { Button, Input, Item, Basic, DropDown } from '../../../components/cute-ui/cuteUI'
import { List } from '../../../models/models';
import { Lists } from '../../../controllers/controllers';
import { Loading, Toast } from '../../layout/layout'

export function NewList({ onSubmit = () => { } }: { onSubmit?: (e?: any) => {} | void }) {
    const [title, setTitle] = useState('');
    const [type, setType] = useState(1);
    return (
        <div dir='rtl'>

            <select onChange={(e) => { setType(parseInt(e.target.value)) }} style={{ width: '100%', borderRadius: 3, height: 35 }} value={type}>
                <option value={1}>لیست سفید</option>
                <option value={2}>لیست سیاه</option>
                <option value={3}>لیست قرمز</option>
            </select>
            <Input type={Basic.input.text} title='عنوان' onChange={(e) => { setTitle(e) }}>{title}</Input>
            <Button disabled={title == ''} type={Basic.type.primary} full onClick={() => {
                var list = new List();
                list.title = title;
                list.type = type;
                Loading(true)
                Lists.addList(list).then((e) => {
                    Toast('عملیات با موفقیت انجام شد.', Basic.type.success)
                    onSubmit(e)
                }).catch((e) => {
                    Toast(e.error.Message, Basic.type.danger)
                }).finally(() => {
                    Loading(false)
                })
            }}>ثبت</Button>
        </div>
    )
}