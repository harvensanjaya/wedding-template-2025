import { motion } from "motion/react";
import { useEffect, useState } from "react";
import type { Wish } from "../../types/wish";
import { fadeUpSection } from "../utils/sectionAnimation";

import api from "../../services/api";
import Button from "../Elements/Button";

const LIMIT = 3;

interface WishesSectionProps {
  id?: string;
}

export default function WishesSection({ id }: Readonly<WishesSectionProps>) {
  const [wishes, setWishes] = useState<Wish[]>([]);
  // const [lastDoc, setLastDoc] =
  //   useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const q = query(
  //     collection(db, "rsvp-wish"),
  //     orderBy("createdAt", "desc"),
  //     limit(LIMIT)
  //   );

  // Initial Load
  useEffect(() => {
    fetchInitialWishes();
  }, []);

  const fetchInitialWishes = async () => {
    setLoading(true);
    try {
      // Offset 0 means "start from the beginning"
      const response = await api.get(`/rspv?limit=${LIMIT}&offset=0`);
      const data = response.data.result;

      setWishes(data);
      // If we got less than the limit, we know there's no more data left
      setHasMore(data.length === LIMIT);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  //   const unsubscribe = onSnapshot(q, (snapshot) => {
  //     const data = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...(doc.data() as Omit<Wish, "id">),
  //     }));

  //     setWishes(data);
  //     setLastDoc(snapshot.docs[snapshot.docs.length - 1] ?? null);
  //     setHasMore(snapshot.docs.length === LIMIT);
  //   });

  //   return () => unsubscribe();
  // }, []);

  // const loadMore = async () => {
  //   if (!lastDoc || !hasMore) return;
  //   const res = await getWishes(lastDoc);
  //   setWishes((prev) => [...prev, ...res.data]);
  //   setLastDoc(res.lastDoc);
  //   setHasMore(res.hasMore);
  // };

  const loadMore = async () => {
    if (loading) return;
    setLoading(true);

    try {
      // Offset is the number of items we ALREADY have
      const offset = wishes.length;
      const response = await api.get(`/rspv?limit=${LIMIT}&offset=${offset}`);
      const newData = response.data.result;

      if (newData.length > 0) {
        setWishes((prev) => [...prev, ...newData]);
        setHasMore(newData.length === LIMIT);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading more:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      id={id}
      className='w-full my-30 py-20 flex flex-col items-center gap-5 '
      variants={fadeUpSection}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true }}
    >
      <div className='flex flex-col items-center justify-center gap-5 '>
        <h2 className='font-italiana md:text-6xl text-5xl transition-all duration-300'>
          WISHES
        </h2>
        <p className='w-2/3 font-inter md:text-xl sm:text-lg text-base font-light text-center duration-300 transition-all'>
          we are very delighted to hear from you on our special day! thank you
          for all the wishes.
        </p>
      </div>
      <div className='max-w-250 w-full md:px-20 px-5 transition-all duration-300 flex flex-col gap-5'>
        <div className='text-left max-h-125 overflow-y-auto lowercase md:text-base text-sm'>
          {wishes.map((item) => (
            <div
              key={item.id}
              className='border p-3 mb-2 rounded-sm h-30 flex flex-col justify-between font-inter font-light'
            >
              <p>{item.wish}</p>
              <div className='flex justify-center'>
                <p className='font-medium text-black/50 text-center'>
                  {item.fullname}
                </p>
              </div>

              {/* ❌ attend & number_guest TIDAK ditampilkan */}
            </div>
          ))}
        </div>
        <div className='flex justify-center'>
          {hasMore && (
            <Button onClick={loadMore} className='bg-none rounded-none border'>
              {loading ? "loading..." : "LOAD MORE"}
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
