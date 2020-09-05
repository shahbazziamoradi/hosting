import React, { useState } from 'react'
import './../../assets/fonts/fonts.css'
import './styles/index.css'
import * as Icon from 'react-bootstrap-icons';
import { Alert, Layout } from '../layout/layout'
import { PlacesTree } from './partials/_placeTree';
import { Basic, Button } from '../../components/cute-ui/cuteUI';
import { Place } from '../../models/models';
import { TrafficList } from '../gates/traffic';

export function Index({ authorize = false }: { authorize: boolean }) {
    const [place, setPlace] = useState(new Place());
    return (
        <Layout isAuthenticated={authorize} title='مکان‌ها' icon={Icon.House}>
            <div className='places-body'>
                <div className='places-side-bar'>
                    <PlacesTree onSelect={(e: Place) => { setPlace(e) }} />
                </div>
                {(place.id) ? <div className='places-content'>
                    <div className='header bg-primary text-light'>
                        <Icon.GeoAlt style={{ marginLeft: 5 }} size={25}></Icon.GeoAlt>
                        <h3>{place.title}</h3>
                        <Button rounded type={Basic.type.light} outline style={{ width: 30, height: 30, padding: 0 }} onClick={() => { setPlace(new Place()) }}>
                            <Icon.X size={25}></Icon.X>
                        </Button>
                    </div>
                    <div className='body'>
                        <TrafficList></TrafficList>
                    </div>
                </div> : null}
            </div>
        </Layout>
    )
}