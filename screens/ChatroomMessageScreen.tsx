import React, { useEffect } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Chatroom } from '../entities/Chatroom';
import { addMessage, fetchOneChatroom } from '../store/actions/chat.actions';

export default function ChatroomMessageScreen() {

    const [message, setMessage] = React.useState('')
    const chatroom: Chatroom = useSelector((state: any) => state.chat.chatroom)

    console.log(chatroom)

    useEffect(() => {
        fetchOneChatroom(chatroom, dispatch)
    }, [])
   
    const dispatch = useDispatch()

  
    return (
        <View style={styles.page}>
            <View style={styles.container}>
                <Text style={styles.header}>Messages</Text>
            </View>


            <View style={styles.text_area}>
                <Text>Add a message</Text>
                <TextInput style={styles.text_input}
                maxLength={20}
                onChangeText={setMessage}
                value={message}
                />

            <View style={styles.send_btn}>
                <Button title="Send" onPress={() => dispatch(addMessage(message, chatroom))}></Button>
            </View>
            
            </View>

            <View style={styles.messages}>
            <FlatList style={styles.list}
            data={chatroom.message}
            renderItem={function ({item}: {item: string}) { return (
            <View>
                <Text style= {styles.msg}>{item}</Text>
            </View>)}}
            />

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: "#444",
        height: "100%",
        width: "100%"
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        flex:1,
        justifyContent: "center",
        fontSize: 25,
        color: "#dd0"
    },
    text_area: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: "center",
        alignItems: "center",
        textAlign: "center",
        width: "30%",
        backgroundColor: "#bbb",
        flexDirection: "column",
        marginTop: "-15%"
    },
    text_input:{
        backgroundColor: "#fff",
        color: "#bb0"
    },
    send_btn: {
        marginTop: "3%",
        flex: 1,
        justifyContent: 'center',
        width: "25%"
    },
    messages: {
        flex: 1,
        justifyContent: 'center',
        border: "solid #222 1px",
        borderRadius: 10,
        textAlign: "center",
        color: "#fa0",
       
    },
    list: {
        flex: 1,
        border: "dashed #999 1px",
        borderRadius: 20,
        color: "05d",
    },
    msg: {
        flex: 1,
        color: "#0c0"
    }
})  



