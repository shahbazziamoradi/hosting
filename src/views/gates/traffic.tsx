import React, { useState } from 'react'
import './../../assets/fonts/fonts.css'
import './styles/index.css'
import * as Icon from 'react-bootstrap-icons';
import { Layout, Loading, Toast } from '../layout/layout'
import { PersianCalendar } from '../../components/cute-ui/persianCalendar/persianCalendar';

export function Traffic({ authorize = false }: { authorize: boolean }) {

    return (
        <Layout isAuthenticated={authorize} title='تردد‌ها' icon={Icon.House}>

        </Layout>
    )
}