import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const USERS_COLLECTION = firestore().collection('users');
export function useFirebaseAuth() {
  const createUser = (email: string, password: string, name: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const userData = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );
        await USERS_COLLECTION.doc(userData.user.uid).set({
          name: name,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
        resolve();
      } catch (error) {
        console.log(error);
        let errorMsg = 'Something went wrong. Please try again later';
        if (error.code === 'auth/email-already-in-use') {
          errorMsg = 'That email address is already in use';
        }
        if (error.code === 'auth/invalid-email') {
          errorMsg = 'That email address is invalid';
        }
        reject(new Error(errorMsg));
      }
    });
  };

  const userLogin = (email: string, password: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        await auth().signInWithEmailAndPassword(email, password);
        resolve();
      } catch (error) {
        console.log(error);
        let errorMsg = 'Something went wrong. Please try again later';
        if (error.code === 'auth/invalid-email') {
          errorMsg = 'Please enter a valid email address';
        } else if (error.code === 'auth/invalid-login') {
          errorMsg = 'Invalid email or password';
        }
        reject(new Error(errorMsg));
      }
    });
  };

  const userLogout = () => {
    return auth().signOut();
  };

  const isUserLoggedIn = () => {
    return auth().currentUser !== null;
  };

  const getUserId = () => {
    return auth().currentUser?.uid;
  };

  const loadUserData = (userId: string, onDataLoaded: Function) => {
    return USERS_COLLECTION.doc(userId).onSnapshot(doc => {
      if (doc.exists) {
        onDataLoaded({
          id: doc.id,
          ...doc.data(),
        });
      }
    });
  };

  return {
    createUser,
    userLogin,
    userLogout,
    isUserLoggedIn,
    loadUserData,
    getUserId,
  };
}
