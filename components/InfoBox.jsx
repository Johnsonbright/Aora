import { View, Text } from 'react-native'
import React from 'react'

const InfoBox = ({title, subtitle, containerStyles, titleStyles}) => {
  return (
    <View className={containerStyles}>
      <Text className={`text-white text-center font-psemibold`} >{title}</Text>
    </View>
  )
}

export default InfoBox