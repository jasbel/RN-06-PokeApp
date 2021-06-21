import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

const Loading = () => {
    return (
        <View style={styles.activityWrap}>
            <ActivityIndicator size={50} color='grey' />
            <Text>Cargando...</Text>
        </View>
    )
}

export default Loading

const styles = StyleSheet.create({
    activityWrap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }

})
