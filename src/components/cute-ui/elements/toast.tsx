import React from 'react'
import '../styles/toast.css'
import * as Icon from 'react-bootstrap-icons';

export enum toastType {
    primary = 'primary',
    success = 'success',
    info = 'info',
    warning = 'warning',
    danger = 'danger',
    default = 'info',
    secondary = 'secondary',
    dark = 'dark'
}

export function Toast({ type = toastType.default, icon: MessageIcon, disabled = false, hidden = false, children = '' }: { type: toastType, icon?: any, disabled?: boolean, hidden?: boolean, children: string }) {
    return (
        <div className={'cute-ui-toast-box ' + type}>
            {(MessageIcon) ? (<MessageIcon className='message-icon' size={28} />) : null}
            <span className='message-box'>{children}</span>
            <span className='button-box'>
                <button hidden={hidden} disabled={disabled} onClick={() => {
                    var toastObj = document.getElementById('toast');
                    if (toastObj !== null)
                        toastObj.remove();
                }} >
                    <Icon.X size={20}></Icon.X>
                </button>
            </span>
        </div>
    )
}
