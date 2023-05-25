import Payment from "./Payment";
import myKey from "./khaltiKey";

let config = {
    "publicKey": myKey.publicTestKey,
    "productIdentity": "1234567890",
    "productName": "Drogon",
    "productUrl": "http://gameofthrones.com/buy/Dragons",
    "eventHandler": {
        onSuccess(payload) {
            // hit merchant api for initiating verfication
            localStorage.setItem('payment', 'successfull');
            <Payment id={config.appointmentID} />
            // console.log(payload.amount ? "Success" : "pending");

        },
        // onError handler is optional
        onError(error) {
            // handle errors
            console.log(error);
        },
        onClose() {
            console.log('widget is closed!!');
        }
    },
    "paymentPreference": ["KHALTI"],
    "appointmentID": 0
};


export default config;