import { TypeOf, object, string } from "zod";

export const CreateOfferSchema = object({
  title: string()
    .nonempty("Title is required")
    .max(12, "Title must be les than 12 characters"),
  description: string()
    .nonempty("Description is required")
    .min(128, "Description must be more than 128 characters")
    .max(516, "Description must be less than 516 characters"),
});

export type CreateOfferInput = TypeOf<typeof CreateOfferSchema>;
