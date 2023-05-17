import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

const classes = (props:any) => {
    return (
      <View style={styles.container}>
      <TouchableOpacity onPress={props.onPress} style = {styles.butContainer}>
          <View style = {styles.unitContainer}>
            <Text>
                ID: {props.id}
            </Text>
          </View>

          <View style = {styles.unitContainer}>
            <Text>
                Name: {props.class}
            </Text>
          </View>

          <View style = {styles.unitContainer}>
            <Text>
                Students: {props.soluong}
            </Text>
          </View>
      </TouchableOpacity>
      </View>
    )
};

const styles = StyleSheet.create({
container: {
    flex: 1,
},

butContainer:{
    borderRadius: 5,
    borderWidth: 5,
    width: 100,
    height: 60,
    flexDirection: 'column'
},

unitContainer: {
    marginLeft: 4, 
    marginTop:5,
}
})
export default classes;