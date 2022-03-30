import { Chatroom } from "../../entities/Chatroom";

export const TOGGLE_HAPPY = 'TOGGLE_HAPPY';
export const ADD_CHATROOM = 'ADD_CHATROOM';
export const FETCH_CHATROOMS = 'FETCH_CHATROOMS';

export const toggleHappy = () => {
    return { type: TOGGLE_HAPPY };
};

/*export const addChatroom = (chatroom: Chatroom) => {
    return { type: 'ADD_CHATROOM', payload: chatroom }
}*/


export const fetchChatrooms = () => {
    return async (dispatch: any, getState: any) => {
        const token = getState().user.idToken;
console.log("GET STATE ER: " + getState().user.idToken)
        const response = await fetch('https://cbs-server-6fe15-default-rtdb.europe-west1.firebasedatabase.app/chatrooms.json?auth=' + token, {
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
                console.log("KEYEN ER: " + key + " in " + data[key].title)
                chatrooms.push(new Chatroom(data[key].title, data[key].status, data[key].message, new Date(data[key].timestamp), key ))
            }

             chatrooms.forEach(elem => {
                console.log("element i chatroom foreach: ")
                console.log(elem)
            })

            console.log(data)

            dispatch({ type: 'FETCH_CHATROOMS', payload: chatrooms})
        }   
    }
}


export const addChatroom = (chatroom: Chatroom) => {

    return async (dispatch: any, getState: any) => {
        const token = getState().user.idToken;

        console.log("ADD chatroom id token er: " + getState().user.idToken)

        const response = await fetch('https://cbs-server-6fe15-default-rtdb.europe-west1.firebasedatabase.app/chatrooms.json?auth=' + token, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ //javascript to json
                //key value pairs of data you want to send to server
                // ...
                
                ...chatroom, //spread operator, tager alt fra chatroom
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
            const data = await response.json(); // json to javascript

            chatroom.id = data.name;
           
            dispatch({ type: ADD_CHATROOM, payload: chatroom })
        }
    };
};