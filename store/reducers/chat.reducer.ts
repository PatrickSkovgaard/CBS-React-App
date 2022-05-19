import { Chatroom } from "../../entities/Chatroom";
import { ADD_CHATROOM, TOGGLE_HAPPY, FETCH_CHATROOMS, REMOVE_CHATROOM } from "../actions/chat.actions";

interface ReduxState {
    chatrooms: Chatroom[]
    isHappy: boolean
    counter: number
    name: string
}

const initialState: ReduxState = {
    chatrooms: [],
    isHappy: false,
    counter: 0,
    name: "MOWGLI"
}

interface ReduxAction {
    type: string,
    payload?: boolean | number | string | Chatroom
}

const chatReducer = (state: ReduxState = initialState, action: ReduxAction) => {
    switch (action.type) {
        case TOGGLE_HAPPY:

            return { ...state, isHappy: !state.isHappy }


        case ADD_CHATROOM:

        const chatroom = action.payload as Chatroom
            //state.chatrooms.push(chatroom) // mutating state. Not allowed
            return { ...state, chatrooms: [...state.chatrooms, chatroom] }


        case FETCH_CHATROOMS:

            return {...state, chatrooms: action.payload};

        case REMOVE_CHATROOM:
            
        return {...state};

        default:
            return state;
    }
};

export default chatReducer;