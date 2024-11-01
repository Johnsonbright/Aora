import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React from 'react'
import { useGlobalContext } from '@/context/GlobalProvider';




const bookmark = ({route}) => {
  const { bookMarkedVideo } = useGlobalContext();
  const {video} = route.params;
  return (
    <SafeAreaView className="bg-primary h-full">
      <Text className="text-white"> bookmark video</Text>
      <FlatList
       data = {video}
       keyExtractor={(item) => item.id}
       renderItem={({item}) => 
        <Text> {item.title}</Text>
      }
      />
    </SafeAreaView>
  )
}

export default bookmark