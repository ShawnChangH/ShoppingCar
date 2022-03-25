import React ,{useState}from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Pressable,
  Button,
  TextInput,
  Alert
} from 'react-native';


export default function Singin () {

  return (
    <SafeAreaView >
         <View style={styles.testStyle} >
             <Text style={{fontSize:20,  color:'blue'}}>
                Singin
             </Text>
         </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  testStyle:{
  padding:20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});

