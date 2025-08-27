"use client";

import { Button } from "@/shared/components/ui/button";
import { useUserProfile } from "../hooks/use-profile";
import { Separator } from "@/shared/components/ui/separator";
import { FormInput } from "@/shared/components/forms/form-input";
import { FormTextarea } from "@/shared/components/forms/form-textarea";
import { FormSelect } from "@/shared/components/forms/form-select";
import { SaveAllIcon } from "lucide-react";

const genderOptions = [
  { value: "Male", label: "Laki-laki" },
  { value: "Female", label: "Perempuan" },
];

export function PersonalInfoForm() {
  const {
    profileForm,
    handleUpdateProfile,
    isUpdatingProfile,
  } = useUserProfile();

  const {
    handleSubmit,
    control,
    formState,
  } = profileForm;

  return (
    <form onSubmit={handleSubmit(handleUpdateProfile)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <FormInput
          name="email"
          control={control}
          type="email"
          label="Email"
          placeholder="Masukkan alamat email Anda"
          required
          disabled
        />

        <FormInput
          name="phone_number"
          control={control}
          type="tel"
          label="Nomor Telepon"
          placeholder="Masukkan nomor telepon Anda, contoh: 628123456789"
          required
        />

        <div className="col-span-1 md:col-span-2">
          <Separator className="my-4" />
        </div>

        <FormInput
          name="fullname"
          control={control}
          label="Nama Lengkap"
          placeholder="Masukkan nama lengkap Anda"
          required
        />

        <FormInput
          name="nickname"
          control={control}
          label="Nama Panggilan"
          placeholder="Masukkan nama panggilan Anda"
          required
        />

        <FormInput
          name="birth_place"
          control={control}
          label="Tempat Lahir"
          placeholder="Masukkan tempat lahir Anda"
          required
        />

        <FormInput
          name="birth_date"
          control={control}
          type="date"
          label="Tanggal Lahir"
          placeholder="Pilih tanggal lahir Anda"
          required
        />

        <FormSelect
          name="gender"
          control={control}
          options={genderOptions}
          label="Gender"
          placeholder="Pilih jenis kelamin"
          required
        />

      </div>

      <FormTextarea
        name="address"
        control={control}
        label="Alamat Rumah"
        placeholder="Masukkan alamat Anda"
        required
      />

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isUpdatingProfile || !formState.isDirty}
          className="px-6"
          size={"lg"}
        >
          <SaveAllIcon className="mr-2 h-4 w-4" />
          {isUpdatingProfile ? "Sedang memperbarui..." : "Perbarui Profil"}
        </Button>
      </div>
    </form>
  );
}
