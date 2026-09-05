import { apiFetch } from "./api";

interface GuestData {
  name: string;
}

interface GuestResponse {
  data: GuestData | null;
}

export async function getGuestBySlug(
  slug: string,
  guestSlug: string,
): Promise<GuestData | null> {
  try {
    const response = await apiFetch<GuestResponse>(
      `/invitations/${slug}/guest/${guestSlug}`,
    );
    return response.data;
  } catch {
    return null;
  }
}
