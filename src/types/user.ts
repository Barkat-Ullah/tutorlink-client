export interface IUser {
  userId: string;
  name: string;
  email: string;
  isActive?: boolean;
  role: "student" | "tutor" | "admin";
  photo?:string
  iat?: number;
  exp?: number;
}
