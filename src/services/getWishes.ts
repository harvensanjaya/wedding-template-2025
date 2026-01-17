import type { DocumentData } from "firebase/firestore";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
} from "firebase/firestore";
import type { Wish } from "../types/wish";
import { db } from "./firebase";

const LIMIT = 6;

export async function getWishes(
  lastDoc?: QueryDocumentSnapshot<DocumentData>
): Promise<{
  data: Wish[];
  lastDoc: QueryDocumentSnapshot<DocumentData> | null;
  hasMore: boolean;
}> {
  const q = lastDoc
    ? query(
        collection(db, "rsvp-wish"),
        orderBy("createdAt", "desc"),
        startAfter(lastDoc),
        limit(LIMIT)
      )
    : query(
        collection(db, "rsvp-wish"),
        orderBy("createdAt", "desc"),
        limit(LIMIT)
      );

  const snap = await getDocs(q);

  const data: Wish[] = snap.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Wish, "id">),
  }));

  return {
    data,
    lastDoc: snap.docs[snap.docs.length - 1] ?? null,
    hasMore: snap.docs.length === LIMIT,
  };
}
