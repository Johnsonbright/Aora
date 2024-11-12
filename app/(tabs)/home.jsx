import { View, Text, FlatList, Image, RefreshControl, TouchableOpacity, } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import SearchInput from '../../components/SearchInput'

import React, { useState, useEffect } from 'react'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import {getAllPosts, getLatestPosts} from "../../lib/appwrite"
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import {useGlobalContext} from "../../context/GlobalProvider"
import {Link} from "expo-router"
import Listing from '../../components/Listing'
// 


const Home = () => {

  const {user, setUser, setIsLoggedIn} = useGlobalContext()
  const {data: posts, refetch} = useAppwrite(getAllPosts);
  const {data: latestPosts} = useAppwrite(getLatestPosts);

const [refreshing, setRefreshing] = useState(false);
 
const onRefresh = async() => {
  setRefreshing(true);
  await refetch();
  // re call videos- see if any new video appears
  setRefreshing(false);
}

  return (
   <SafeAreaView className="bg-primary h-full" >
   <FlatList
    data={posts}
    keyExtractor={(_, index) => `item ${index}`}
    renderItem={({item}) => (
      
        <VideoCard 
      video={item}
      />
    
     
    )}
     ListHeaderComponent={()=> (
      <View className="my-6 px-4 space-y-6"  >
        <View className="justify-between items-start flex-row mb-6"> 
          <View>
            <Text className="font-pmedium text-sm text-gray text-white" >
              Welcome Back
            </Text>
            <Text className="text-2xl font-psemibold text-white">
              {user?.username}
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
        <SearchInput/>
        <View className="w-full flex-1 pt-5 pb-8">
            <Text className="text-gray-100 text-lg font-pregular mb-3">
              Latest Videos
            </Text>

            <Trending posts ={latestPosts ?? [] }/>
        </View>
      </View>
     )}
     ListEmptyComponent={() => (
       <EmptyState 
       title="No Videos Found"
       subtitle="Be the first one to upload a video"
       />
     )}
     refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
   />
   </SafeAreaView>

  )
}

export default Home