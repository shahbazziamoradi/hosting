import React, { useState, useEffect, useRef } from 'react'
import * as Icon from 'react-bootstrap-icons';
import './../../assets/fonts/fonts.css'
import './layout.css'
import { Button } from '../../components/cute-ui/cuteUI';
import { Routes } from '../../components/routing';

export enum fonts {
    IranSans_UltraLight = 'iransans_UltraLight',
    IranSans_Light = 'iransans_Light',
    IranSans_Regular = 'iransans',
    IranSans_Bold = 'iransans_Bold',
    IranSans_Black = 'iransans_Black'
}

enum accessType {
    public = 0,
    private = 1
}

type LayoutProps = {
    style?: object,
    children?: object | string | Element,
    access?: accessType
}
export function Layout({ style, children, access = accessType.private }: LayoutProps) {
    const a = useRef();
    a.
        const[isAuthenticated, setAuthenticated] = useState(false);
    const authorize = (e: boolean) => { setAuthenticated(e); }
    return (
        (access == accessType.public || (access == accessType.private && isAuthenticated)) ? (
            <div className='layout'>
                {children}
                <Footer authorize={(access == accessType.public || (access == accessType.private && isAuthenticated))}></Footer>
            </div>
        ) : (
                null
            )
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
    children?: object | string
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
    children?: object,
    authorize: boolean
}

function Footer(props: footerProps) {
    const [now, setNow] = useState(new Date().toLocaleString('fa-IR'));
    useEffect(() => {
        setInterval(() => { setNow(new Date().toLocaleString('fa-IR')) }, 1000)
    }, [])

    return (
        <div className='layout-footer'>
            <div className='layout-footer-left'>
                {(props.authorize) ? (
                    <button className='layout-footer-options-button'>
                        <Icon.GearWideConnected fontSize={20} className='layout-footer-left-icon' />
                    تنظیمات
                    </button>
                ) : (
                        <button className='layout-footer-options-button'>
                            <Icon.BoxArrowInLeft fontSize={20} className='layout-footer-left-icon' />
                    ورود به سیستم
                        </button>)}
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
