import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useEffect, useState } from 'react'
import EmptyState from '../../components/EmptyState'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import { useGlobalContext } from "../../context/GlobalProvider";
import { getUserPosts, signOut } from "../../lib/appwrite";
import { icons } from '@/constants'
import InfoBox from '../../components/InfoBox'
import { router } from "expo-router";


const Profile = () => {
const {user, setUser} = useGlobalContext()

const {data: posts} = useAppwrite(() => getUserPosts(user?.$id));
console.log("🚀 ~ Profile ~ getUserPosts(user?.$id):", getUserPosts(user?.$id))
console.log("🚀 ~ Profile ~ posts:", posts)
console.log("🚀 ~ Profile ~ user?.$id:", user?.$id)

const[allPost, setAllPost] = useState([])
useEffect(()=> {
  if(posts.lenghth) {
   setAllPost(posts)
  }

}, [posts])




const logout = async () => {
 await signOut();
 setUser(null)


 router.replace("/sign-in");
}
 
  return (
   <SafeAreaView className="bg-primary h-full" >
   <FlatList
    data={posts}
    keyExtractor={(item) => item.$id}
    renderItem={({item}) => (
      <VideoCard 
      video={item} />
    )}
     ListHeaderComponent={() => (
      <View className="w-full justify-center items-center mt-6 mb-12 px-4">
          <TouchableOpacity
         className="w-full items-end mb-10"
         onPress={logout}
        >
          <Image
          source={icons.logout}
          resizeMode='contain'
          className="w-6 h-6"
          />
        </TouchableOpacity>
        <View className="w-16 h-16 border border-secondary rounded-lg      justify-center items-center">
           <Image 
            source={{uri: user?.avatar}}
            className="w-[90%] h-[90%] rounded-lg"
            resizeMode='cover'
          /> 
        </View>
        <InfoBox
         title={user?.username}
         containerStyles="mt-5"
         titleStyles="text-lg"
        />

        <View className="mt-5 flex-row">
        <InfoBox
         title={allPost}
         subtitle="Posts"
         containerStyles="mr-10"
         titleStyles="text-xl"
        />
        <InfoBox
         title="1.2k"
         subtitle="Followers"
         titleStyles="text-xl"
        />
        </View>
      </View>
     )}
   ListEmptyComponent={() => (
       <EmptyState 
       title="No Videos Found"
       subtitle="No videos found for this search query"
       />
     )}
   />
   </SafeAreaView>

  )
}

export default Profile