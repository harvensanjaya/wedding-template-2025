import api from "./api";

interface IFormData {
  groom_name: string;
  groom_father: string;
  groom_mother: string;
  bride_name: string;
  bride_father: string;
  bride_mother: string;
}

export const updateCoupleDetails = (formData: IFormData) => {
  // 'formData' here is the FormData object we build in the component
  return api.post("/couple", formData);
};
