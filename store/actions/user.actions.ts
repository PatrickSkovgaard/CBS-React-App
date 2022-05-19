import { useState } from "react";
import { FirebaseSignupSucces } from "../../entities/FirebaseSignupSucces";
import { User } from "../../entities/User";

export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';
export const LOGOUT = 'LOGOUT';



export const logout = () => {

    return { type: LOGOUT };

}


export const signup = (email: string, password: string) => {
    return async (dispatch: any, getState: any) => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAPTLaF0KGLXOynOb8kY_sFUCH7KdqFtgI', {
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

        console.log(getState)

        if (!response.ok) {
            console.log(response)

            //There was a problem..
            alert("Neiin....")
            console.log("Der er en fejl i user.actions.ts")
        } else {
            const data: FirebaseSignupSucces = await response.json(); // json to javascript
            console.log("data from server: " + data);
            
            localStorage.setItem("token", data.idToken.toString())

            const user = new User(data.localId, data.email, "", "", "")

            dispatch({ type: SIGNUP, payload: {user, idToken: data.idToken } })
        }
    };
};


export const signin = (email: string, password: string) => {
    return async (dispatch: any, getState: any) => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAPTLaF0KGLXOynOb8kY_sFUCH7KdqFtgI', {
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

        console.log(getState)

        if (!response.ok){
            console.log(response)
            //Problems..
            alert("No............")
            console.log("user actions fejl")
        }
        else {
            const data = await response.json()
            console.log("data from server - local id: " + data.localId + ", id token: " + data.idToken)
            
            const user = new User(data.localId, data.email, "", "", "")
            
            dispatch({ type: SIGNIN, payload: {user, idToken: data.idToken} })

        }
    };
}; 
