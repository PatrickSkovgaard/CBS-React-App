import { Chatroom, Status } from "../../entities/Chatroom";
import { ADD_CHATROOM, 
        FETCH_CHATROOMS, 
        REMOVE_CHATROOM, 
        FETCH_ONE_ROOM, 
        EDIT_CHATROOM, 
        ADD_MESSAGE } from "../actions/chat.actions";

interface ReduxState {
    chatrooms: Chatroom[]
    chatroom: Chatroom 
    message: string[]
    name: string
}

const initialState: ReduxState = {
    chatrooms: [],
    chatroom: new Chatroom('', Status.UNREAD, [], new Date(), ''),
    message: [],
    name: "MOWGLI"
}

interface ReduxAction {
    type: string,
    payload?: boolean | number | string | Chatroom | []
}



const chatReducer = (state: ReduxState = initialState, action: ReduxAction) => {
    switch (action.type) {

        case ADD_CHATROOM:
            const chatroom = action.payload as Chatroom
            return { ...state, chatrooms: [...state.chatrooms, chatroom] }


        case FETCH_CHATROOMS:
            
            return {...state, chatrooms: action.payload};


        case REMOVE_CHATROOM:
            return {...state, chatrooms: action.payload}; 


        case FETCH_ONE_ROOM:
            console.log(action.payload)
            
            return {...state, chatroom: action.payload}
            
        case EDIT_CHATROOM:
            console.log(action.payload)
            
            return {...state,  chatroom: action.payload}

        case ADD_MESSAGE: 
            console.log(action.payload)
            
            return {...state, chatroom: action.payload}

        default:
            console.log("default state i chat reducer")
            return state;
    }
};

export default chatReducer;