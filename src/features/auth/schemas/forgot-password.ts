import z from "zod";

export const forgotPasswordSchema = z.object({
  email: z.email("Format email tidak valid"),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const forgotPasswordDefaultValues: ForgotPasswordFormData = {
  email: "",
};
