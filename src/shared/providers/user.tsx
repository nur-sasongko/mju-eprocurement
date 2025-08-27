"use client";

import { OnboardingModal } from '@/features/onboarding/components/onboarding-modal';
import useUser from '@/shared/hooks/use-user';
import React from 'react';

const UserProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isLoading, user } = useUser();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user?.id || user?.is_password_set === false) {
    return (
      <OnboardingModal />
    );
  }

  return <>{children}</>;
};

export default UserProvider;
