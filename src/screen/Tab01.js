import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity, TextInput, Pressable, Alert, ScrollView, Image} from 'react-native';

const baseUrl = 'https://fakestoreapi.com/products';


export default function Tab01({ route, navigation }) {
    const [productListArray, setProductListArray] = useState(null)
    const [searchText, setSearchText] = useState('')
    const [productArray, setProductArray] = useState(null)
    console.log("route:", route)
    console.log("navigation:", navigation)
    useEffect(() => {
        (async () => {

            try {
                const value = await AsyncStorage.getItem('Account')
                if (value !== null) {
                    console.log(value)
                }
            } catch (e) {
                // error reading value
            }

            getProduct()
           
        })();
    }, []);

    const getProduct = () => {
        axios.get(baseUrl)
            .then((response) => {
                console.log('response:', response.data);
                setProductListArray(response.data)
                setProductArray(response.data)
            })
            .catch((error) => {
                console.log('error:' + error);
            });
    }
    
    const searchName = () => {
        let newArray = [];
        console.log('productListArray', productListArray)
        console.log('searchText', searchText)
        if (!Array.isArray(productListArray)) return
        productListArray.map((value,inndex) => {
            const result = value.title.indexOf(searchText)
            console.log('result=', result)
            if (result >= 0) {           
                newArray.push(value)
            }      
        })
        console.log('newArray=', newArray)
        setProductListArray(newArray);
    }

    const handleCanle = () => {

        setSearchText('')
        setProductListArray(productArray)
    }
    const goDetail = (id) => {
        
        navigation.navigate('Detail',{
            ID: id
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: 'row', marginHorizontal: 15, alignItems: 'center', borderWidth: 1, borderColor: '#000000',  }}>
                <Image
                    style={styles.tinyLogo}
                    source={require('../assets/icon/search_btn.png')}
                />
                <TextInput style={{ padding: 10, flex: 1, }} placeholder="請輸入收尋商品...." value={searchText} onChangeText={setSearchText}></TextInput>
                <Pressable onPress={searchName} style={{  }}>
                    <Text style={{ alignSelf: 'center' }}>ok</Text>
                </Pressable>
                <Pressable onPress={handleCanle} style={{ marginRight:8 }}>
                    <Image
                        style={styles.tinyLogo}
                        source={require('../assets/icon/cancel_btn.png')}
                    />
                </Pressable>
            </View>
            <ScrollView>
                {Array.isArray(productListArray) && productListArray.length > 0 && productListArray.map((value, index) => {
                    return (
                        /*TouchableOpacity 跟按鈕一樣 待查*/
                        <TouchableOpacity key={value.id} onPress={()=> goDetail(value.id)}>
                            <View style={{ height: 200, marginTop: 20, marginHorizontal: 20, backgroundColor: 'red' }}>
                                <Image style={{ height: '100%', width: '100%', resizeMode:'repeat' }} source={{
                                    uri: value.image,
                                }}></Image>
                            </View>
                            <View style={{ flexDirection: 'row', marginHorizontal: 20 }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.titleText}>{value.title}</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end'  }}>
                                    <Text style={styles.pricesText}>{value.price}</Text>
                                 </View>
                            </View>
                        </TouchableOpacity>
                        )
                }) }

            </ScrollView>            
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
    titleText: {
        fontSize: 18,
        marginTop: 16,
        color: '#076DCB',
    },
    pricesText: {
        fontSize: 12,
        marginTop: 16,
        color: '#000000',
    },
    tinyLogo: {
        width: 22,
        height: 22,
        marginLeft:8,
    },

    });