import * as z from 'zod';

const SignupSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  username: z.string().min(1, {
    message: "Username is required",
  }),
  email: z.string().email({
    message: "Invalid email format",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
  accountType: z.enum(["personal", "family", "business"]),
  phone: z.string().min(10, {
    message: "Phone number is required",
  }),
  address: z.string().min(1, {
    message: "Address is required",
  }),
  city: z.string().min(1, {
    message: "City is required",
  }),
  pincode: z.string().min(4, {
    message: "Pincode is required",
  }),
});

export type SignupFormData = z.infer<typeof SignupSchema>;
