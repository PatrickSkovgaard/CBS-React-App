import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Chatroom, Status } from '../entities/Chatroom';
import { addChatroom, fetchChatrooms, toggleHappy, removeChatroom } from '../store/actions/chat.actions';
import { StackParamList } from "../typings/navigations";
import { Database, getDatabase } from 'firebase/database';
import { db } from '../config/db';

type ScreenNavigationType = NativeStackNavigationProp<
    StackParamList,
    "Screen1"
>

export default function Screen1() {

    const myDB = getDatabase(db);
    console.log("min database??? " + myDB)

    
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
    const renderChatroom = ({ item }: { item: any }) => {
    //    <>
    //     <View style={elements.styling}>
    //         <Text style={body_style.rooms}>{item.title}</Text>
    //         <Text style={body_style.status}>{item.status}</Text>
    //         </View>
    //     </> 
        console.log('SCreeen 1 ' + item)
        sessionStorage.setItem("item", item)
         return ( <>
                    <View style={body_area_style.buttons}>
                        <View style={body_area_style.btn_one}>
                            <Button color={'#555'} title={item.title} onPress={
                                function chatNavigation() {
                                    navigation.navigate("Screen3")}
                                 } />
                        </View>
                        <View>
                            <Button title="remove" onPress={() => dispatch(removeChatroom(item))} />
                        </View>
                        <View style={body_area_style.btn_two}>     
                            <Button title={item.status} onPress={()=> dispatch(toggleHappy())}/>
                        </View>
                    </View>
                </>)
    };


    return (
        <View style={styles.container}>
            {/*<Text>Screen 1</Text> */}
            <View style={top_page.style}>
                <Button title="Go to screen 2" onPress={() => navigation.navigate("Screen2")} />
                <Text>{isHappy.toString()}</Text>
               { /* <Button title="Toggle happy" onPress={() => dispatch(toggleHappy())} /> */}
                <Text>Chatrooms</Text>
            </View>

            <FlatList
                data={chatrooms} style={body_area_style.flatlist}
                //renderItem={renderChatroom} style={body_area_style.flatlist}
                renderItem={renderChatroom}
                //handleRemoveChatroom skal slette, ikke tilføje!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                //når man har et id (f.eks i Chatroom) så bliver det brugt automatisk
            />
                
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
        backgroundColor: '#555',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'solid darkgrey 1px',
        
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
        border: 'solid green 1.5px',
        textAlign: 'center',
        height: '50%',
        width: '20%',
        position: 'absolute',
        marginTop: '5px',
        marginBottom: '5px'
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btn_one: {
        width: '50%',
        
    },
    btn_two: {
        
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
        marginBottom: '5px',
        textAlign: 'center',
    }
})