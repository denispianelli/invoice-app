export type User = {
  id: string;
  name: string | null;
  firstname: string | null;
  lastname: string | null;
  email: string;
  email_verified: boolean | null;
  password: string | null;
  otp: string | null;
  otp_expires: Date | null;
  image: string | null;
};
