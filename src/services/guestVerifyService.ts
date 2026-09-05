import { apiFetch } from "./api";

interface VerifyGuestResponse {
  data: {
    name: string;
    invitation_code: string;
    qr_svg: string;
  };
}

export async function verifyGuestCode(
  slug: string,
  guestSlug: string,
  code: string,
): Promise<VerifyGuestResponse["data"]> {
  const response = await apiFetch<VerifyGuestResponse>(
    `/invitations/${slug}/guest/${guestSlug}/verify`,
    {
      method: "POST",
      body: JSON.stringify({ code }),
    },
  );

  return response.data;
}
