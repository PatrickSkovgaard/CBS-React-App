import { Chatroom } from "../../entities/Chatroom";

export const TOGGLE_HAPPY = 'TOGGLE_HAPPY';
export const ADD_CHATROOM = 'ADD_CHATROOM';
export const FETCH_CHATROOMS = 'FETCH_CHATROOMS';
export const REMOVE_CHATROOM = 'REMOVE_CHATROOM';

export const toggleHappy = () => {
    return { type: TOGGLE_HAPPY };
};

const urlWithAuth = 'https://react-cbs-default-rtdb.europe-west1.firebasedatabase.app/chatrooms.json?auth='


export const fetchChatrooms = () => {
    return async (dispatch: any, getState: any) => {

        const token = getState().user.idToken;
        

        const response = await fetch(urlWithAuth + token, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
                },
            }
        )

        if(!response.ok){
            console.log('fetch chatroom problem..')

        }
        else{
            const data = await response.json();
            let chatrooms: Chatroom[] = []
            
            for(const key in data){
                chatrooms.push(new Chatroom(data[key].title, data[key].status, data[key].message,
                               new Date(data[key].timestamp), key ))
            }


            dispatch({ type: 'FETCH_CHATROOMS', payload: chatrooms})
        }   
    }
}


export const addChatroom = (chatroom: Chatroom) => {
    return async (dispatch: any, getState: any) => {

        const token = getState().user.idToken;


        const response = await fetch('https://react-cbs-default-rtdb.europe-west1.firebasedatabase.app/chatrooms.json?auth=' + token, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                ...chatroom, 
                 chatroom: Chatroom,
                returnSecureToken: true
            })
        });

        if (!response.ok) {
            console.log(response)

            //There was a problem..
            alert("FEJL!")
            console.log("Der er en fejl i chat.actions.ts")
        } else {
            const data = await response.json();

            chatroom.id = data.name;
           
            dispatch({ type: ADD_CHATROOM, payload: chatroom })
        }
    };
};



export const removeChatroom = (chatroom: any) => {
    return async (dispatch: any, getState: any) => {

                                                // DEL 1/2 -> fetch DELETE \\
        const res = await fetch(
            `https://react-cbs-default-rtdb.europe-west1.firebasedatabase.app/chatrooms/${chatroom.id}.json`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chatroom: null
            })
        })
        if (!res.ok) {
            console.log("Der er en fejl i chat.actions.ts ved DELETE CHAT")

        } else {
        
//---------------------------------------------------------------------------------------------------------------------------
                                //Dårlig måde at gøre det på, men det virker upåklageligt....
                                                // DEL 2/2 fetch GET \\
                                                
        const token = getState().user.idToken

        const response = await fetch(urlWithAuth + token, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
                },
            }
        )
        if(!response.ok){
            console.log('fetch chatroom problem.. in remove')
        }
        else{
            const data = await response.json();
            let chatrooms: Chatroom[] = []
            
            for(const key in data){
                chatrooms.push(new Chatroom(data[key].title, data[key].status, data[key].message,
                            new Date(data[key].timestamp), key ))
            }
    //---------------------------------------------------------------------------------------------------------------------------

            dispatch({ type: REMOVE_CHATROOM, payload: chatrooms })
            }
        }
    }
}