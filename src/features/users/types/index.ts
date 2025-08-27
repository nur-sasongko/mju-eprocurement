// Gender enum type
export type Gender = "Male" | "Female";

// User type/interface
export interface User {
  id: string; // uuid
  auth_id: string | null; // uuid, can be null
  fullname: string;
  email: string;
  password_hash: string;
  nickname: string | null;
  birth_place: string | null;
  birth_date: string | null; // ISO date string, e.g., "1990-01-01"
  phone_number: string | null;
  phone_number_verified_at: string | null; // ISO datetime string
  gender: Gender | null;
  profile_photo_url: string | null;
  address: string | null;
  is_active: boolean;
  created_at: string; // ISO datetime string
  updated_at: string; // ISO datetime string
  deleted_at: string | null; // ISO datetime string for soft delete
  created_by: string | null; // uuid of creator
  updated_by: string | null; // uuid of updater
  is_password_set: boolean; // true if password is set, false if not
}
