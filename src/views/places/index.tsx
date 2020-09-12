import React, { useEffect, useState } from 'react'
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
                {(place) ?
                    <Details place={place} onClose={() => { setPlace(new Place()) }}></Details>
                    : null}
            </div>
        </Layout>
    )
}


function Details({ place, onClose = () => { } }: { place: Place, onClose?: () => {} | void }) {
    const [edit, setEdit] = useState(false);
    const [title, setTitle] = useState('');

    return (place.id) ? <div className='places-content'>
        <div className='header bg-primary text-light'>
            <span className='title-side'>
                <Icon.GeoAlt style={{ marginLeft: 5 }} size={28}></Icon.GeoAlt>
                <h3>{place.pathText.replace(place.title, '') + ((!edit) ? ((title == '') ? place.title : title) : '')}</h3>
                {(edit) ? <input value={title} className='edit-box' onChange={(e) => { setTitle(e.target.value) }} /> : null}
            </span>
            <span className='option-side'>
                {(place.type != 6 && !edit) ? <Button rounded light outline style={{ width: 30, height: 30, padding: 0, marginLeft: 5 }} onClick={() => {
                    setEdit(true); if (title == '') {
                        setTitle(place.title);
                    }
                }}>
                    <Icon.Pencil size={20}></Icon.Pencil>
                </Button> : null}
                {(edit) ? <span style={{ marginLeft: 5, display: 'flex' }}>
                    <Button rounded light outline style={{ width: 30, height: 30, padding: 0, marginLeft: 5 }} onClick={() => { setEdit(false); }}>
                        <Icon.Check size={25}></Icon.Check>
                    </Button>
                    <Button rounded light outline style={{ width: 30, height: 30, padding: 0, marginLeft: 5 }} onClick={() => { setTitle(place.title); }}>
                        <Icon.ArrowCounterclockwise size={25}></Icon.ArrowCounterclockwise>
                    </Button>
                    <Button rounded light outline style={{ width: 30, height: 30, padding: 0 }} onClick={() => { setEdit(false) }}>
                        <Icon.ArrowLeft size={25}></Icon.ArrowLeft>
                    </Button>
                </span> : null}

                <Button rounded light outline style={{ width: 30, height: 30, padding: 0 }} onClick={() => { setEdit(false); onClose() }}>
                    <Icon.X size={25}></Icon.X>
                </Button>
            </span>
        </div>
        <div className='body'>
            <TrafficList placeId={place.id}></TrafficList>
        </div>
    </div> : null
}

function openSettings() {
    // const [closer] = Popup('پارامترها', <GateSettings></GateSettings>);
}