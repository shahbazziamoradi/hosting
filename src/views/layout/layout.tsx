import React, { useState, useEffect } from 'react'
import * as Icon from 'react-bootstrap-icons';
import './../../assets/fonts/fonts.css'
import './layout.css'
import { Button } from '../../components/cute-ui/cuteUI';

export enum fonts {
    IranSans_UltraLight = 'iransans_UltraLight',
    IranSans_Light = 'iransans_Light',
    IranSans_Regular = 'iransans',
    IranSans_Bold = 'iransans_Bold',
    IranSans_Black = 'iransans_Black'
}

type LayoutProps = {
    style?: object,
    children?: object
}
export function Layout({ style, children }: LayoutProps) {
    return (
        <div className='layout'>
            {children}
            <Footer></Footer>
        </div>
    )
}


type headerProps = {
    style?: object,
    children?: object
}

export function Header(props: headerProps) {
    return (
        <div className='layout-header'>
        </div>
    )
}

type bodyProps = {
    className?: string,
    style?: object,
    children?: object
}

export function Body(props: bodyProps) {
    return (
        <div className={`layout-body ${props.className}`} style={props.style}>
            {props.children}
        </div>
    )
}


type footerProps = {
    style?: object,
    children?: object
}

function Footer(props: footerProps) {
    const [now, setNow] = useState(new Date().toLocaleString('fa-IR'));
    useEffect(() => {
        setInterval(() => { setNow(new Date().toLocaleString('fa-IR')) }, 1000)
    }, [])

    return (
        <div className='layout-footer'>
            <div className='layout-footer-left'>
                {/* <button className='layout-footer-options-button'>
                    <Icon.GearWideConnected fontSize={20} className='layout-footer-left-icon' />
                    تنظیمات
                </button>
                <button className='layout-footer-options-button'>
                    <Icon.BoxArrowInLeft fontSize={20} className='layout-footer-left-icon' />
                    ورود به سیستم
                </button> */}
            </div>
            <div className='layout-footer-center'>
            </div>
            <div className='layout-footer-right'>
                <button className='layout-footer-options-button'>
                    {now}
                    <Icon.CalendarDate fontSize={20} className='layout-footer-right-icon' />
                </button>
            </div>
        </div>
    )
}
