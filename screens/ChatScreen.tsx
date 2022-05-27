import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Button, FlatList, ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { Chatroom, Status } from '../entities/Chatroom';
import { addChatroom, editChatroom, fetchChatrooms, fetchOneChatroom, removeChatroom } from '../store/actions/chat.actions';
import { StackParamList } from "../typings/navigations";


type ScreenNavigationType = NativeStackNavigationProp<
    StackParamList,
    "Chatrooms"
>

export default function ChatScreen() {

    
    const store = useStore()
    store.dispatch

    const navigation = useNavigation<ScreenNavigationType>()
    const [title, onCreateTitle] = React.useState('');
    const [editTitle, onChangeTitle] = React.useState('')

     // subscribe to redux store 
    const chatrooms: Chatroom[] = useSelector((state: any) => state.chat.chatrooms)
    const [showEdit, setShowEdit]: any = React.useState(false) 
    const [editChat, setEditChat]: any = React.useState()
    

    const dispatch = useDispatch()

    useEffect(() => { //only runs dispatch the first time the component renders
      dispatch(fetchChatrooms())  
    }, [])
    

    let date: any = new Date();
    date = date.toISOString().split('T');

    const shortDate = date[0];



    const handleAddChatroom = () => {
        const chatroom: Chatroom = new Chatroom(title, Status.UNREAD, [], shortDate, "");

        if(chatroom.title.length === 0){
            alert("Error! Chatroom name cannot be empty.")
            console.log("tomt chatroom navn")
           
            return; 
        }

        dispatch(addChatroom(chatroom));
    }


    const handleRemoveChatroom = (chatroom: Chatroom) => {
        console.log("Screen 1, chatroom: " + chatroom.id)

        dispatch(removeChatroom(chatroom))
    }



    const openEdit = (item: any) => {
       setShowEdit(true)
       setEditChat(item)
    }

    const handleEditChat = (e: any) => {
        let copycat = {...editChat}
        copycat.title = editTitle

        setShowEdit(false)
        onChangeTitle('') //nulstil text
        dispatch(editChatroom(copycat))
    }


    const renderChatroom = ({ item }: { item: any }) => {
        
         return ( <>
            <View style={body_area_style.chatroom} nativeID="oneChatView">

            <Text style={body_area_style.text}>{item.title}</Text>
            <View style={body_area_style.buttons}>
                <Button color={"#03a"} title="Enter" onPress={
                    function chatNavigation() {
                        fetchOneChatroom(item, dispatch)
                        console.log(item)
                        navigation.navigate("ChatroomMessageScreen")}
                    } />
                <Button color={"orange"} title={"Edit Room"} onPress={()=> openEdit(item)}/>    
                <Button title="remove" onPress={() => handleRemoveChatroom(item)} color="#933" />
            </View>
            
            </View>
               </> )
            };
    

    return (
        
        <View style={styles.background}>
        <ImageBackground source={require("../images/darkbg.jpg")} style={styles.background} resizeMode='cover'>

        <View style={styles.container}>
                <View style={top_page.style}>
                {/*    <Button title="Sort chatrooms" onPress={() => "sortér"} /> */}
                    <Text style={body_area_style.arrow}>Drag down for more chatrooms ⬇</Text>
                </View>

            {showEdit ? (
            <View>

                <Text style={body_area_style.text_two}>{editChat.title}</Text>
                <View style={body_area_style.form_text}>
                    
                    <TextInput 
                    onChangeText={onChangeTitle}
                    value={editTitle}
                    placeholder={"New name"}
                    maxLength={15}
                    textContentType={"name"}/>
                 
                    <Button title='submit' onPress={()=> handleEditChat(editChat)}></Button> 
 
                {/*    <Button title="remove" onPress={() => handleRemoveChatroom(editChat)} color="#933" />   */}
 
                </View>
            </View>
                
            ) : (
                <FlatList 
                    numColumns={3}
                    data={chatrooms} style={body_area_style.flatlist}
                    renderItem={renderChatroom}
                />
                )}

                <TextInput style={text_area_style.textinput}
                    onChangeText={onCreateTitle}
                    value={title}
                    placeholder="Chatroom name"
                    maxLength={15}
                    textContentType={"name"}
                />

                <View style={text_area_style.btn}>
                <Button color={"#90a"} title="Create chatroom" onPress={handleAddChatroom} />
                </View>

        </View>
        </ImageBackground>
        </View>
        )
    }


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#353535',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'solid darkgrey 1px',
    },
    background: {
        height: "100%",
        width: "100%"
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
        textAlign: 'center',
        height: "50%",
        width:"fit-content",
        position: 'absolute',   
        marginTop: '2%'
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
    buttons_two: {
        flex: 1,
        flexDirection: 'row'
    },
    btn_one: {
        flex: 1,
        flexDirection: "row"
    },
    form_text:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: "20vh",
        backgroundColor: "#ccc",
        color: "#05f"
    },
    text: {
        backgroundColor: "#222",
        color: "magenta",
        fontFamily: "Times New Roman",
        fontWeight: "bold"
    },
    text_two: {
        backgroundColor: "#222",
        color: "yellow",
        fontFamily: "Times New Roman",
        fontWeight: "bold"
    },
    arrow: {
        color: "lime",
        marginVertical: "11vh",
        fontStyle: "italic",
        fontSize: 15,
        marginTop: "4%"
    }
})

const text_area_style = StyleSheet.create({
    textinput: {
        border: 'solid black 2px',
        backgroundColor: "#ddd",
        marginBottom: '0.5%',
        textAlign: 'center',
    },
    btn: {
        marginBottom: "2%"
    }
})









 //    <>
    //     <View style={elements.styling}>
    //         <Text style={body_style.rooms}>{item.title}</Text>
    //         <Text style={body_style.status}>{item.status}</Text>
    //         </View>
    //     </> 