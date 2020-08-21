import React, { useState } from 'react'
import './../../assets/fonts/fonts.css'
import './index.css'
import * as Icon from 'react-bootstrap-icons';
import { Layout, Loading, Toast } from '../layout/layout'

export function Index({ authorize = false }: { authorize: boolean }) {
    Toast('سلام', 'info')
    return (
        <Layout isAuthenticated={authorize} title='صفحه اصلی' icon={Icon.House}>

        </Layout>
    )
}