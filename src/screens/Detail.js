import { StyleSheet, Text, View, Image , FlatList, TouchableOpacity, SafeAreaView} from 'react-native'
import React ,{useEffect }from 'react'
import SQLite from 'react-native-sqlite-storage'

const db = SQLite.openDatabase(
  {
    name: 'MainDb',
    location:'default',
  },
  ()=>{},
  error => { console.log(error) } 
);

const Student = [
  {
    idstudent: 'Student001',
    name: 'Bich Loan',
    avatar: 'https://antimatter.vn/wp-content/uploads/2022/12/hinh-anh-avatar-tiktok.jpg',
    dob: '01/01/2023',
    idclass: 'Class01',
  },
  {
    idstudent: 'Student002',
    name: 'Bich Loan',
    avatar: 'https://antimatter.vn/wp-content/uploads/2022/12/hinh-anh-avatar-tiktok.jpg',
    dob: '01/01/2023',
    idclass: 'class01',
  },
  {
    idstudent: 'Student003',
    name: 'Bich Loan',
    avatar: 'https://antimatter.vn/wp-content/uploads/2022/12/hinh-anh-avatar-tiktok.jpg',
    dob: '01/01/2023',
    idclass: 'class02',
  },
  {
    idstudent: 'Student004',
    name: 'Bich Loan',
    avatar: 'https://antimatter.vn/wp-content/uploads/2022/12/hinh-anh-avatar-tiktok.jpg',
    dob: '01/01/2023',
    idclass: 'class02',
  },
  {
    idstudent: 'Student005',
    name: 'Bich Loan',
    avatar: 'https://antimatter.vn/wp-content/uploads/2022/12/hinh-anh-avatar-tiktok.jpg',
    dob: '01/01/2023',
    idclass: 'class03',
  },
  {
    idstudent: 'Student006',
    name: 'Bich Loan',
    avatar: 'https://antimatter.vn/wp-content/uploads/2022/12/hinh-anh-avatar-tiktok.jpg',
    dob: '01/01/2023',
    idclass: 'class03',
  },
  {
    idstudent: 'Student007',
    name: 'Bich Loan',
    avatar: 'https://antimatter.vn/wp-content/uploads/2022/12/hinh-anh-avatar-tiktok.jpg',
    dob: '01/01/2023',
    idclass: 'class04',
  },
  {
    idstudent: 'Student008',
    name: 'Bich Loan',
    avatar: 'https://antimatter.vn/wp-content/uploads/2022/12/hinh-anh-avatar-tiktok.jpg',
    dob: '01/01/2023',
    idclass: 'class04',
  },
  {
    idstudent: 'Student009',
    name: 'Bich Loan',
    avatar: 'https://antimatter.vn/wp-content/uploads/2022/12/hinh-anh-avatar-tiktok.jpg',
    dob: '01/01/2023',
    idclass: 'class04',
  },
  {
    idstudent: 'Student0010',
    name: 'Bich Loan',
    avatar: 'https://antimatter.vn/wp-content/uploads/2022/12/hinh-anh-avatar-tiktok.jpg',
    dob: '01/01/2023',
    idclass: 'class04',
  },
]
function Details({navigation,route}) {
  const {IdClass, NameClass, StudentClass} = route.params
  const data = new Array();
  useEffect(() =>{       
    setData()
    getData()  
  }, [])

  const getData = () => {
    db.transaction((tx) =>{
      tx.executeSql(
          "SELECT IDStudent, Avatar, Name, Dob FROM Student WHERE IDClass = ? ",
          [IdClass],
          (tx, res) =>{
            const len = res.rows.length
            if (len > 0)
            {              
              for (var i = 0; i < len; i++)
              {
                var Class = {
                  Id: res.rows.item(i).IDStudent,
                  Name: res.rows.item(i).Name,
                  Dob: res.rows.item(i).Dob,
                  Avatar: res.rows.item(i).Avatar
                }
                data.push(Class)                
              }              
            }
          } 
      )
  })
  }

  const setData = async () =>{
    await db.transaction(async (tx)=> {
      await tx.executeSql(
        'INSERT INTO Student (IDStudent, Avatar, Name, Dob, IDClass) VALUES (?,?,?,?,?)' + 
        // Student.map( i =>'(' + i.idstudent + ', ' + i.avatar + ', ' + i.name +',' + i.dob + ',' + i.idclass +')'
        // ).join(','),
        [Student[1].idstudent,Student[1].avatar,Student[1].name,Student[1].dob,Student[1].idclass]
        ,
        (tx, results) => {
          console.log('Results', results.rowsAffected)
        }
      )
    })
  }

  return (
    <SafeAreaView style={{flex:1}}>
      <View style = {{styles.containerView}>
        <TouchableOpacity onPress={() => {setData(), getData()}}>
        <Text>
          Details
        </Text>
        </TouchableOpacity>

        <View style = {styles.productContainer}>
          <View style = {styles.unitContainer}>
            <Text>ID: {IdClass}</Text>
          </View>

          <View style = {styles.unitContainer}>
            <Text>Name: {NameClass}</Text>
          </View>

          <View style = {styles.unitContainer}>
            <Text>Students: {StudentClass}</Text>
          </View>
        </View>

        <View style = {{width: '100%', height: 600, alignItems: 'center'}}>
            <FlatList
                data={data}
                renderItem={({item}) => (
                  <View style = {styles.details}>
                      <Image 
                      source = {{uri: item.Avatar}}
                      style = {styles.imageStyle}
                      />

                      <View style = {{flexDirection: 'row'}}>
                        <View style = {styles.unitContainer}>
                          <Text>ID: {item.Id}</Text>
                        </View>

                        <View style = {styles.unitContainer}>
                          <Text>Name: {item.Name}</Text>
                        </View>

                        <View style = {styles.unitContainer}>
                          <Text>Dob: {item.Dob}</Text>
                        </View>
                      </View>
                  </View>
                )}/>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
containerView: {
  alignItems: 'center'
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
details:{
  borderRadius: 5,
  borderWidth: 1,
  width: 250,
  height: 80,
  flexDirection: 'row',
  marginTop: 10,
  marginLeft: 10
},
unitContainer: {
  marginLeft: 4, 
  marginTop:5,
},
imageStyle:{
  marginLeft: 10,
  marginTop: 10, 
  aspectRatio: 1, 
  borderRadius: 55, 
  width: 25,
},
});

export default Details;