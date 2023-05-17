import { StyleSheet, Text, View, TouchableOpacity , SafeAreaView, FlatList} from 'react-native'
import React, {useEffect, useState } from 'react';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'MainDb',
    location:'default',
  },
  ()=>{},
  error => { console.log(error) } 
);

function Classes({navigation}) {
  const [update, setupdate] = useState(0)
  const data = new Array();
  useEffect(() =>{       
    getData()   
    setData()
  }, [ClassData])

  const getData = () => {
    db.transaction((tx) =>{
      tx.executeSql(
          "SELECT IDClass, NameClass, Student FROM Class",
          [],
          (tx, res) =>{
            const len = res.rows.length
            if (len > 0)
            {              
              for (var i = 0; i < len; i++)
              {
                var Class = {
                  Id: res.rows.item(i).IDClass,
                  Name: res.rows.item(i).NameClass,
                  Students: res.rows.item(i).Student,
                }
                data.push(Class)
             }             
            }
          })
  })
  };

  const setData = async () =>{
    await db.transaction(async (tx)=> {
      await tx.executeSql(
        `INSERT INTO Class (IDClass, NameClass, Student) values` + 
        ClassData.map( i =>`(${i.id}, '${i.name}', '${i.number}')`
        ).join(','),
        (tx, results) => {
          console.log('Results', results.rowsAffected)
        })
    })
  }

  return (
    <SafeAreaView style={{flex:1}}>
      <View style = {styles.containerView}>
        <TouchableOpacity onPress = {()=>{}}>
          <Text style = {styles.textStyle}>
            Classes
          </Text>
        </TouchableOpacity>
      </View>

      <View style = {{width: '100%', height: 600, alignItems: 'center'}}>
            <FlatList
                data={data}
                renderItem={({item}) => (
                  <View>
                  <TouchableOpacity 
                      onPress={() => 
                        {        
                          const IdClass = item.Id
                          const NameClass = item.Name
                          const StudentClass = item.Students
                          navigation.navigate('Details', {IdClass, NameClass, StudentClass})       
                        }}
                      style = {styles.productContainer}>

                      <View style = {styles.unitContainer}>
                        <Text>ID: {item.Id}</Text>
                      </View>

                      <View style = {styles.unitContainer}>
                        <Text>Name: {item.Name}</Text>
                      </View>

                      <View style = {styles.unitContainer}>
                        <Text>Students: {item.Students}</Text>
                      </View>
                      
                  </TouchableOpacity>
                  </View>
                )
              }
      />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
containerView: {
  alignItems: 'center'
},
textStyle: {
  fontWeight: 'bold',
  fontSize: 30,
},
productContainer:{
  borderRadius: 5,
  borderWidth: 1,
  width: 250,
  height: 80,
  flexDirection: 'column',
  marginTop: 10,
  marginLeft: 10
},
unitContainer: {
  marginLeft: 4, 
  marginTop:5,
},

});

const ClassData = [
  {
    id: 'class001',
    name: 'class001',
    number: '50'
  },
  {
    id: 'class002',
    name: 'class002',
    number: '50'
  },
  {
    id: 'class003',
    name: 'class003',
    number: '50'
  },
  {
    id: 'class004',
    name: 'class004',
    number: '50'
  },
  {
    id: 'class005',
    name: 'class005',
    number: '50'
  },
];

export default Classes;