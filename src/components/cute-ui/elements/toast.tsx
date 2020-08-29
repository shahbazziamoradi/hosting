import React from 'react'
import '../styles/toast.css'
import * as Icon from 'react-bootstrap-icons';
import * as Basic from './basics';

export function Toast({ type = Basic.type.default, icon: MessageIcon, disabled = false, hidden = false, children = '' }: { type: Basic.type, icon?: any, disabled?: boolean, hidden?: boolean, children: string }) {
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
