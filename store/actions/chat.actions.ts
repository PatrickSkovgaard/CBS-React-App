import { Chatroom } from "../../entities/Chatroom";
export const TOGGLE_HAPPY = 'TOGGLE_HAPPY';
export const ADD_CHATROOM = 'ADD_CHATROOM';
export const FETCH_CHATROOMS = 'FETCH_CHATROOMS';
export const REMOVE_CHATROOM = 'REMOVE_CHATROOM';

export const toggleHappy = () => {
    return { type: TOGGLE_HAPPY };
};

/*
export const removeChatroom = () => {
    return { type: REMOVE_CHATROOM };
}*/

/*export const addChatroom = (chatroom: Chatroom) => {
    return { type: 'ADD_CHATROOM', payload: chatroom }
}*/


export const fetchChatrooms = () => {
    return async (dispatch: any, getState: any) => {

        const token = getState().user.idToken;
        
        const response = await fetch('https://react-cbs-default-rtdb.europe-west1.firebasedatabase.app/chatrooms.json?auth=' + token, {
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
                chatrooms.push(new Chatroom(data[key].title, data[key].status, data[key].message, new Date(data[key].timestamp), key ))
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


    export const removeChatroom = (chatroom: Chatroom) => {

        return async (dispatch: any, getState: any) => {
    
            const token = getState().user.idToken;
            console.log(chatroom + ' i chat actions')
    
            const response = await fetch(`https://react-cbs-default-rtdb.europe-west1.firebasedatabase.app/chatrooms/${chatroom.id}.json`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: token
                })
            });
    
            if (!response.ok) {
                console.log(response)
    
                
            } else {
                const data = await response.json(); // json to javascript
                console.log("vi er i remove chatroom")
               
                dispatch({ type: REMOVE_CHATROOM, payload: chatroom })
            }
        };
    };
