import React, { useState } from 'react'
import './../../assets/fonts/fonts.css'
import './styles/index.css'
import * as Icon from 'react-bootstrap-icons';
import { Alert, Confirm, Layout, Loading, Toast } from '../layout/layout'
import { PersianCalendar } from '../../components/cute-ui/persianCalendar/persianCalendar';
import { Basic } from '../../components/cute-ui/cuteUI';

export function Index({ authorize = false }: { authorize: boolean }) {
    return (
        <Layout isAuthenticated={authorize} title='صفحه اصلی' icon={Icon.House}>

        </Layout>
    )
}