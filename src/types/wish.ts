import { Timestamp } from "firebase/firestore";

export interface Wish {
  id: string;
  fullname: string;
  wish: string;
  status: string;
  number_of_guest: number;
  createdAt?: Timestamp;
}
