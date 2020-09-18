import React, { useEffect, useState } from 'react'
import * as Icon from 'react-bootstrap-icons';
import './styles/gateView.css'
import { Button, Input, Item, Basic } from '../../components/cute-ui/cuteUI'
import { Gate } from '../../models/models';
import { Gates as ViewGate } from '../views';
import { Gates } from '../../controllers/controllers';
import { Loading, Toast } from '../layout/layout'

export function GateView(props: any) {
    const [data, setData] = useState(Array<Gate>());
    useEffect(() => {
        Loading(true)
        var promise = Gates.getGates();
        promise.then(async (e: Array<Gate>) => {
            setData([...e])
        })
        promise.catch(() => {
            Toast('خطا در ارتباط با سرور', Basic.type.danger)
        })
        promise.finally(() => {
            Loading(false)
        })
    }, [])
    return (
        <>
            {data.map((gate, index) => {
                return (
                    <div key={index} className='gate-view'>
                        <div className='gate-view-title'>
                            <span>{gate.ip}</span>
                            <span>{gate.title}</span>
                        </div>
                        <ViewGate.CheckConnection ip={gate.ip} className='gate-refresh'></ViewGate.CheckConnection>
                    </div>)
            })}
        </>
    )
}
