import type { Wish } from "../types/couple";
import { apiFetch } from "./api";

interface WishesResponse {
  data: Wish[];
  meta?: {
    current_page: number;
    last_page: number;
    total: number;
  };
}

export async function getWishes(
  slug: string,
  page: number = 1,
): Promise<WishesResponse> {
  return apiFetch<WishesResponse>(`/invitations/${slug}/wishes?page=${page}`);
}
