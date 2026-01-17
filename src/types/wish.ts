import { Timestamp } from "firebase/firestore";

export interface Wish {
  id: string;
  fullname: string;
  wish: string;
  attend: boolean;
  number_guest: number;
  createdAt?: Timestamp;
}
