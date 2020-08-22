import React, { useState, useEffect, useRef, Component } from 'react'
import * as Icon from 'react-bootstrap-icons';
import './../../assets/fonts/fonts.css'
import './styles/layout.css'
import ReactDOM from 'react-dom';
import { Redirect, Route, Router } from 'react-router-dom';
import { Toast as ToastComponent, toastType, Popup as PopupComponent } from '../../components/cute-ui/cuteUI'
import { PersianCalendar } from '../../components/cute-ui/persianCalendar/persianCalendar';
export { toastType }
export enum fonts {
    IranSans_UltraLight = 'iransans_UltraLight',
    IranSans_Light = 'iransans_Light',
    IranSans_Regular = 'iransans',
    IranSans_Bold = 'iransans_Bold',
    IranSans_Black = 'iransans_Black'
}

export enum accessType {
    public = 0,
    private = 1
}

type LayoutProps = {
    style?: object,
    children?: object | string | Element,
    access?: accessType,
    isAuthenticated?: boolean,
    title?: string,
    icon?: any,
    bodyClass?: string
}
export function Layout({ style, children, access = accessType.private, isAuthenticated = false, bodyClass, icon, title = '' }: LayoutProps) {
    useEffect(() => {
        setTitle(title)
    }, [])
    return (
        (access == accessType.public || (access == accessType.private && isAuthenticated)) ? (
            <div className='layout'>
                {(isAuthenticated) ? (
                    <Header></Header>
                ) : (null)}
                <Body className={bodyClass}>
                    {children}
                </Body>
                <Footer access={access} isAuthenticated={isAuthenticated} icon={icon} title={title}></Footer>
            </div>
        ) : (
                <Route render={(e) => (
                    <Redirect to={{ pathname: '/login', state: { from: e.location } }} />
                )
                } />
            )
    )
}


type headerProps = {
}

function Header(props: headerProps) {
    return (
        <div className='layout-header'>
            <div className='layout-header-cells'>
                <button className='layout-options-button'>
                    <Icon.Bell size={20} style={{ marginLeft: 0 }} />
                </button>
            </div>
            <div className='layout-header-cells'>
                <button className='layout-options-button userinfo'>
                    <Icon.PersonCircle size={20} />
                    محمد شهباز ضیاءمرادی
                </button>
            </div>
            <MenuItem icon={Icon.House} title='صفحه اصلی' link='/' />
            <MenuItem icon={Icon.Diagram3} title='مکان‌ها' link='/places' />
            <MenuItem icon={Icon.UpcScan} title='گیت‌ها' link='/gates' />
            <MenuItem icon={Icon.ClipboardData} title='گزارش‌ها' link='/reports' />
            <MenuItem icon={Icon.People} title='کاربران' link='/users' />
            <MenuItem icon={Icon.FileEarmarkCheck} title='لیست‌های تردد' link='/lists' />
            <MenuItem icon={Icon.ChatSquareText} title='درخواست‌ها' link='/requests' />
            <MenuItem icon={Icon.ArrowLeftRight} title='تردد‌ها' link='/traffic' />
            {/* <MenuItem />
            <MenuItem />
            <MenuItem />
            <MenuItem />
            <MenuItem />
            <MenuItem />
            <MenuItem />
            <MenuItem /> */}
            <div className='layout-header-title-cell'>

            </div>
        </div>
    )
}

type MenuItemPropsType = {
    icon?: any,
    title: string,
    link: string
}
function MenuItem({ title, icon: Icon, link }: MenuItemPropsType) {
    return (
        <div className='layout-header-cells'>
            <Route render={({ history }) => (
                <button className='layout-options-button' onClick={() => {
                    history.push(link)
                }}>
                    <Icon size={20}></Icon>
                    {title}
                </button>
            )} />
        </div>
    )
}
type bodyProps = {
    className?: string,
    style?: object,
    children?: object | string
}

function Body(props: bodyProps) {
    return (
        <div className={`layout-body ${props.className}`} style={props.style}>
            {props.children}
        </div>
    )
}

type footerProps = {
    style?: object,
    children?: object,
    isAuthenticated: boolean,
    access?: accessType,
    title?: string | null,
    icon?: any,
}

