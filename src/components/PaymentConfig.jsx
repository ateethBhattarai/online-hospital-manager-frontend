import myKey from "./khaltiKey";
import { useStateContext } from '../Context/ContextProvider';
import { useNavigate } from 'react-router-dom';
import KhaltiCheckout from "khalti-checkout-web";

const PaymentConfig = () => {
    const { user } = useStateContext();
    let navigate = useNavigate();

    const paymentStatusChange = (ids) => {
        // Update the payment status logic here
    };

    const onSuccessHandler = (payload) => {
        const requestData = {
            ids: payload.ids, // Assuming the required ID value is present in the payload
            'payment_status': 'completed',
            'modified_by': user.full_name
        };

        console.log(requestData);

        // Update the paymentStatusChange logic to pass the required ID value
        paymentStatusChange(requestData.ids);

        localStorage.setItem('payment', 'successful');
    };

    const config = {
        publicKey: myKey.publicTestKey,
        productIdentity: '1234567890',
        productName: 'Drogon',
        productUrl: 'http://gameofthrones.com/buy/Dragons',
        eventHandler: {
            onSuccess: onSuccessHandler,
            onError: (error) => {
                console.log(error);
            },
            onClose: () => {
                console.log('Widget is closed!!');
            }
        },
        paymentPreference: ['KHALTI']
    };

    return config;
};

export default PaymentConfig;
