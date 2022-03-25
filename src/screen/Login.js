import * as React from 'react';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity, TextInput, Pressable, Alert } from 'react-native';



export default function App({ navigation }) {
    const [text, setText] = React.useState('')
    const [passwordtext, setPasswordtext] = React.useState('')
    const [checkboxState, setCheckboxState] = React.useState(false);
    //const dispatch = useDispatch(); //°eAction
    //const username = useSelector((state) => state.user.username);
   // const phoneN = useSelector((state) => state.user.phoneNumb);
   //dispatch({ type: "EDIT_USERNAME", payload: 'Shawn' })
    //dispatch({ type: "EDIT_PHONENUMBER", payload: '092100000' })
    //console.log("NAME", username)
   //console.log("phoneN", phoneN)



    React.useEffect(() => {
        (async () => {
            try {
                const value = await AsyncStorage.getItem('Account')
                if (value !== null) {
                    console.log(value)
                    setCheckboxState(true)
                    setText(value)
                    console.log('checkboxState', checkboxState)
                }
            } catch (e) {
                // error reading value
            }
        })();
    }, []);

    const handleLogin = async () => {

        if (text == "1234" & passwordtext == "1234") {
            if (checkboxState) {
                try {
                    await AsyncStorage.setItem('Account', text)
                } catch (e) { }
            } else {
                try {
                    await AsyncStorage.removeItem('Account')
                } catch (e) {}
            }
            navigation.navigate('TabHome', {
                screen: 'Tab01',
                params: {
                    user: text,
                    pswd: passwordtext
                },
            })
        } else {
            Alert.alert("TestTest")
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1 }}>
               
                <View style={{ flexDirection: 'row', marginTop: 50, marginHorizontal: 20 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ marginRight: 12, alignSelf: 'center', padding:12 }}>Account</Text>
                    </View>
                    <View style={{ flex:2 }}>
                        <TextInput style={styles.textInputStyles} placeholder='.....' value={text} onChangeText={setText}></TextInput>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 30, marginHorizontal: 15, }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ marginRight: 12, alignSelf: 'center', padding: 12 }}>Password</Text>
                    </View>
                    <View style={{ flex: 2 }}>
                        <TextInput style={styles.textInputStyles} placeholder="......" value={passwordtext} onChangeText={setPasswordtext}></TextInput>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 30, marginHorizontal: 15, marginLeft:140 }}>
                <BouncyCheckbox
                    size={25}
                    fillColor="#000"
                    unfillColor="#FFFFFF"
                    text="Rember Account"
                    isChecked={checkboxState}
                    disableBuiltInState={true}
                    iconStyle={{
                        borderRadius: 0, // to make it a little round increase the value accordingly
                    }}
                    textStyle={{ fontFamily: "JosefinSans-Regular", textDecorationLine: "none"}}
                        onPress={() => setCheckboxState(!checkboxState)}
                    />
                </View>
                <View style={{ flexDirection: 'row', marginTop: 15, marginHorizontal: 15, marginLeft: 125 }}>
                    <Pressable onPress={handleLogin} style={{  marginHorizontal: 32, padding: 8, borderRadius: 10, justifyContent: 'flex-end' }}>
                        <Text style={{ marginRight: 12, alignSelf: 'center', fontSize: 25, color: '#42A6D8' }}>Login</Text>
                    </Pressable>
                </View>
            </View>           
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
    textInputStyles: {
        borderWidth: 1,
        borderColor: '#000000',
        padding: 12,
        flex: 1,
        borderRadius: 10
    },
});