import { initializeApp } from "firebase/app";
import { createContext, useContext, useState, useEffect } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  getFirestore,
  setDoc,
  doc,
  getDoc,
  addDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyBhpZLUEhaVKZpwgtJrkETp1no_Zdhy98I",
  authDomain: "bookify-b8845.firebaseapp.com",
  projectId: "bookify-b8845",
  storageBucket: "bookify-b8845.appspot.com",
  messagingSenderId: "737400274864",
  appId: "1:737400274864:web:7afb32de8a5d14b36ee075",
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
        console.log("userdata", userDoc.data());
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
    })
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
    console.log("user", currentUser);
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
  // all books get
  const listAllBook = () => {
    return getDocs(collection(firestore, "books"));
  };
  //imgaes get
  const getImgURL = (path) => {
    return getDownloadURL(ref(storage, path));
  };
  // details of book
  const getBookID = async (id) => {
    const docRef = doc(firestore, "books", id);
    const result = await getDoc(docRef);
    return result;
  };

  //placeorder
  const placeOrder = async (bookId, qty) => {
    const collectionRef = collection(firestore, "books", bookId, "Orders");
    const userDoc = await getDoc(doc(firestore, "users", currentUser.uid));
    console.log("userdata1", userDoc.data());
    const result = await addDoc(collectionRef, {
      userId: currentUser.uid,
      // bookId:
      username: userDoc.data().fname + userDoc.data().lname,
      userEmail: currentUser.email,
      qty,
    });
    return result;
  };
  // In your Firebase context file
  // const updateQty = async (bookId, qty) => {
  //   try {
  //     const bookRef = collection(firestore, "books", bookId,);
  //     await bookRef.update({ qty });
  //   } catch (error) {
  //     console.error("Error updating quantity:", error);
  //   }
  // };
  const isLoggIn = currentUser ? true : false;

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
        // updateQty,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
