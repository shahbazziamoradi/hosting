import React, { useState } from 'react'
import './../../assets/fonts/fonts.css'
import './styles/index.css'
import * as Icon from 'react-bootstrap-icons';
import { Layout, Loading, Toast, toastType } from '../layout/layout'
import { PersianCalendar } from '../../components/cute-ui/persianCalendar/persianCalendar';

export function Index({ authorize = false }: { authorize: boolean }) {

    return (
        <Layout isAuthenticated={authorize} title='تنظیمات' icon={Icon.House}>

        </Layout>
    )
}