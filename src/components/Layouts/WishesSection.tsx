import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fadeUpSection } from "../utils/sectionAnimation";
import { onWishSubmitted } from "../utils/wishEvents";

import { getWishes } from "../../services/getWishes";
import type { Wish } from "../../types/couple";
import Button from "../Elements/Button";

interface WishesSectionProps {
  id?: string;
}

export default function WishesSection({ id }: Readonly<WishesSectionProps>) {
  const { slug } = useParams<{ slug: string }>();

  const [wishes, setWishes] = useState<Wish[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetchInitialWishes();
  }, [slug]);

  // Dengerin event submit dari RsvpForm, refetch data terbaru
  useEffect(() => {
    const unsubscribe = onWishSubmitted(() => {
      fetchInitialWishes();
    });

    return unsubscribe;
  }, [slug]);

  const fetchInitialWishes = async () => {
    if (!slug) return;

    setLoading(true);
    try {
      const response = await getWishes(slug, 1);

      setWishes(response.data);
      setPage(1);
      setHasMore(
        response.meta
          ? response.meta.current_page < response.meta.last_page
          : false,
      );
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (!slug || loading || !hasMore) return;

    setLoading(true);

    try {
      const nextPage = page + 1;
      const response = await getWishes(slug, nextPage);

      setWishes((prev) => [...prev, ...response.data]);
      setPage(nextPage);
      setHasMore(
        response.meta
          ? response.meta.current_page < response.meta.last_page
          : false,
      );
    } catch (error) {
      console.error("Error loading more:", error);
    } finally {
      setLoading(false);
    }
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
          {wishes.length === 0 && !loading && (
            <p className="text-center text-black/40 py-10">
              No wishes yet. Be the first to leave one!
            </p>
          )}

          {wishes.map((item, index) => (
            <div
              key={`${item.name}-${item.created_at}-${index}`}
              className="border p-3 mb-2 rounded-sm h-30 flex flex-col justify-between font-inter font-light"
            >
              <p>{item.message}</p>
              <div className="flex justify-center">
                <p className="font-medium text-black/50 text-center">
                  {item.name}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          {hasMore && (
            <Button onClick={loadMore} className="bg-none rounded-none border">
              {loading ? "loading..." : "LOAD MORE"}
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
