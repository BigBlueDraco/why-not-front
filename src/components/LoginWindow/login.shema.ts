import { object, string, TypeOf } from "zod";
export const LoginSchema = object({
  email: string().nonempty("Email is required").email("Email is invalid"),
  password: string()
    .nonempty("Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});
export type LoginInput = TypeOf<typeof LoginSchema>;
