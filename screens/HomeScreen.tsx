import React from 'react';
import { Button, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../store/actions/user.actions';

export default function HomeScreen() {

    const dispatch = useDispatch()

    return (
        <View style={styles.container}>
            <ImageBackground source={require("../images/waterdrops.jpg")} style={styles.background}>
                <View style= {styles.button_top}>
                    <Button title='logout' onPress={() => dispatch(logout())} color={"#3c3"}/>
                </View>
                <View style={styles.page}>
                    <Text style={styles.top_text}>Welcome to Chad's Chatrooms!</Text>
                    <Text style={styles.text}>Navigate from the tabs on the bottom.</Text>
                    <Text style={styles.text}>You can also logout in the top right corner of your screen.</Text>
                </View>
            </ImageBackground>
        </View>
    );
}


const styles = StyleSheet.create({
    button_top: {
        width: "9%",
        marginVertical: 15,
        alignSelf: "flex-end"
    },
    container: {
        flex: 1,
        //backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: "100%",
        width: "100%"
    },
    background: {
        height: "100%",
        width: "100%"
    },
    page: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        border: "solid #555 1px",
        borderRadius: 30,
        backgroundColor: "#223",
        opacity: 0.90,
        maxHeight: "40%",
        width: "31%",
        marginLeft: "32%",
        marginTop: "10%",
        textAlign: "center"
    },
    top_text: {
        color: "#1f1",
        fontSize: 20,
        fontFamily: "Times New Roman",
        marginBottom: "10%",
        marginTop: "-12%"
    },
    text: {
        color: "#fe2",
        marginTop: "2%",
        
    }
})

