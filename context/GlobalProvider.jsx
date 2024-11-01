import { createContext, useContext, useState, useEffect,  } from "react";
import { getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
 const [bookMarkedVideo, setIsBookMarked] = useState([])

 const addBookmark = (video) => {
  setIsBookMarked((prev) => [...prev, video])
 };
 const removeBookmark = (videoId) => {
  setIsBookMarked((prev) => prev.filter((video => video.id !== videoId)))
 };

  useEffect(()=> {
    getCurrentUser().then((res) => {
      console.log("🚀 ~ getCurrentUser ~ res:", res)
      if(res) {
        setIsLoggedIn(true)
        setUser(res)
      }else{
        setIsLoggedIn(false)
        setUser(null)
      }
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      setIsLoading(false)
    })
  }, [])

  return(
    <GlobalContext.Provider
       value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isLoading,
        bookMarkedVideo,
        addBookmark,
        removeBookmark,
       }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider