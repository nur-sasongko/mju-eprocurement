import { Session, User } from "@supabase/supabase-js";

export type AuthReturn = {
  user: User | null;
  session: Session | null;
};
