import z from "zod";

export const loginSchema = z.object({
  email: z.email({ message: "Email tidak valid." }),
  password: z.string().min(1, { message: "Password tidak boleh kosong" }),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

// export default values for the form
export const defaultLoginValues: LoginSchemaType = {
  email: "",
  password: "",
};
