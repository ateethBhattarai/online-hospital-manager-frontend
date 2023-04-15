import { Card, Divider, Image } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom';
const { Meta } = Card;

const InventoryCards = () => {
    const gridStyle = {
        width: '25%',
        textAlign: 'center',
    };
    return (
        <div className="container-md mt-3">
            <Card>
                This includes the inventory medicines card carousal.
            </Card>
        </div>
    )
}

export default InventoryCards