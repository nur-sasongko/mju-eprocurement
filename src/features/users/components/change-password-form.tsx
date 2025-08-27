"use client";

import { Button } from "@/shared/components/ui/button";
import { useChangePassword } from "../hooks/use-change-password";
import { FormInput } from "@/shared/components/forms/form-input";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export function ChangePasswordForm() {
  const {
    passwordForm,
    handleChangePassword,
    isChangingPassword,
  } = useChangePassword();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const {
    handleSubmit,
    control,
    formState: { isDirty}
  } = passwordForm;

  return (
    <form onSubmit={handleSubmit(handleChangePassword)} className="space-y-6">
      <div className="space-y-4">
       <FormInput
          name="password"
          control={control}
          type={showPassword ? "text" : "password"}
          label="Password Baru"
          placeholder="Masukkan password baru"
          required
          iconRight={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
            </button>
          }
        />

        <FormInput
          name="confirm_password"
          control={control}
          type={showConfirmPassword ? "text" : "password"}
          label="Konfirmasi Password"
          placeholder="Masukkan konfirmasi password"
          required
          iconRight={
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
            </button>
          }
        />
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isChangingPassword || !isDirty}
          className="px-6"
        >
          {isChangingPassword ? "Sedang mengubah..." : "Ubah Password"}
        </Button>
      </div>
    </form>
  );
}
