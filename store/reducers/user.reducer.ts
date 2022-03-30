import { User } from "../../entities/User";
import { SIGNUP, SIGNIN } from "../actions/user.actions";

interface ReduxState {
    loggedInUser: User,
    idToken: string | undefined
}

const initialState: ReduxState = {
    loggedInUser: {} as User,
    idToken: undefined
}

const userReducer = (state: ReduxState = initialState, action: any) => {
    switch (action.type) {
        case SIGNUP:
            console.log("signed up")
            const user = action.payload.user as User
            console.log(user)
            return {...state, loggedInUser: user, idToken: action.payload.idToken};


        case SIGNIN:
            console.log("SIGNIN i reducer");
            
            return {...state, email: action.payload.email, localId: action.payload.localId, idToken: action.payload.idToken};

            //const user = {email:'abe@abe.com', password:'aber' } as User

        default:
            return state;
    }
};

export default userReducer;