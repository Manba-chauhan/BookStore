import { initializeApp } from "firebase/app";
import { createContext, useContext, useState, useEffect } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  setDoc,
  doc,
  getDoc,
  addDoc,
  collection,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        setCurrentUser(user);
        const userDoc = await getDoc(doc(firestore, "users", user.uid));
        if (userDoc.exists()) {
          setCurrentUser(user);
          setRole(userDoc.data().role);
        } else {
          setCurrentUser(null);
          setRole(null);
        }
      } else {
        setCurrentUser(null);
        setRole(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const signup = async (fname, lname, address, role, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      const user = userCredential.user;
      await setDoc(doc(firestore, "users", user.uid), {
        fname,
        lname,
        address,
        role,
        email,
        uid: user.uid,
      });
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      const user = userCredential.user;
      const userDoc = await getDoc(doc(firestore, "users", user.uid));
      if (userDoc.exists()) {
        setCurrentUser(user);
        setRole(userDoc.data().role);
      } else {
        setCurrentUser(null);
        setRole(null);
      }
    } catch (error) {
      alert("Invalid credential, please signup first");
      console.error("Error logging in:", error);
      setCurrentUser(null);
      setRole(null);
    }
  };

  const logOut = async () => {
    await signOut(firebaseAuth);
  };

  const handleBookListing = async (
    name,
    isdn,
    authorname,
    desc,
    price,
    bookpic
  ) => {
    const imgRef = ref(storage, `uploads/images/${Date.now()}-${bookpic.name}`);
    const uploadResult = await uploadBytes(imgRef, bookpic);
    const downloadURL = await getDownloadURL(uploadResult.ref);

    return await addDoc(collection(firestore, "books"), {
      name,
      isdn,
      authorname,
      desc,
      price,
      imgURL: downloadURL,
      userID: currentUser.uid,
      userEmail: currentUser.email,
    });
  };

  const listAllBook = () => {
    return getDocs(collection(firestore, "books"));
  };

  const getImgURL = (path) => {
    return getDownloadURL(ref(storage, path));
  };

  const getBookID = async (id) => {
    const docRef = doc(firestore, "books", id);
    const result = await getDoc(docRef);
    return result;
  };

  const placeOrder = async (bookId, qty) => {
    const collectionRef = collection(firestore, "books", bookId, "Orders");
    const userDoc = await getDoc(doc(firestore, "users", currentUser.uid));
    const result = await addDoc(collectionRef, {
      
      userId: currentUser.uid,
      username: `${userDoc.data().fname} ${userDoc.data().lname}`,
      userEmail: currentUser.email,
      bookId,
      qty,
    });
    return result;
  };

 const updateQty = async (bookId, newQty) => {
   const bookRef = doc(firestore, "books", bookId);
   try {
     console.log("Updating quantity for book ID:", bookId, "qty:", newQty);
     await updateDoc(bookRef, { qty: newQty });
     console.log("Quantity updated successfully");
   } catch (error) {
     console.error("Error updating quantity: ", error);
   }
 };


  const getOrders = async () => {
    if (currentUser) {
      const orderCollection = await getDocs(collection(firestore, "books"));
      const orderList = [];
      orderCollection.forEach((doc) => {
        const orderData = doc.data();
        console.log("orderData",orderData)
        if (orderData.userID === currentUser.uid) {
          orderList.push({ ...orderData, id: doc.id });
        }
      });
      return orderList;
    }
    return [];
  };

  const isLoggIn = !!currentUser;

  return (
    <FirebaseContext.Provider
      value={{
        currentUser,
        role,
        signup,
        login,
        isLoggIn,
        logOut,
        listAllBook,
        handleBookListing,
        getBookID,
        getImgURL,
        placeOrder,
        updateQty,
        getOrders, // Add this line
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
