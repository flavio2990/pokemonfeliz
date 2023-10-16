import React from "react"
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native'

export default function BackToTop({scrollToTop}){
    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={scrollToTop}>
                <Text style={styles.buttonText}>Back To Top</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
            position: 'absolute',
            bottom: 20,
            right: 20,
            backgroundColor: 'blue',
            borderRadius: 5,
            padding: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
})