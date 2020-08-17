import React, { useEffect, useState } from 'react'
import $ from 'jquery'
import '../styles/input.css'
export enum inputType {
    button = 'button',
    checkbox = 'checkbox',
    color = 'color',
    date = 'date',
    datetime = 'datetime',
    email = 'email',
    file = 'file',
    hidden = 'hidden',
    image = 'image',
    month = 'month',
    number = 'number',
    password = 'password',
    radio = 'radio',
    range = 'range',
    reset = 'reset',
    search = 'search',
    submit = 'submit',
    tel = 'tel',
    text = 'text',
    time = 'time',
    url = 'url',
    wee = 'wee'
}

type inputProps = {
    title: string,
    style?: object,
    type?: inputType,
    children?: string,
    onChange?: (e: string) => {}
}
export function Input({ title, style, type = inputType.text, children = '', onChange = (e: string) => { return e; } }: inputProps) {
    const id = Math.floor(Math.random() * (9999999 - 1000000) + 1000000).toString();
    const [labelClass, setLabelClass] = useState('');
    const [legendWidth, setLegendWidth] = useState(0.0);
    const [labelWidth, setLabelWidth] = useState(0.0);
    const [text, setText] = useState(children);
    useEffect(() => {
        const width = parseFloat(String($('fieldset.cute-ui>legend>label#' + id).width())) + 12;
        setLabelWidth(width);
        if (text != '') {
            setLabelClass('focus')
            setLegendWidth(width)
        }
        // else {

        // }
    }, [])
    return (
        <fieldset className={'cute-ui ' + labelClass}>
            <legend style={{ width: legendWidth }}>
                <label id={id} className={labelClass}>{title}</label>
            </legend>
            <input type={type} className='cute-ui input' style={style} onChange={(e) => { setText(e.target.value); onChange(text) }} onBlur={() => {
                if (text == '') {
                    setLabelClass('')
                    setLegendWidth(0)
                }
                else {
                    setLegendWidth(labelWidth)
                }
            }} onFocus={() => {
                setLabelClass('focus')
                setLegendWidth(labelWidth)
            }}
                value={text}></input>
        </fieldset>
    )
}