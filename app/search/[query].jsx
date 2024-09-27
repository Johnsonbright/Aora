import {useLocalSearchParams} from "expo-router"
import { View, Text, FlatList, Image, RefreshControl, } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '../../components/SearchInput'
import React, { useState, useEffect } from 'react'
import EmptyState from '../../components/EmptyState'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'

const Search = () => {
const {query} = useLocalSearchParams()
const {data: posts, refetch} = useAppwrite(() => searchPosts(query));

console.log(query, posts)

const [refreshing, setRefreshing] = useState(false);
 
useEffect(()=> {
    refetch()
}, [query])
  return (
   <SafeAreaView className="bg-primary h-full" >
   <FlatList
    data={posts}
    keyExtractor={(item) => item.$id}
    renderItem={({item}) => (
      <VideoCard 
      video={item}
      
      />
    )}
     ListHeaderComponent={()=> (
      <View className="my-6 px-4"  >
            <Text className="font-pmedium text-sm text-gray text-white" >
            Search Results
            </Text>

            <Text className="text-2xl font-psemibold text-white">
            { query}
            </Text>


         <View className="mt-6 mb-8">
         <SearchInput initialQuery={query}/>
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

export default Search