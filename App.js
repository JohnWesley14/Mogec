import { View, Text, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import React, { useState } from "react";
import { firebase } from '@react-native-firebase/database'
import database from '@react-native-firebase/database';
import {  useFonts, Montserrat_600SemiBold, Montserrat_800ExtraBold} from '@expo-google-fonts/montserrat';

export default function InitialHome() {
  const [value, setValue] = useState()
  const [isSensorModeAlert, setIsSensorModeAlert] = useState(false);

  function lerDisp() {
    database()
      .ref("/Sensor_de_Gas/Valor_de_Leitura")
      .on("value", (snapshot) => {
        setValue(snapshot.val());
        setIsSensorModeAlert(value >= 50);
      });
  }
  lerDisp(); 
  //console.log(value);
  
  

  var mensagens = ["Os níveis estão normais", "Alerta de vazamento"];
  //Mensagens para utilizar no texto de aviso.

  var colors = {
    green: "#5FF36E",
    red: "#F35F5F",
  };
  const circleStyle = {
    ...styles.circle,
    borderColor: isSensorModeAlert ? colors.red : colors.green,
  };

  const warnMessageStyle = {
    ...styles.warnMessage,
    borderColor: isSensorModeAlert ? colors.red : colors.green,
  };

  

  if (isSensorModeAlert) {
    styles.circle.borderColor = colors.red;
    styles.warnMessage.borderColor = colors.red;
  } else {
    styles.circle.borderColor = colors.green;
    styles.warnMessage.borderColor = colors.green;
  }
  //Se o sensor detectar perigo, mudar cor para vermelho, senão, alterar para verde.
  let [fontsLoaded] = useFonts({
    Montserrat_600SemiBold,
    Montserrat_800ExtraBold,
  });
  if(!fontsLoaded){
    return null;
  }else{
  
  return (
  <SafeAreaView style = {styles.container}>
    <View style ={styles.cabecalho}>
      <Text style ={styles.texto_cabecalho}>
        mogec
      </Text>
    </View>
     <View style={styles.container}>
      <Text style={styles.header}>Leitura do Sensor</Text>
      <View style={circleStyle}>
        <Text style={styles.valueSensor}>{value}%</Text>
        <Text style={styles.ppm}>ppm</Text>
      </View>
      <View style={warnMessageStyle}>
        <Text style={styles.textWarnMessage}>
          {isSensorModeAlert ? mensagens[1] : mensagens[0]}
        </Text>
      </View>
    </View>
  </SafeAreaView>
   
  );
}
}
const styles = StyleSheet.create({
  cabecalho:{
    width:'100%',
    height:53,
    backgroundColor:'#262323',
    alignItems: 'center',
    justifyContent:'center',
    borderBottomLeftRadius:25,
    borderBottomRightRadius:25,
  },
  texto_cabecalho:{
    color:'#fff',
    fontFamily: 'Montserrat_800ExtraBold'
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 20,
    fontWeight: "700",
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 200,
    borderColor: "green",
    borderWidth: 12,
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  valueSensor: {
    fontWeight: "900",
    fontSize: 22,
  },
  ppm: {
    fontWeight: "900",
    fontSize: 15,
  },
  warnMessage: {
    borderWidth: 2,
    borderColor: "green",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 40,
    marginTop: 50,
  },
  textWarnMessage: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 16,
    fontWeight: "700",
    width: 230,
    textAlign: "center",
  },
});
