import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React from 'react'
import { useGlobalContext } from '@/context/GlobalProvider';
import { useRoute } from '@react-navigation/native';
import VideoCard from '../../components/VideoCard';




const bookmark = () => {
  // const { bookMarkedVideo } = useGlobalContext();
  const {params: video} = useRoute
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
       data = {video}
       keyExtractor={(item) => item.id}
       renderItem={({item}) => 
         <VideoCard video={item}/>
      }
       
      />
      
    </SafeAreaView>
  )
}

export default bookmark