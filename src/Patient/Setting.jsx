import { Card } from 'antd'
import React from 'react'

const Setting = () => {
    return (
        <>
            {/* For the pupose of managing personal account */}
            <Card className='container my-4' title='Account Setting'>
                Setting
            </Card>

            {/* For the purpose of managing password */}
            <Card className='container my-4' title='Password Setting'>
                Setting
            </Card>
        </>
    )
}

export default Setting