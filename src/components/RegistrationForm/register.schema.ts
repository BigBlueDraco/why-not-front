import { object, string, TypeOf } from "zod";
export const RegisterSchema = object({
  email: string().nonempty("Email is required").email("Email is invalid"),
  password: string()
    .nonempty("Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  passwordConfirm: string().nonempty("Please confirm your password"),
  first_name: string()
    .nonempty("Firstname is required")
    .max(50, "Password must be less than 50 characters"),
  last_name: string()
    .nonempty("Firstname is required")
    .max(50, "Password must be less than 50 characters"),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ["passwordConfirm"],
  message: "Passwords do not match",
});
export type RegisterInput = TypeOf<typeof RegisterSchema>;
