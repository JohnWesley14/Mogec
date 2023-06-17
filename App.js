import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { firebase } from '@react-native-firebase/database'
import database from '@react-native-firebase/database';


const reading_sensor = database()
                      .ref('/Sensor_de_Gas/Valor_de_Leitura')
                      .on('value', snapshot => {
                        console.log('Sensor_de_Gas: ', snapshot.val());
                        var valor = snapshot.val()
                      });


export default function App() {
  return (
    <View style={styles.container}>
      <Text>O
      pp!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
