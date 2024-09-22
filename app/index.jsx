import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Link} from 'expo-router'

const _layout = () => {
  return (
    <View style={styles.container}>
      <Text>_layout</Text>
      <StatusBar style="auto"/>
      <Link href="/profile" style={{color: 'blue'}}>Go to Profile</Link>
    </View>
  )
}

export default _layout

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: 'center',
    justifyContent: 'center'

  }
})