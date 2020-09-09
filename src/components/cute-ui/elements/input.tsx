import React, { useEffect, useState } from 'react'
import $ from 'jquery'
import '../styles/input.css'
import '../styles/dropDown.css'
import * as Basic from './basics'

type inputProps = {
    title: string,
    style?: React.CSSProperties | undefined,
    className?: string,
    type?: Basic.input,
    children?: string,
    onChange?: (e: string) => void | string
}
export function Input({ title, style, type = Basic.input.text, children = '', onChange = (e: string) => { } }: inputProps) {
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
                <label id={id} htmlFor={`input_${id}`} className={labelClass}>{title}</label>
            </legend>
            <input type={type} id={`input_${id}`} className='cute-ui input' style={style} onChange={(e) => { setText(e.target.value); onChange(e.target.value) }} onBlur={() => {
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

// export function DropDown(props: any) {
//     return (
//         <select></select>
//     )
// }

export function DropDown({ title, style, type = Basic.input.text, children = '', onChange = (e: string) => { } }: inputProps) {
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
                <label id={id} htmlFor={`dropdown_${id}`} className={labelClass}>{title}</label>
            </legend>
            <select id={`dropdown_${id}`} className='cute-ui dropdown' style={style} onChange={(e) => { setText(e.target.value); onChange(e.target.value) }} onBlur={() => {
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
                value={text}></select>
        </fieldset>
    )
}
