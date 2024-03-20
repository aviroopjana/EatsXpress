import * as z from 'zod';

export const accountTypes = ["personal", "family", "business"];

const UpdateFormSchema = z.object({
    name: z.string().min(3, {
        message: "Name is required",
      }),
      username: z.string().min(3, {
        message: "Username is required",
      }),
      email: z.string().email({
        message: "Please provide a valid email address",
      }),
      accountType: z.string().refine(value => accountTypes.includes(value), {
        message: "Selecting an account type is mandatory"
      }),
      profilePicture: z.string().url(),
      phone: z.string().min(10, {
        message: "Phone number is required",
      }),
      address: z.string().min(5, {
        message: "Address is required",
      }),
      city: z.string().min(3, {
        message: "City is required",
      }),
      pincode: z.string().min(4, {
        message: "Valid pincode is required",
      }),
});

export type UpdateFormData = z.infer<typeof UpdateFormSchema>;
export { UpdateFormSchema };
