import * as z from 'zod';

const accountTypes = ["personal", "family", "business"];

const SignupSchema = z.object({
  name: z.string().min(3, {
    message: "Name is required",
  }),
  username: z.string().min(3, {
    message: "Username is required",
  }),
  email: z.string().email({
    message: "Please provide a valid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
  accountType: z.string().refine(value => accountTypes.includes(value), {
    message: "Selecting an account type is mandatory"
  }),
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
    message: "valid pincode is required",
  }),
});

export type SignupFormData = z.infer<typeof SignupSchema>;