function Footer({ style, children, isAuthenticated, access, title, icon: PageIcon }: footerProps) {
    const [now, setNow] = useState(new Date().toLocaleString('fa-IR'));
    useEffect(() => {
        setInterval(() => { setNow(new Date().toLocaleString('fa-IR')) }, 1000)
    }, [])

    return (
        <div className='layout-footer'>
            <div className='layout-footer-cells'>
                {(isAuthenticated) ? (
                    <Route render={({ history }) => (
                        <button className='layout-options-button' onClick={() => {
                            history.push('/settings');
                        }}>
                            <Icon.GearWideConnected fontSize={20} className='layout-footer-left-icon' />
                    تنظیمات
                        </button>
                    )}
                    />
                ) : (
                        <button className='layout-options-button'>
                            <Icon.BoxArrowInLeft fontSize={20} className='layout-footer-left-icon' />
                        ورود به سیستم
                        </button>
                    )}
            </div>
            <div className='layout-footer-cells full'>
            </div>
            {/* <div className='layout-footer-cells title'>
                <PageIcon fontSize={20} />
                <label>{title}</label>
            </div> */}
            <div className='layout-footer-cells date'>
                <button className='layout-options-button' onClick={() => {

                    const [closer] = Popup('تقویم', <PersianCalendar onChange={(e) => { }}></PersianCalendar>)
                }}>
                    <Icon.Calendar3 fontSize={20} />
                    <label dir='ltr'>{now}</label>
                </button>
            </div>
        </div>
    )
}

function LoadingComponent(props: any) {
    return (
        <div className='loading-container-fluid'>
            <div className='spinner'></div>
        </div>
    )
}

export function Loading(state = true) {
    var index = document.getElementsByName('loading').length;
    if (state && index == 0) {
        var loading = document.createElement('div');
        var index = document.getElementsByName('loading').length;
        loading.id = 'loading';
        loading.setAttribute('name', 'loading');
        loading.style.position = 'fixed';
        loading.style.bottom = '0';
        loading.style.right = '0';
        loading.style.width = '100%';
        loading.style.height = '100%';
        var body = document.getElementsByTagName("body");
        body[0].appendChild(loading);
        ReactDOM.render(<LoadingComponent></LoadingComponent>, document.getElementById('loading'))
    }
    else if (!state) {
        var loadingObj = document.getElementById('loading');
        if (loadingObj !== null) {
            loadingObj.remove()
        }
    }
}

export function Toast(message: string, type = toastType.default, icon?: Icon.IconType, timeout = 5000) {
    var toastBox = document.createElement('div');
    toastBox.id = 'toast';
    toastBox.style.position = 'fixed';
    toastBox.style.bottom = '0';
    toastBox.style.right = '0';
    toastBox.style.width = '0';
    toastBox.style.height = '0';
    var body = document.getElementsByTagName("body");
    body[0].appendChild(toastBox);
    ReactDOM.render(<ToastComponent type={type} icon={icon}>{message}</ToastComponent>, document.getElementById('toast'))
    setTimeout(() => {
        var toastObj = document.getElementById('toast');
        if (toastObj !== null)
            toastObj.remove();
    }, timeout);
}

function setTitle(title: any) {
    ReactDOM.render(title, document.getElementsByTagName('title')[0]);
}

export function Popup(title: string, content: any, staticView = false) {
    console.log(content)
    var popup = document.createElement('div');
    var index = document.getElementsByName('popup').length;
    popup.id = `popup${index}`;
    popup.setAttribute('name', 'popup');
    popup.style.position = 'fixed';
    popup.style.bottom = '0';
    popup.style.right = '0';
    popup.style.width = '100%';
    popup.style.height = '100%';
    var body = document.getElementsByTagName("body");
    body[0].appendChild(popup);
    ReactDOM.render(<PopupComponent staticView={staticView} title={title} index={index} key={index}>{content}</PopupComponent>, document.getElementById(`popup${index}`))
    return [() => {
        var element = document.getElementById(`popup${index}`);
        if (element)
            element.remove()
    }]
}