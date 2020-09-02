import React from 'react'
import './../../assets/fonts/fonts.css'
import './styles/index.css'
import * as Icon from 'react-bootstrap-icons';
import { Alert, Layout } from '../layout/layout'
import { PlacesTree } from './partials/_placeTree';
import { Basic } from '../../components/cute-ui/cuteUI';

export function Index({ authorize = false }: { authorize: boolean }) {
    return (
        <Layout isAuthenticated={authorize} title='مکان‌ها' icon={Icon.House}>
            <div className='places-body'>
                <div className='places-side-bar'>
                    <PlacesTree />
                </div>
                <div className='places-content'>
                </div>
            </div>
        </Layout>
    )
}