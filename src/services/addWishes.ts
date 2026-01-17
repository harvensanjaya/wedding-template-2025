import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import type { Wish } from "../types/wish";
import { db } from "./firebase";

export async function addWish(payload: Wish): Promise<void> {
  await addDoc(collection(db, "rsvp-wish"), {
    fullname: payload.fullname,
    wish: payload.wish,
    attend: payload.attend,
    number_guest: payload.number_guest,
    createdAt: serverTimestamp(),
  });
}
