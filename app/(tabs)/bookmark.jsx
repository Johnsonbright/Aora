import { View, Text, SafeAreaView, FlatList} from 'react-native'
import React, { useEffect, useState } from 'react'
import VideoCard from '../../components/VideoCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';





const bookmark = () => {
 
  const [bookmarkedVideos, setBookmarkedVideos] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchBookmarks = async () => {
        try {
          const bookmarkedVideoIds = await getBookmarks();
          setBookmarkedVideos(bookmarkedVideoIds);
        } catch (error) {
          console.error('Error fetching bookmarks:', error);
        }
      };
      fetchBookmarks();
    }, [])
  );

  const getBookmarks = async () => {
    try {
      const bookmarks = await AsyncStorage.getItem('bookmarkedVideos');
      return bookmarks ? JSON.parse(bookmarks) : [];
    } catch (error) {
      console.error('Error retrieving bookmarks', error);
      return [];
    }
  };
  
  // const isBookmarked = async (videoId) => {
  //   const bookmarks = await getBookmarks();
  //   return bookmarks.includes(videoId);
  // };
  





  return (
    <SafeAreaView className="bg-primary h-full">
     <Text className="font-pmedium text-large text-gray text-white">  Bookmarked Video
     </Text>
      {bookmarkedVideos.length > 0 ? (
        <FlatList
       data = {bookmarkedVideos}
       keyExtractor={(item) => item.toString()}
       renderItem={({item}) => 
         <VideoCard video={item}/>
      }
      />): 
      <Text className="font-pmedium text-sm text-gray text-white">
         No Video BookMarked 
      </Text>
      
    }
    </SafeAreaView>
  )
}

export default bookmark