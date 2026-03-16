export interface WeddingFormData {
  groomName: string;
  groomInstagram: string;
  groomFather: string;
  groomMother: string;
  brideName: string;
  brideInstagram: string;
  brideFather: string;
  brideMother: string;
}

// This interface represents what the API returns
export interface UpdateResponse {
  success: boolean;
  message: string;
  data?: unknown;
}
