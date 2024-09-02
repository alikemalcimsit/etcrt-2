import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "./firebase";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";

export async function getProduct(collectionName, type) {
    const colRef = collection(db, collectionName);
    let q;
  
    if (type) {
      q = query(colRef, where("type", "==", type));
    } else {
      q = colRef; // Filtre yoksa tüm belgeleri al
    }
  
    const querySnapshot = await getDocs(q);
    const products = [];
    
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
  
    return products;
  }

 export async function getProductByID(collectionName, id) {
  const colRef = collection(db, collectionName);
  const q = query(colRef, where("id", "==", parseInt(id)));

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return null; // Belge bulunamadıysa null döndür
  }

  const doc = querySnapshot.docs[0];
  return { id: doc.id, ...doc.data() };
}


export async function getOrdersbyId(collectionName, userId) {
  const colRef = collection(db, collectionName);
  const q = query(colRef, where("userId", "==", userId));

  const querySnapshot = await getDocs(q);
  const orders = [];
  
  querySnapshot.forEach((doc) => {
    orders.push({ id: doc.id, ...doc.data() });
  });

  return orders;
}
export const registerWithEmailAndPassword = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Error signing up with email and password", error);
  }
};

export const signInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Error signing in with email and password", error);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error logging out", error);
  }
};