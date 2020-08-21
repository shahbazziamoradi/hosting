import React, { useState } from 'react'
import './../../assets/fonts/fonts.css'
import './index.css'
import * as Icon from 'react-bootstrap-icons';
import { Layout, Loading, Toast, toastType } from '../layout/layout'
import { PersianCalendar } from '../../components/persian_calendar/persianCalendar';

export function Index({ authorize = false }: { authorize: boolean }) {
    return (
        <Layout isAuthenticated={authorize} title='صفحه اصلی' icon={Icon.House}>
            <PersianCalendar></PersianCalendar>
        </Layout>
    )
}