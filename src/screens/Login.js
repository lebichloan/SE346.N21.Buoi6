import { StyleSheet, Text, View, TextInput, SafeAreaView ,TouchableOpacity} from 'react-native'
import React from 'react'
import { useState } from 'react';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
{
    name: 'MainDb',
    location:'default',
  },
  ()=>{},
  error => { console.log(error) } 
);

function Login({navigation}) {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const getData = () =>{
        try{
          db.transaction((tx) =>{
            tx.executeSql(
              "SELECT UserName, Pass FROM Users",
              [],
              (tx,results) =>{
                var len = results.rows.length;
                if(len>0){
                    for(var i =0; i<len;i++){
                    var userName = results.rows.item(i).UserName
                    var userPass = results.rows.item(i).Pass
                    if(userName == user && userPass == password){
                        navigation.navigate('Classes')
                    }
                    }
                }
              }
            )
          })
        } catch (error){
          console.log(error);
        }
      }

  return (
    <SafeAreaView style={styles.container}> 
    <View style = {styles.containerChild}>
      <Text style = {styles.textName}>
        Login
      </Text>

      <TextInput style = {styles.input}
        placeholderTextColor="#003f5c"
        placeholder= "User Name"
        onChangeText = {(user) => setUser(user)}/>

      <TextInput style = {styles.input}
        placeholderTextColor="#003f5c"
        placeholder="Password"
        secureTextEntry={true}
        onChangeText = {(password) => setPassword(password)}/>

      <TouchableOpacity 
        onPress={getData}
        style={styles.loginBtn}>
        <Text style={styles.text}>
          LOGIN
        </Text> 
      </TouchableOpacity>
      </View>
     </SafeAreaView> 
  )
}

const styles = StyleSheet.create({
  container: {
  flex: 1, 
  justifyContent: 'center', 
  alignItems: 'center'
  },
  containerChild: {
    flex: 1,
    backgroundColor: '#DDDDDD',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  image:{
    width: 270,
    height: 270,
    marginBottom: 10,
    borderRadius: 20
  },
  textName:{
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginTop: 5,
  },
  input: {
    width: 200,
    padding: 10,
    height: 40,
    borderWidth: 1,
    marginTop: 5
  },
  loginBtn:
  {
    width:100,
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:30,
    backgroundColor:"#BBBBBB",
  }    
});

export default Login;