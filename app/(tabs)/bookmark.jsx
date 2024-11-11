import { View, Text, SafeAreaView, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '@/context/GlobalProvider';
import { useRoute } from '@react-navigation/native';
import VideoCard from '../../components/VideoCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAppwrite from '../../lib/useAppwrite';
import { getAllPosts } from '../../lib/appwrite';





const bookmark = () => {
  const {data: posts, refetch} = useAppwrite(getAllPosts);
  // const { bookMarkedVideo } = useGlobalContext();
  // const {params: video} = useRoute()

  const [video, setVideo] = useState({})
  // console.log("🚀 ~ bookmark ~ video:", video)
  // const allFav = []


  const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };
  const removeData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.removeItem(key);
    } catch (err) {
      // error reading value
      console.log("Remove Err", err.message)
    }
  };

  useEffect(()=> {
    async function favs() {
      const resp = await getData('fav')
      console.log("🚀 ~ favs ~ resp//////:  ", resp)
      setVideo(resp)
    }
    favs()
  }, [])



  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
       data = {[video]}
       keyExtractor={(item) => item.creator.$id}
       renderItem={({item}) => 
         <VideoCard video={item }/>
      }
      listHeaderComponent={()=> (
        <View className="my-6 px-4 space-y-6">
          <View>
             <Text className="font-pmedium text-sm text-gray text-white">
                 My Bookmark
             </Text>
          </View>
        </View>
      )}
     
      />
      
    </SafeAreaView>
  )
}

export default bookmark