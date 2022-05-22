import { User } from "../../entities/User";
import { SIGNUP, SIGNIN, LOGOUT } from "../actions/user.actions";

interface ReduxState {
    loggedInUser: User | null,
    idToken: string | undefined
}

const initialState: ReduxState = {
    loggedInUser: null,
    idToken: undefined
}


const userReducer = (state: ReduxState = initialState, action: any) => {
    switch (action.type) {

        case LOGOUT:    
            console.log("Logging out!")
            return { ...state, loggedInUser: null, idToken: undefined }
       
        case SIGNUP:
            console.log("signed up")
            return {...state, loggedInUser: action.payload.user, idToken: action.payload.idToken};

        case SIGNIN:
            console.log("SIGNIN i reducer");
            
            return {...state, 
                loggedInUser: action.payload.user, email: action.payload.email, 
                localId: action.payload.localId, idToken: action.payload.idToken};

        default:
                console.log("Returner default state...........")
                return state;
    }
};

export default userReducer;