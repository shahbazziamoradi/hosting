import React, { useState } from 'react'
import './../../assets/fonts/fonts.css'
import './styles/index.css'
import * as Icon from 'react-bootstrap-icons';
import { Alert, Layout, Popup } from '../layout/layout'
import { PlacesTree } from './partials/_placeTree';
import { Basic, Button } from '../../components/cute-ui/cuteUI';
import { Place } from '../../models/models';
import { TrafficList } from '../gates/traffic';
import { GateSettings } from '../gates/partials/_gateSettings';

export function Index({ authorize = false }: { authorize: boolean }) {
    const [place, setPlace] = useState(new Place());
    return (
        <Layout isAuthenticated={authorize} title='مکان‌ها' icon={Icon.House}>
            <div className='places-body'>
                <div className='places-side-bar'>
                    <PlacesTree onSelect={(e: Place) => { setPlace(e) }} />
                </div>
                <Details place={place} onClose={() => { setPlace(new Place()) }}></Details>
            </div>
        </Layout>
    )
}


function Details({ place, onClose = () => { } }: { place: Place, onClose?: () => {} | void }) {
    return (place.id) ? <div className='places-content'>
        <div className='header bg-primary text-light'>
            <Icon.GeoAlt style={{ marginLeft: 5 }} size={25}></Icon.GeoAlt>
            <h3 title={place.pathText}>{place.pathText}</h3>
            <Button rounded light outline style={{ width: 30, height: 30, padding: 0, marginLeft: 5 }} onClick={() => { }}>
                <Icon.ArrowLeftRight size={25}></Icon.ArrowLeftRight>
            </Button>
            {(place.type != 6) ? <Button rounded light outline style={{ width: 30, height: 30, padding: 0, marginLeft: 5 }} onClick={() => { }}>
                <Icon.Pencil size={20}></Icon.Pencil>
            </Button> : null}
            {(place.type == 6) ? <Button rounded light outline style={{ width: 30, height: 30, padding: 0, marginLeft: 5 }} onClick={() => { openSettings() }}>
                <Icon.GearWideConnected size={20}></Icon.GearWideConnected>
            </Button> : null}
            <Button rounded light outline style={{ width: 30, height: 30, padding: 0 }} onClick={() => { onClose() }}>
                <Icon.X size={25}></Icon.X>
            </Button>
        </div>
        <div className='body'>
            <TrafficList></TrafficList>
        </div>
    </div> : null
}

function openSettings() {
    const [closer] = Popup('پارامترها', <GateSettings></GateSettings>);
}