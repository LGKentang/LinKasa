import { doc , getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export const getUserByUid = async (uid : string) => {
    const docSnap = await getDoc(doc(db,"users",uid))
    return docSnap.exists() ? docSnap.data() : null
}






