"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import PATHS from "@/shared/utils/routes";
import { User } from "@supabase/supabase-js";
import { AuthService } from "../services/auth";
import useUserStore from "@/shared/stores/user";

type LogoutState = "pending" | "success" | "error";

interface UseLogoutReturn {
  logoutState: LogoutState;
  countdown: number;
  logoutTime: string;
  handleRetryLogout: () => Promise<void>;
  sessionTime: string;
  isClient: boolean;
}

export function useLogout(): UseLogoutReturn {
  const {setUser: setUserStore, setSession } = useUserStore();
  const [logoutState, setLogoutState] = useState<LogoutState>("pending");
  const [countdown, setCountdown] = useState(5);
  const [logoutTime, setLogoutTime] = useState<string>("");
  const [sessionTime, setSessionTime] = useState<string>("");
  const [isClient, setIsClient] = useState(false);
  const { replace } = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isUserFetched, setIsUserFetched] = useState(false);

  // Perform logout operation
  const performLogout = useCallback(async () => {
    try {
      setLogoutState("pending");

      // Add a small delay to show the loading state
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Call AuthService to perform logout
      await AuthService.logout();

      // Clear user and session data
      setUserStore(null);
      setSession(null);

      // Record logout time in Indonesian format
      const currentTime = new Date().toLocaleString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Asia/Jakarta",
      });

      setLogoutTime(currentTime);
      setLogoutState("success");
    } catch {
      setLogoutState("error");
    }
  }, [setSession, setUserStore]);

  // Retry logout handler
  const handleRetryLogout = useCallback(async () => {
    try {
      setLogoutState("pending");

      // Add a small delay to show the loading state
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Retry the logout operation
      await AuthService.logout();

      const currentTime = new Date().toLocaleString("id-ID", {
        timeZone: "Asia/Jakarta",
      });

      setLogoutTime(currentTime);
      setLogoutState("success");
    } catch {
      setLogoutState("error");
    }
  }, []);

  // Fetch user data from supabase
  useEffect(() => {
    const fetchUserData = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user || null);

      setIsUserFetched(true);
    };

    // Only fetch user data if not already fetched
    setIsClient(true);
    setSessionTime(
      new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })
    );

    // Fetch user data only once
    fetchUserData();
  }, []);

  // Initial logout effect
  useEffect(() => {
    if (!isUserFetched) return;

    // Only attempt logout if user is authenticated
    if (user) {
      performLogout();
    } else {
      // If no user, immediately show success
      const currentTime = new Date().toLocaleString("id-ID", {
        timeZone: "Asia/Jakarta",
      });
      setLogoutTime(currentTime);
      setLogoutState("success");
    }
  }, [isUserFetched, performLogout, user]);

  // Countdown timer for auto-redirect
  useEffect(() => {
    if (logoutState === "success" && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (logoutState === "success" && countdown === 0) {
      replace(PATHS.HOME);
    }
  }, [logoutState, countdown, replace]);

  return {
    logoutState,
    countdown,
    logoutTime,
    handleRetryLogout,
    sessionTime,
    isClient,
  };
}
