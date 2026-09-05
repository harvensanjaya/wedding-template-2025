export interface CoupleData {
  slug: string;
  groom: {
    name: string;
    father_name: string | null;
    mother_name: string | null;
    birth_date: string | null;
    phone: string | null;
    email: string | null;
    photo: string | null;
  };
  bride: {
    name: string;
    father_name: string | null;
    mother_name: string | null;
    birth_date: string | null;
    phone: string | null;
    email: string | null;
    photo: string | null;
  };
  couple_photo: string | null;
  image_cover: string | null;
  image_jumbotron: string | null;
  wish_section_image: string | null;
  wedding_story: string | null;
  wedding_song: {
    url: string | null;
    title: string | null;
    artist: string | null;
  };
  filter: {
    hashtag: string | null;
    instagram_filter_link: string | null;
    images: string[];
  } | null;
  events: WeddingEvent[];
  gallery: GalleryRow[];
  gifts: BankAccount[];
}

export interface WeddingEvent {
  event_name: "holy_matrimony" | "wedding_reception" | string;
  venue: string | null;
  address: string | null;
  event_date: string | null;
  start_time: string | null;
  end_time: string | null;
  map_link: string | null;
  live_link: string | null;
  save_date: boolean;
}

export interface GalleryRow {
  row_order: number;
  photos_per_row: number;
  photos: string[];
}

export interface BankAccount {
  bank_name: string | null;
  bank_logo: string | null;
  account_number: string;
  account_holder_name: string;
}

export interface Wish {
  name: string;
  message: string;
  created_at: string;
}
