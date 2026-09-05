import type { CoupleData } from "../types/couple";
import { apiFetch } from "./api";

interface CoupleResponse {
  data: CoupleData;
}

export async function getCouple(slug: string): Promise<CoupleData> {
  const response = await apiFetch<CoupleResponse>(`/invitations/${slug}`);
  return response.data;
}
