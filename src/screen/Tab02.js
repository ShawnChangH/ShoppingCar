import * as React from 'react';
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity, TextInput, Pressable } from 'react-native';



export default function Tab02({ navigation }) {
  

    return (
        <SafeAreaView style={styles.container}>
            <Text>02</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});