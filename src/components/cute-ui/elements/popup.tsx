import React from 'react'
import '../styles/popup.css'
import * as Icon from 'react-bootstrap-icons';
import Button from './button';
import * as Basic from './basics';
export function Popup({ title = '', children: content, index, staticView = false }: { title: string, children: any, index: number, staticView: boolean }) {
    return (
        <div className='cute-ui-popup' onClick={(e) => {
            // if (e.target.className === 'cute-ui-popup' && !staticView) {
            //     var element = document.getElementById(`popup${index}`);
            //     if (element)
            //         element.remove();
            // }
        }}>
            <div className='box'>
                <div className='header'>
                    <div className='right'>{title}</div>
                    <div className='left'>
                        {(!staticView) ? (
                            <Button rounded outline type={Basic.type.danger} className='close-btn' onClick={() => {
                                var element = document.getElementById(`popup${index}`);
                                if (element)
                                    element.remove();
                            }}>
                                <Icon.X size={20}></Icon.X>
                            </Button>
                        ) : null}
                    </div>
                </div>
                <div className='content'>
                    {content}
                </div>
            </div>
        </div>
    )
}

export function Alert({ children: content, type = Basic.type.secondary, index, buttonTitle = 'تایید', onSubmit = () => { } }: { children: any, type?: Basic.type, index: number, buttonTitle?: string, onSubmit?: () => {} | void }) {
    return (
        <div className='cute-ui-popup cute-ui-alert'>
            <div className='box'>
                <div className={`header bg-${type}`}>
                    <div className='right'></div>
                    <div className='left'>
                        <Button rounded outline type={Basic.type.light} className='close-btn' onClick={() => {
                            var element = document.getElementById(`alert${index}`);
                            if (element)
                                element.remove();
                        }}>
                            <Icon.X size={20}></Icon.X>
                        </Button>
                    </div>
                </div>
                <div className='content text-small'>
                    {content}
                </div>
                <div className='footer'>
                    <Button style={{ whiteSpace: 'nowrap' }} size={Basic.size.larg} type={type} outline onClick={() => {
                        onSubmit()
                        var element = document.getElementById(`alert${index}`);
                        if (element)
                            element.remove();
                    }}>{buttonTitle}</Button>
                </div>
            </div>
        </div>
    )
}


export function Confirm({ children: content, type = Basic.type.secondary, index, onOk = () => { }, onCancel = () => { } }: { children: any, type?: Basic.type, index: number, onOk?: () => {} | void, onCancel?: () => {} | void }) {
    return (
        <div className='cute-ui-popup cute-ui-alert'>
            <div className='box'>
                <div className={`header bg-${type}`}>
                    <div className='right'></div>
                    <div className='left'>
                        <Button rounded outline type={Basic.type.light} className='close-btn' onClick={() => {
                            var element = document.getElementById(`confirm${index}`);
                            if (element)
                                element.remove();
                        }}>
                            <Icon.X size={20}></Icon.X>
                        </Button>
                    </div>
                </div>
                <div className='content text-small'>
                    {content}
                </div>
                <div className='footer'>
                    <Button size={Basic.size.larg} type={type} outline onClick={() => {
                        onOk()
                        var element = document.getElementById(`confirm${index}`);
                        if (element)
                            element.remove();
                    }}>تایید</Button>
                    <Button size={Basic.size.larg} secondary outline style={{ marginLeft: 5 }} onClick={() => {
                        onCancel();
                        var element = document.getElementById(`confirm${index}`);
                        if (element)
                            element.remove();
                    }}>انصراف</Button>
                </div>
            </div>
        </div>
    )
}