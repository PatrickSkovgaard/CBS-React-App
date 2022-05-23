import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { Chatroom, Status } from '../entities/Chatroom';
import { addChatroom, fetchChatrooms, removeChatroom, toggleHappy } from '../store/actions/chat.actions';
import { StackParamList } from "../typings/navigations";

type ScreenNavigationType = NativeStackNavigationProp<
    StackParamList,
    "Screen1"
>

export default function ChatScreen() {

    // const myDB = getDatabase(db, db.options.databaseURL);
    // console.log("min database??? " + JSON.stringify(myDB))
    // console.log("db type??? " + myDB.type)
    
    const store = useStore()
    store.dispatch

    const navigation = useNavigation<ScreenNavigationType>()
    const [title, onChangeTitle] = React.useState('');

    const isHappy = useSelector((state: any) => state.chat.isHappy) // subscribe to redux store and select attribute (isHappy)
    const chatrooms: Chatroom[] = useSelector((state: any) => state.chat.chatrooms)
    
    const dispatch = useDispatch()

    useEffect(() => { //only runs dispatch the first time the component renders
      dispatch(fetchChatrooms())  
    }, [])
    

    let date: any = new Date();
    date = date.toISOString().split('T');

    const shortDate = date[0];



    const handleAddChatroom = () => {
        const chatroom: Chatroom = new Chatroom(title, Status.UNREAD, '', shortDate);
        sessionStorage.setItem("dato", shortDate);

        dispatch(addChatroom(chatroom));
    }


    const handleRemoveChatroom = (chatroom: Chatroom) => {
        console.log("Screen 1, chatroom: " + chatroom.id)

        dispatch(removeChatroom(chatroom))
    }


    const renderChatroom = ({ item }: { item: any }) => {
        
         return ( <>
                    <View style={body_area_style.chatroom}>
                            <Text style={body_area_style.text}>{item.title}</Text>
                        <View style={body_area_style.buttons}>
                                <Button color={"#00a"} title="Enter" onPress={
                                    function chatNavigation() {
                                        navigation.navigate("Screen3")}
                                    } />
                                <Button color={"#990"} title={item.status} onPress={()=> dispatch(toggleHappy())}/>    
                                <Button title="remove" onPress={() => handleRemoveChatroom(item)} color="#d33" />
                        </View>
                    </View>
                </>)
    };

    
    return (
        <View style={styles.container}>
            <View style={top_page.style}>
                <Button title="Go to screen 2" onPress={() => navigation.navigate("Screen2")} />
                <Text>{isHappy.toString()}</Text>
                <Text>Chatrooms</Text>
            </View>
            <FlatList
                data={chatrooms} style={body_area_style.flatlist}
                renderItem={renderChatroom}
            />            
             <Text style={body_area_style.arrow}>Drag down for more chatrooms ⬇</Text>

            <TextInput style={text_area_style.textinput}
                onChangeText={onChangeTitle}
                value={title}
                placeholder="Chatroom name"
            />
            <Button title="Create chatroom" onPress={handleAddChatroom} />
        </View>
        );
    }




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#444',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'solid darkgrey 1px'
    }
})

const top_page = StyleSheet.create({
    style: {
        flex: 1,
        marginTop: '3px'
    }
})

const body_area_style = StyleSheet.create({
    flatlist: {
        flex: 1,
       // border: 'solid green 1.5px',
        textAlign: 'center',
       // height: 'fit',
        maxHeight: "50%",
        width:"fit-content",
       // minWidth: "fit",
        position: 'absolute',
       // marginTop: '5px',
       // marginBottom: '5px',
    },
    chatroom: {
        marginBottom: "1vh",
        border: "double #fff 3px"
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: "#222"
    },
    btn_one: {
        //width: '40%',
        flex: 1,
        flexDirection: "row"
    },
    btn_two: {
        
    },
    text: {
        backgroundColor: "#222",
        color: "magenta",
        fontFamily: "Times New Roman",
        fontWeight: "bold"
    },
    arrow: {
        color: "lime",
        marginVertical: "11vh",
        fontStyle: "italic",
        font: "25px"

    }
})

const body_style = StyleSheet.create({
    rooms: {
        flex: 1,
        border: 'dotted #555 0.5px',
        marginRight: '1px'
    },
    status: {
        marginLeft: '2px',
        backgroundColor: '#558'
    }
})

const elements = StyleSheet.create({
    styling: {
        flex: 1,
        flexDirection: 'row',
        //width: 'fit-content'
    }
})

const text_area_style = StyleSheet.create({
    textinput: {
        border: 'solid black 2px',
        //marginBottom: '5px',
        textAlign: 'center',
    }
})







 //    <>
    //     <View style={elements.styling}>
    //         <Text style={body_style.rooms}>{item.title}</Text>
    //         <Text style={body_style.status}>{item.status}</Text>
    //         </View>
    //     </> 