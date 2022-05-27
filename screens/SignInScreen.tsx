import React from 'react';
import { Button, ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { signin } from '../store/actions/user.actions';


export default function SignInScreen(){

        const [email, onChangeEmail] = React.useState('');
        const [password, onChangePassword] = React.useState('');

        const dispatch = useDispatch();

        
        const handleSignIn = ()=>{
            dispatch(signin(email, password))
        }

        return (
            <View style = {styles.container}>
                
                <ImageBackground source={require("../images/bg2.png")} style={styles.background}>
                    <Text>Sign In</Text>
                        
                    <View style={styles.input_fields}>

                        <Text style={styles.text}>Chad's Chatrooms</Text>    
                        
                        <TextInput style = {styles.input}
                            onChangeText = {onChangeEmail}
                            value={email}
                            placeholder="Email"
                        />
                        <TextInput style = {styles.input}
                            onChangeText={onChangePassword}
                            value={password}
                            placeholder="Password"
                            secureTextEntry
                        />
                    
                        <Button title="Sign In" onPress={handleSignIn} color={"#ab1"}/>
                    
                    </View>
                </ImageBackground>
            </View>
            
        )
    }


const styles = StyleSheet.create({
    container: {
        flex: 1,
       // backgroundColor: '#aaa',
        justifyContent: 'center',
        alignItems: 'center',
        height: "100%", 
        width: "100%"
    },
    text: {
        marginTop: "-30%",
        marginBottom: "20%",
        fontSize: 25,
        fontFamily: "Gothic",
        color: "snow"
    },
    input: {
        marginTop: '5px',
        marginBottom: "3%",
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        border: 'solid #333 1px',
        opacity: 1,
        backgroundColor: "#fff"
    },
    input_fields: {
        flex: 1,
        justifyContent: "center", 
        alignItems: "center",
        border: "solid #555 1px",
        borderRadius: 30,
        backgroundColor: "#63c",
        opacity: 0.92,
        maxHeight: "70%",
        width: "35%",
        marginLeft: "28%",
        marginTop: "6%"
    },
    background: {
        height: "100%",
        width: "100%"
    }
})