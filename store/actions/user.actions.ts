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
            body: JSON.stringify({ 
                 email: email,
                 password: password,
                returnSecureToken: true
            })
        });

        if (!response.ok) {
            console.log("Der er en fejl i user.actions.ts")
        } 
        else {
            const data: FirebaseSignupSucces = await response.json()
            console.log("data: " + data)
            
            sessionStorage.setItem("token", data.idToken.toString())

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

        if (!response.ok){
            console.log("user actions fejl")
        }
        else {
            const data = await response.json()
            
            const user = new User(data.localId, data.email, "", "", "")
            
            dispatch({ type: SIGNIN, payload: {user, idToken: data.idToken} })
        }
    };
}; 