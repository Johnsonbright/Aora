import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '@/context/GlobalProvider';
import { useRoute } from '@react-navigation/native';
import VideoCard from '../../components/VideoCard';
import AsyncStorage from '@react-native-async-storage/async-storage';





const bookmark = ({navigation}) => {
  // const { bookMarkedVideo } = useGlobalContext();
  // const {params: video} = useRoute()

  const [video, setVideo] = useState([])
  // console.log("🚀 ~ bookmark ~ video:", video)
  const allFav = []


  const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };
  const rmoveData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.removeItem(key);
    } catch (e) {
      // error reading value
    }
  };

  useEffect(()=> {
    async function favs() {
      const resp = await getData('my-fav')
      console.log("🚀 ~ favs ~ resp//////:  ", resp)
      setVideo(resp)
    }
    favs()
  }, [navigation])



  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
       data = {[video]}
      //  keyExtractor={(item) => item.video.id}
       renderItem={(item) => 
         <VideoCard video={item.item }/>
      }
       
      />
      
    </SafeAreaView>
  )
}

export default bookmark