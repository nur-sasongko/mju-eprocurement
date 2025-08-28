import Footer from '@/shared/components/layout/landing/footer';
import Navbar from '@/shared/components/layout/landing/navbar';
import React from 'react';

interface LandingLayoutProps {
  children: React.ReactNode;
}

const LandingLayout = ({ children }: LandingLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-[#EFF6FF] to-[#E6F0FA]">
      {/* Navbar */}
      <Navbar />

      {/* Main */}
      {children}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingLayout;
