
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

export function Toast({ type = toastType.default, disabled = false, hidden = false, children = '' }: { type: toastType, disabled?: boolean, hidden?: boolean, children: string }) {
    return (
        <div className={'cute-ui-toast-box ' + type}>
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
