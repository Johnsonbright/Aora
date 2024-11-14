import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'
import { Video, ResizeMode } from 'expo-av'
import AntDesign from '@expo/vector-icons/AntDesign';
import { Alert } from 'react-native';
import * as Notifications from 'expo-notifications'
import { useGlobalContext } from '@/context/GlobalProvider';
import {useNavigation} from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';



const VideoCard = (video) => {
  const navigation = useNavigation();
   const [play, setPlay] = useState(false)
   const [isFavorite, setIsFavorite] = useState(false)
  
  //  const isBookmarked = bookMarkedVideo.some(() => video);

  //  const toggleBookmark = () => {
  //   if(isBookmarked) {
  //     removeBookmark(video.id);
  //   }else{
  //     addBookmark(video)
  //   }
  //  }

 
   


    
  //  const handleLikeClick = async(type) => {
  //   const message = type === 'like' ? 'Video bookmarked as favorite' : '';
  //   // show alert
  //   Alert.alert('Notification', message);
     
  //   await Notifications.scheduleNotificationAsync({
  //      content: {
  //        title: "Notification",
  //        body: message
  //      },
  //       trigger: null, // Trigger immediately
  //   })


  //  }

  const addBookmark = async (videoId) => {
    try {
      // Get current bookmarks
      const existingBookmarks = await AsyncStorage.getItem('bookmarkedVideos');
      const bookmarks = existingBookmarks ? JSON.parse(existingBookmarks) : [];
  
      // Check if video is already bookmarked
      if (!bookmarks.includes(videoId)) {
        // Add the new bookmark
        bookmarks.push(videoId);
        await AsyncStorage.setItem('bookmarkedVideos', JSON.stringify(bookmarks));
        console.log('Video bookmarked successfully!');
      } else {
        console.log('Video is already bookmarked.');
      }
    } catch (error) {
      console.error('Error saving bookmark', error);
    }
  };
   
  const getBookmarks = async () => {
    try {
      const bookmarks = await AsyncStorage.getItem('bookmarkedVideos');
      return bookmarks ? JSON.parse(bookmarks) : [];
    } catch (error) {
      console.error('Error retrieving bookmarks', error);
      return [];
    }
  };
  const isBookmarked = async (videoId) => {
    const bookmarks = await getBookmarks();
    return bookmarks.includes(videoId);
  };
  

    const handleLikeClick = async(item) => {
    const message =  'Video bookmarked as favorite' 
     await addBookmark(item?.video?.creator?.$id)
    // show alert
    // Alert.alert('Notification', message);
     
    // await Notifications.scheduleNotificationAsync({
    //    content: {
    //      title: "Notification",
    //      body: message
    //    },
    //     trigger: null, // Trigger immediately
    // })
   }
   
  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1" >
         <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
           <Image
           source={{uri: video?.video?.avatar}}
           className="w-full h-full rounded-lg"
           resizeMode='cover'
           />
         </View>

         <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text className="text-white font-psemibold text-sm" numberOfLines={1}>{video?.video?.title}</Text>
            <Text className="text-xs text-gray-100 font-pregular" numberOfLines={1} >{video?.video?.creator?.username}</Text>
           </View>
        </View>
        <View className="pt-2">
        <Image source={icons.menu} className="w-5 h-5" resizeMode='contain' />
        </View>
        </View>
          {play ? (

             <Video
             source={{uri: video?.video?.video}}
          
             className="w-52 h-72 rounded-[35px] mt-3 bg-white/10"
             resizeMode={ResizeMode.CONTAIN}
             useNativeControls
             shouldPlay
             onPlaybackStatusUpdate={(status) => {
            
              
               if(status.didJustFinish) {
                 setPlay(false);
               }
             }}
            />
         
          ) : (
           
            <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setPlay(true)}
            className="w-full h-60 rounded-xl mt-3 relative justify-center items-center">
             {/* bookmark icon */}
             <TouchableOpacity
              onPress={() => {
                if (!isFavorite){
                  handleLikeClick(video)
                }
                setIsFavorite(!isFavorite);
              }  
               }
             >
             <AntDesign name='heart' size={24} color={isFavorite? 'red': 'white'}/>
             </TouchableOpacity>
                
                <Image
                source={{uri:video?.video?.thumbnail}}
                className="w-full h-full rounded-xl mt-3"
                 resizeMode='cover'
                />
                <Image source={icons.play}
                className="w-12 h-12 absolute"
                resizeMode='contain'
                />
            </TouchableOpacity>
          )}
    </View>
  )
}

export default VideoCard