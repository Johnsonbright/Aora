import { Account, Avatars, Client, Databases, ID , Query, Storage} from 'react-native-appwrite';


export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.ifedevist.aora",
  projectId: "66f25cea002ab41c6d11",
  databaseId: "66f25ff9003a6402e1d7",
  userCollectionId: "66f856d60008ec940006",
  videoCollectionId: "66f261ec003430fe51cc",
  storageId: "66f264830035c186c55c"
}
// Destructuring config
const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId
} = appwriteConfig


// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(endpoint) // Your Appwrite Endpoint
    .setProject(projectId) // Your project ID
    .setPlatform(platform) // Your application ID or bundle ID.
;


// Register User
const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
       ID.unique(),
        email,
        password,
        username
    )
   
    if(!newAccount) throw Errors;
    const avatarUrl = avatars.getInitials(username)

    await SignIn(email, password)
    const newUser = await databases.createDocument(
      databaseId,
      userCollectionId,
      ID.unique(),
      {
        accountid: newAccount.$id,
        email,
        username,
        avatar: avatarUrl
      }
    );
    return newUser;
  } catch(error) {
      console.log(error);
      throw new Error(error)
  }
}


export const  SignIn = async (email, password) => {
  try{
    const session = await account.createEmailPasswordSession(email, password)
    return session;
  } catch(error) {
    throw new Error(error)
  }
}


// Get Account
// export async function getAccount() {
//   try {
//     const currentAccount = await account.get();

//     return currentAccount;
//   } catch (error) {
//     throw new Error(error);
//   }
// }


export const getCurrentUser = async() => {
  try {
     const currentAccount = await account.get();

     if(!currentAccount) throw Error;

     const currentUser = await databases.listDocuments(
      databaseId,
      userCollectionId,
      [Query.equal('accountid', currentAccount.$id)]
     )

     if(!currentUser) throw Error;
     return currentUser.documents[0]
  } catch(error) {
    console.log(error);
    return null;
  }
}

export const getAllPosts = async () => {
  try {
     const posts = await databases.listDocuments(
      databaseId,
      videoCollectionId
     );
  
     return posts.documents;
  }
  catch(error) {
    console.log(error)
  }
}

export const getLatestPosts = async () => {
  try {
     const posts = await databases.listDocuments(
      databaseId,
      videoCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
     )
 
     return posts.documents;
  }
  catch(error) {
    console.log(error)
  }
}

export const searchPosts = async (query) => {
  try {
     const posts = await databases.listDocuments(
      databaseId,
      videoCollectionId,
      [Query.search("title", query)]
     )
 
     return posts.documents;
  }
  catch(error) {
    console.log(error)
  }
}

export const getUserPosts = async (userId) => {
  try {
     const posts = await databases.listDocuments(
      databaseId,
      videoCollectionId,
      [Query.equal('creator', userId)]
     )
 
     return posts.documents;
  }
  catch(error) {
    console.log(error)
  }
};

export async function signOut() {
  try {
    const session = await account.deleteSession('current');

    return session;
  } catch (error) {
    throw new Error(error);
  }
};

//3. type of file
export const getFilePreview = async(fileId, type) => {
  let fileurl;

  try{
    if(type === 'video') {
      fileurl = storage.getFileView(storageId, field)
    } else if (type === 'image') {
      fileurl = storage.getFilePreview(storageId, fileId, 2000, 2000, 'top', 100)
    } else {
      throw new Error('Invalid file type')
    }

    if(!fileurl) throw Error;
  } catch(error) {
    throw new Error(error)
  }
}


//2. upload file
export const uploadFile = async (file, type) => {
   if(!file) return;

   const {mimeType, ...rest} = file;
   const asset = {type: mimeType, ...rest};

   try{
     const uploadFile = await storage.createFile(
      storageId,
      ID.unique(),
      asset
     );

     const fileUrl = await getFilePreview(uploadFile.$id, type)
   }catch(error) {
    throw new Error(error)
   }
}

// 1. create video
export const createVideo = async (form) => {
  try{
   const [thumbnailUrl, videoUrl] = await Promise.all([
    uploadFile(form.thumbnail, 'image'),
    uploadFile(form.video, 'video'),
   ])

   const newPost = await databases.createDocument(
    databaseId,
     videoCollectionId,
      ID.unique(),
    {
      title: form.title,
      thumbnail: thumbnailUrl,
      video: videoUrl,
      prompt: form.prompt,
      creator: form.userId
    } )
    return newPost;
  }catch(error) {
    throw new Error(error);
  }
}