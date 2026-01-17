import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { db } from "../../services/firebase";
import { getWishes } from "../../services/getWishes";
import type { Wish } from "../../types/wish";
import { fadeUpSection } from "../utils/sectionAnimation";

import Button from "../Elements/Button";

const LIMIT = 6;

interface WishesSectionProps {
  id?: string;
}

export default function WishesSection({ id }: Readonly<WishesSectionProps>) {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "rsvp-wish"),
      orderBy("createdAt", "desc"),
      limit(LIMIT)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Wish, "id">),
      }));

      setWishes(data);
      setLastDoc(snapshot.docs[snapshot.docs.length - 1] ?? null);
      setHasMore(snapshot.docs.length === LIMIT);
    });

    return () => unsubscribe();
  }, []);

  const loadMore = async () => {
    if (!lastDoc || !hasMore) return;
    const res = await getWishes(lastDoc);
    setWishes((prev) => [...prev, ...res.data]);
    setLastDoc(res.lastDoc);
    setHasMore(res.hasMore);
  };

  return (
    <motion.div
      id={id}
      className="w-full my-30 py-20 flex flex-col items-center gap-5 "
      variants={fadeUpSection}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="flex flex-col items-center justify-center gap-5 ">
        <h2 className="font-italiana md:text-6xl text-5xl transition-all duration-300">
          WISHES
        </h2>
        <p className="w-2/3 font-inter md:text-xl sm:text-lg text-base font-light text-center duration-300 transition-all">
          we are very delighted to hear from you on our special day! thank you
          for all the wishes.
        </p>
      </div>
      <div className="max-w-250 w-full md:px-20 px-5 transition-all duration-300 flex flex-col gap-5">
        <div className="text-left max-h-125 overflow-y-auto lowercase md:text-base text-sm">
          {wishes.map((item) => (
            <div
              key={item.id}
              className="border p-3 mb-2 rounded-sm h-30 flex flex-col justify-between font-inter font-light"
            >
              <p>{item.wish}</p>
              <div className="flex justify-center">
                <p className="font-medium text-black/50 text-center">
                  {item.fullname}
                </p>
              </div>

              {/* ❌ attend & number_guest TIDAK ditampilkan */}
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          {hasMore && (
            <Button onClick={loadMore} className="bg-none rounded-none border">
              LOAD MORE
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
