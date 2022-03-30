import { FirebaseSignupSucces } from "../../entities/FirebaseSignupSucces";
import { User } from "../../entities/User";

export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';

export const signup = (email: string, password: string) => {
    return async (dispatch: any) => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD0tXbl-wV7TFdp_iyDUrPIcBFlbNDfkyA', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ //javascript to json
                //key value pairs of data you want to send to server
                // ...
                 email: email,
                 password: password,
                returnSecureToken: true
            })
        });

        if (!response.ok) {
            console.log(response)

            //There was a problem..
            alert("FEJL!")
            console.log("Der er en fejl i user.actions.ts")
        } else {
            const data: FirebaseSignupSucces = await response.json(); // json to javascript
            console.log("data from server: " + data.localId);
            alert("YAAAS")
            const user = new User(data.localId, data.email, "", "", "")

            dispatch({ type: SIGNUP, payload: {user, idToken: data.idToken } })
        }
    };
};


export const signin = (email: string, password: string) => {
    return async (dispatch: (arg0: { type: string, payload: string}) => void) => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD0tXbl-wV7TFdp_iyDUrPIcBFlbNDfkyA', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        });

        if (!response.ok){
            console.log(response)
            //Problems..
            alert("Fejl med at logge ind!")
            console.log("user actions fejl")
        }
        else {
            const loginData = await response.json()
            console.log("data from server - login: " + loginData.email + ", local id: " + loginData.localId + ", id token: "
                        + loginData.idToken)
            alert("Oh my gawd, YAAAS!")

            dispatch({ type: SIGNIN, payload: loginData})
        }
    };
}; 
