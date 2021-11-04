//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import Loading from './loading';
import { Ionicons } from '@expo/vector-icons';

// create a component




const Weather = () => {

    const [loading, setLoading] = useState(true)
    const [currentWeather, setCurrentWeather] = useState()
    const api_key = "063d4f97f5ee11764d23a46d02e7926d"


    const fetchData = () => {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=Cape Town&appid=" + api_key)
            .then((response) => response.json())
            .then((data) => {
                console.log(data.weather[0].icon)
                setCurrentWeather(data)
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => setLoading(false))

    }

    useEffect(() => {
        setLoading(true)
        fetchData()
    }, [])




    return (

        <View style={styles.container}>

            {loading ? <Loading></Loading>
                :
                <div>
                    <View style={{ display: 'flex', flexDirection: 'row', alignContent:'center', justifyContent: 'center', marginBottom: 100 }}>
                        <Ionicons name="location-outline" size={32} color="#E42434" />
                        <Text style={{ color: 'white', fontSize: 30 }}> {currentWeather.name} </Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems:'center', justifyContent:'space-evenly'  }}>
                        <Text style={{ color: 'white', fontSize: 20 }}>Today </Text>

                        <View style={{flexDirection:'column'}}>

                            <Text style={{ color: 'grey', fontSize: 18 }}> {new Date().toDateString()} </Text>
                            <Text style={{ color: 'grey', fontSize: 18 }}> {currentWeather.weather[0].description} </Text>

                        </View>

                    </View>

                    <View style={{ display: 'flex', flexDirection: 'row',alignItems:'center', justifyContent:'space-evenly'  }}>
                        <Image style={{ width: "200px", height: "200px", }} source={{ uri: "http://openweathermap.org/img/wn/" + currentWeather.weather?.[0].icon + "@2x.png " }} />
                        <Text style={{ color: 'white', fontSize: 30, }} >
                            {(currentWeather.main.temp - 273.15).toFixed(2)}
                            <span style={{ color: '#E42434' }}>c</span>
                        </Text>
                    </View>

                </div>
            }
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#142C54',
        width: 400,
        height: 150,
        display: 'flex',
    },
    image:{
        flex:1, 
        resizeMode:"cover", 
        justifyContent:"center"
      }
});

//make this component available to the app
export default Weather;
