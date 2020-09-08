import React, { useState } from 'react'
import * as Icon from 'react-bootstrap-icons';
import { Basic, Button, Input } from '../../../components/cute-ui/cuteUI';
import '../styles/gateSettings.css'
// type buttonProps = {
//     style?: React.CSSProperties | undefined,
//     className?: string,
//     disabled?: boolean,
//     active?: boolean,
//     theme?: Basic.theme,
//     children?: object | string,
//     onClick?: (e?: object) => void,
//     rounded?: boolean,
//     sharp?: boolean,
//     full?: boolean,
//     outline?: boolean,
//     value?: any,
//     size?: Basic.size | number
// }

export function GateSettings({ onSubmit = () => { } }: { onSubmit?: (e?: any) => {} | void }) {
    const [section, setSection] = useState(0)
    return (
        <div className='gate-settings-main'>
            <div className='right-side'>
                <Button sharp outline={!(section == 0)} primary={true} onClick={() => { setSection(0) }}>
                    <Icon.Sliders size={30}></Icon.Sliders>
                </Button>
                <Button sharp outline={!(section == 1)} primary={true} onClick={() => { setSection(1) }}>
                    <Icon.CloudDownload size={30}></Icon.CloudDownload>
                </Button>
                <Button sharp outline={!(section == 2)} primary={true} onClick={() => { setSection(2) }}>
                    <Icon.CloudUpload size={30}></Icon.CloudUpload>
                </Button>
                <Button sharp outline={!(section == 3)} primary={true} onClick={() => { setSection(3) }}>
                    <Icon.Command size={30}></Icon.Command>
                </Button>
                <Button sharp outline={!(section == 4)} primary={true} onClick={() => { setSection(4) }}>
                    <Icon.Pencil size={30}></Icon.Pencil>
                </Button>
            </div>
            <div className='left-side'>
                {(section == 0) ? <div>
                </div> : null}
                {(section == 1) ? <div>2</div> : null}
                {(section == 2) ? <div>3</div> : null}
                {(section == 3) ? <div>
                    <Button full outline info>ویرایش</Button>
                    <Button full outline info style={{ marginTop: 5 }}>ویرایش</Button>
                    <Button full outline info style={{ marginTop: 5 }}>ویرایش</Button>
                    <Button full outline info style={{ marginTop: 5 }}>ویرایش</Button>
                    <Button full outline info style={{ marginTop: 5 }}>ویرایش</Button>
                    <Button full outline info style={{ marginTop: 5 }}>ویرایش</Button>
                    <Button full outline info style={{ marginTop: 5 }}>ویرایش</Button>
                </div> : null}
                {(section == 4) ? <div>
                    <Input title={'عنوان'}></Input>
                    <Input type={Basic.input.ipAddress} title={'آی‌پی'}></Input>
                    <Button full outline info style={{ marginTop: 15 }}>ویرایش</Button>
                </div> : null}
            </div>
        </div>
    )
}