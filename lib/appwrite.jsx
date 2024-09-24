import { Account, Client, ID } from 'react-native-appwrite';


export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.ifedevist.aora",
  projectId: "66f25cea002ab41c6d11",
  databaseId: "66f25ff9003a6402e1d7",
  userCollectionId: "66f260af0019bfd6c99f",
  videoCollection: "66f261ec003430fe51cc",
  storageId: "66f264830035c186c55c"
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.
;


// Register User
const account = new Account(client);

export const createUser =() => {
  account.create(ID.unique(), 'me@example.com', 'password', 'Jane Doe')
  .then(function (response) {
      console.log(response);
  }, function (error) {
      console.log(error);
  });
}


