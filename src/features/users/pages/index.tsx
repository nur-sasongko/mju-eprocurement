"use client";

import useBreadcrumbStore from '@/shared/stores/breadcrumb';
import React, { useEffect } from 'react';
import { PersonalInfoForm } from '../components/personal-info-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { LockIcon, UserIcon } from 'lucide-react';
import { ChangePasswordForm } from '../components/change-password-form';
// import { ChangePasswordForm } from '../components/change-password-form';

const ProfilePage = () => {
  const { setItems, clearItems } = useBreadcrumbStore();

  // Set breadcrumb items for the profile page
  useEffect(() => {
    setItems([
      { label: "Profile" },
    ]);

    return () => clearItems();
  }, [setItems, clearItems]);


  return (
    <div className="container">
      <div className='max-w-4xl mx-auto'>
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Pengaturan Profil
          </h1>
          <p className="text-gray-600 mt-2">
            Kelola informasi pribadi dan keamanan akun Anda
          </p>
        </div>

        <Tabs defaultValue="personal-info" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 md:mb-8">
            <TabsTrigger
              value="personal-info"
              className="flex items-center gap-2 text-sm md:text-base"
            >
              <UserIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Informasi Pribadi</span>
              <span className="sm:hidden">Pribadi</span>
            </TabsTrigger>
            <TabsTrigger
              value="change-password"
              className="flex items-center gap-2 text-sm md:text-base"
            >
              <LockIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Kredensial</span>
              <span className="sm:hidden">Password</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal-info" className="space-y-6">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
                Informasi Pribadi
              </h2>
              <p className="text-gray-600 text-sm md:text-base mb-6">
                Update informasi profil dan alamat email Anda di sini
              </p>
              <PersonalInfoForm />
            </div>
          </TabsContent>

          <TabsContent value="change-password" className="space-y-6">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
                Ubah Kata Sandi
              </h2>
              <p className="text-gray-600 text-sm md:text-base mb-6">
                Perbarui kata sandi Anda untuk menjaga keamanan akun
              </p>
              <ChangePasswordForm />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
