import { View, Text, SafeAreaView, FlatList} from 'react-native'
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

  const [video, setVideo] = useState()
  // console.log("🚀 ~ bookmark ~ video:", video)
  // const allFav = []



 
  


  useEffect(()=> {
    // async function favs() {
    //   const resp = await getData('fav')
    //   console.log("🚀 ~ favs ~ resp//////:  ", resp?.video)
    //   setVideo(resp?.video)
    // }
   
 
    
  }, [])



  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
       data = {video}
       keyExtractor={(item) => item?.creator?.$id}
       renderItem={({item}) => 
         <VideoCard video={item}/>
      }
      listHeaderComponent={()=> (
        <View className="my-6 px-4 space-y-6">
          <View>
             <Text >
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