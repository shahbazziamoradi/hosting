import React from 'react'
import '../styles/popup.css'
import * as Icon from 'react-bootstrap-icons';
import Button, { buttonTheme, buttonType } from './button';

export function Popup({ title = '', children: content, index, staticView = false }: { title: string, children: any, index: number, staticView: boolean }) {
    return (
        <div className='cuteUi-popup' onClick={(e) => {
            // if (e.target.className === 'cuteUi-popup' && !staticView) {
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
                            <Button rounded theme={buttonTheme.outline} type={buttonType.danger} className='close-btn' onClick={() => {
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