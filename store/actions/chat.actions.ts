import { async } from "@firebase/util";
import { Chatroom } from "../../entities/Chatroom";

export const TOGGLE_HAPPY = 'TOGGLE_HAPPY';
export const ADD_CHATROOM = 'ADD_CHATROOM';
export const FETCH_CHATROOMS = 'FETCH_CHATROOMS';
export const REMOVE_CHATROOM = 'REMOVE_CHATROOM';
export const FETCH_ONE_ROOM = 'FETCH_ONE_ROOM';
export const EDIT_CHATROOM = 'EDIT_CHATROOM';
export const ADD_MESSAGE = 'ADD_MESSAGE'
 

export const toggleHappy = () => {
    return { type: TOGGLE_HAPPY };
};

const urlWithAuth = 'https://react-cbs-default-rtdb.europe-west1.firebasedatabase.app/chatrooms.json?auth='
let counter = 0

export const fetchOneChatroom = (chatroom: Chatroom, dispatch: any) => {
    
            console.log("CCCCCCCCCCCCC", chatroom);
            

            dispatch({type: 'FETCH_ONE_ROOM', payload: chatroom})
        
            


            //Hvis der allerede kun vises ét chatroom, så henter jeg alle chatrooms ned igen, via fetchChatrooms()
     /*   const token = getState().user.idToken

        const response = await fetch(urlWithAuth + token, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if(!response.ok){
            console.log('fetch chatrooms problem..')
        }

        else{
            const data = await response.json();
            let chatrooms: Chatroom[] = []
            
            for(const key in data){
                chatrooms.push(new Chatroom(data[key].title, data[key].status, data[key].message,
                               new Date(data[key].timestamp), key ))
            }


        counter++
        dispatch({type: 'FETCH_CHATROOMS', payload: chatrooms})
        }*/
    }



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
                 title: chatroom.title,
                 id: chatroom.id,
                 status: chatroom.status,
                 timestamp: chatroom.timestamp 
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
            console.log("chatroom id er nu: " + chatroom.id)
           
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


export const editChatroom = (chatroom: Chatroom) => {
    return async(dispatch: any, getState: any) => {
        
        
        //console.log(chatroom)
        
        const response = await fetch(`https://react-cbs-default-rtdb.europe-west1.firebasedatabase.app/chatrooms/${chatroom.id}.json`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ...chatroom,
 //           chatroom: chatroom,
            
            chatroom: Chatroom
        })
    })

        if(!response.ok){
            console.log("edit chatroom problemer")
        }
        else{
            const data = await response.json()

            dispatch(fetchChatrooms())

            console.log({data})
            

            dispatch({type: EDIT_CHATROOM, payload:  chatroom})

        }   
    }
}


export const addMessage = (msg: string, chatroom: Chatroom) => {
    return async (dispatch: any) => {


    if(chatroom.message === undefined){
        chatroom.message = []
    }    
    
    chatroom.message.push(msg)

    const response = await fetch(`https://react-cbs-default-rtdb.europe-west1.firebasedatabase.app/chatrooms/${chatroom.id}.json`, {

        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: chatroom.title,
            status: chatroom.status,
            timestamp: chatroom.timestamp,
            id: chatroom.id,
            message: chatroom.message
        })
    })

    const data = await response.json()

    console.log(data)

    dispatch({ type: ADD_MESSAGE, payload: [chatroom]})


    fetchOneChatroom(chatroom, dispatch)
    }
}
