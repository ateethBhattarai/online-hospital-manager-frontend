import React from 'react';
import config from './khaltiConfig';
import KhaltiCheckout from "khalti-checkout-web";

const Khalti = () => {

  let checkout = new KhaltiCheckout(config);

  let btnStyle = {
    backgroundColor: 'purple',
    padding: '10px',
    cursor: 'pointer',
    fontWeight: 'bold',
    color: 'white',
    border: 'none',
    borderRadius: '10px'
  }

  return (
    <button onClick={() => checkout.show({ amount: 1000 })} style={btnStyle}>Pay via Khalti</button>
  )
}

export default Khalti