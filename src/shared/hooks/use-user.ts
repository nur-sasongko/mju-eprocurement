"use client";

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import useUserStore from "@/shared/stores/user";
import { useEffect } from "react";
import { useSonner } from "./use-sonner";
import { QUERIES } from "@/shared/utils/queries";
import { UserService } from "@/features/users/services/user";

const useUser = () => {
  const { setUser, setSession } = useUserStore();
  const { sonner } = useSonner();

  const {
    data,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [QUERIES.USER.GET_USER],
    queryFn: async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const user = await UserService.getUserByAuthId(session!.user.id);
      return {
        user,
        session,
      };
    },
  });

  // Update user store when session data changes
  useEffect(() => {
    if (data !== undefined) {
      setSession(data.session || null);

      setUser(data.user || null);
    }
  }, [data, setSession, setUser]);

  // Handle errors
  useEffect(() => {
    if (isError && error) {
      sonner.error("Gagal memuat data pengguna, silakan coba lagi.");
    }
  }, [isError, error, sonner]);


  return {
    user: data?.user || null,
    session: data?.session || null,
    isLoading,
    isError,
    error,
  };
};

export default useUser;
