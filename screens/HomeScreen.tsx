import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
        </View>
    );
}

//TODO: DEN SKAL IKKE FEJLE MED AT HENTE CHATROOMS HVIS MAN HAR VÆRET INDE PÅ CHAT SIDEN FØR LOGIN/SIGNUP
//TODO: SKAL DEN VISE ANDRE BRUGERES CHATROOM?

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

