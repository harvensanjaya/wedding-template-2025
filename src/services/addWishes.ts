import type { Wish } from "../types/couple";
import { apiFetch } from "./api";

interface AddWishPayload {
  name: string;
  attendance: "hadir" | "tidak_hadir";
  guest_count?: number;
  message?: string;
  invitation_code?: string;
}

interface AddWishResponse {
  message: string;
  data: Wish;
}

export async function addWish(
  slug: string,
  payload: AddWishPayload,
  guestSlug?: string,
): Promise<AddWishResponse> {
  const endpoint = guestSlug
    ? `/invitations/${slug}/wishes/${guestSlug}`
    : `/invitations/${slug}/wishes`;

  return apiFetch<AddWishResponse>(endpoint, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
