import { View, Text, FlatList, Image, } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'

import React from 'react'

const Home = () => {
  return (
   <SafeAreaView className="bg-primary h-full" >
   <FlatList
    data={[{id: 1}, {id: 2}, {id: 1}]}
    keyExtractor={(item) => item.$id}
    renderItem={({item}) => (
      <Text className="text-3xl text-white" >{item.id}</Text>
    )}
     ListHeaderComponent={()=> (
      <View className="my-6 px-4 space-y-6"  >
        <View className="justify-between items-start flex-row mb-6"> 
          <View>
            <Text className="font-pmedium text-sm text-gray text-white" >
              Welcome Back
            </Text>
            <Text className="text-2xl font-psemibold text-white">
              Johnson
            </Text>
          </View>
          <View className="mt1=-1.5">
            <Image
             source={images.logoSmall}
             className="w-9 h-10"
             resizeMode='contain'
            />
          </View>
        </View>
        
      </View>
     )}
   />
   </SafeAreaView>
  )
}

export default Home