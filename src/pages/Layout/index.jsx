import React from 'react'
import { Button } from 'antd'
import styles from './index.module.scss'
export default function Layout() {
    return (
        <div className={styles.demo}>
            <Button type='primary'>BUTTON!</Button>
        </div>
    )
}
