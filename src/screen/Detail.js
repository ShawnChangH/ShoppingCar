import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Rating, AirbnbRating } from 'react-native-ratings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity, TextInput, Pressable, Alert, ScrollView, Image } from 'react-native';
import { color, cos } from 'react-native-reanimated';
import { ToastProvider, useToast } from 'react-native-toast-notifications'

const baseUrl = 'https://fakestoreapi.com/products/';
const cloneDeep = require('clone-deep');

export default function Detail({ route, navigation }) {
    const toast = useToast();
    const [detailData, setDetailData] = useState(null)
    const [isHeart, setIsHeart] = useState(false)
    const [buyThis,setBuyThis] = useState(false)
    //redux
    const loveList = useSelector((state) => state.box.loveList)
    const shoppingList = useSelector((state) => state.box.shoppingList)
    const dispatch = useDispatch(); //�eAction
    const setLoveList = (value) => dispatch.box.setLoveList(value);
    const setBuyList = (value) => dispatch.box.setShoppingList(value);
    console.log("loveList===",loveList)
    console.log("setBuyList===", setBuyList)

    //�i�J�I
    useEffect(() => {
        (async () => {
            getProductDetail()          
        })();
    }, []);

    useEffect(() => {
        (async () => {        
            getHeart()
        })();
    }, [detailData]);

    //�P�_�R��
    const getHeart = () => {
        //get Heart 
        const result = loveList.filter(value => value == detailData?.id)
        if (result.length>0) { setIsHeart(true) }
        else { setIsHeart(false) }
    }
    //�s�W�ʪ��u������
    const addToCart = () => {
        //1.���oShoppinglist[]
        const newShoppingList = cloneDeep(shoppingList)
        //2.�P�_�O�_���P�˪�id�A��count+1
        const shopIndex = shoppingList.findIndex((value) => value.id == detailData.id)
        if (shopIndex < 0) {           
            newShoppingList.push(
                {
                    id: detailData.id,
                    cont: 1
                }
            )
            setBuyList(newShoppingList)
            console.log('newShoppingList==', newShoppingList)

        //�S�� �s�� id & count+1
        } else {
            newShoppingList[shopIndex].cont += 1
            setBuyList(newShoppingList)
            console.log('newShoppingList==', newShoppingList)
        }
        console.log('shopIndex', shopIndex)

        //�u�������s�W���\
        toast.show("Succcess", {
            type: "normal",
            placement: "top",
            duration: 2000,
        });
    }
    //getProductDetail��k ����X��data��JdetailData
    const getProductDetail = () => {
        //get new URL
        axios.get(baseUrl+route.params.ID)
            .then((response) => {
                console.log('response:', response);
                setDetailData(response.data);
            })
            .catch((error) => {
                console.log('error:' + error);
           });
    }
    
    const changImage = () => {
        if (detailData == null) return;
        if (isHeart) {
            //��������
            console.log('detailData.id ==', detailData.id)
            console.log('loveList==', loveList)
            const newloveList = loveList.filter((value) => value != detailData.id )
            console.log('newloveList==',newloveList)
            setLoveList(newloveList)
        } else{
            //�[�J����         
            loveList.push(detailData.id)         
            console.log('love:',loveList)
            setLoveList(loveList)
        }
        setIsHeart(!isHeart)
    }

    return (
        /*���b �p�GdatailData�Onull�|�Y�� �ҥH�p�G���Onull�~�|�L�XText����k �n�g�b{ }�̭�*/
        <SafeAreaView style={styles.container}>          
            {detailData !== null &&
                /*�P�_�O�̭��[�W <> </> ����O�� <View></View> �]�_��*/
                <ScrollView>
                    <View style={{ height: 200, marginTop: 20, marginHorizontal: 20}}>
                        <Image style={{ height: '100%', width: '100%', resizeMode: 'repeat' }} source={{
                            uri: detailData.image,}}>
                        </Image>
                    </View>
                    <View style={{ flexDirection: 'row', marginHorizontal: 20 }}>
                         <View style={{ flex: 1 }}>
                        <Text style={styles.titleText}>{detailData.category}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end', alignSelf: 'center', marginTop:20}}>
                        <Text style={styles.pricesText}>{detailData.price}</Text>
                        <Pressable onPress={changImage} style={{}}>
                        <Image
                                style={styles.tinyLogo}
                                /*�T���P�_��  ��l���L�� ? true���ɭ԰����Ʊ� : false���ɭ԰����Ʊ�  */
                                source={isHeart ? require('../assets/image/heart_btn.png') : require('../assets/image/heart_empt_btn.png')}
                        />
                        </Pressable>
                         </View>
                </View>
                    <View style={{ marginLeft: 20, marginRight: 20, marginTop:20 }}>
                         <Text style={styles.pricesText}>
                            {detailData.description}
                    </Text>
                    
                </View>
                <View style={{ flexDirection: 'row', marginTop: 20, marginLeft:20 }}>
                    <Text style={styles.pricesText}> count : {detailData.rating.count} </Text>
                    <Text style={styles.pricesText}> rate : {detailData.rating.rate } </Text>
                </View>
                <View style={{ marginTop: 40 }} >
                <Rating
                    type='custom'
                    ratingCount={5}
                    imageSize={60}
                    
                    readonly={true}
                    startingValue={detailData.rating.rate}
                    />
                </View>
              
                </ScrollView>
                
            }
            <View style={{
                /*position = �]�w��m  �ݩ�'absolute'�O�����m*/
                position: 'absolute', bottom: 0, width:'100%'
            }}>

                <Pressable onPress={addToCart}
                    style={{ backgroundColor: '#42A6D8', padding: 8, borderRadius: 10, justifyContent: 'flex-end' }}>
                    <Text style={{ marginRight: 12, alignSelf: 'center' }}>BuyThis</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleText: {
        fontSize: 20,
        marginTop: 16,
        color: '#076DCB',
    },
    pricesText: {
        fontSize: 20,
        color: '#000000',
    },
    tinyLogo: {
        width: 22,
        height: 22,
        marginLeft: 8,

    },

});