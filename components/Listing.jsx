import { View, Text } from 'react-native'
import React from 'react'
import {useLocalSearchParams} from 'expo-router'

export default function Listing() {
  const {id} = useLocalSearchParams()
  return (
    <View>
      <Text>Item Details -{id}</Text>
    </View>
  )
}