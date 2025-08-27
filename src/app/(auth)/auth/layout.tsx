import { CompanyInfo } from '@/shared/components/branding/company-info';
import React from 'react';

const AuthLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="min-h-screen flex">
      {/* Left Section - Company Information */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-50 to-slate-100 p-12 flex-col justify-center">
        <div className="max-w-lg mx-auto">
          <CompanyInfo />
        </div>
      </div>

      {/* Right Section - Children */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
