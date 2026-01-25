interface UserInterface{
    id: string;
    firstName:string;
    lastName:string;
    email: string;
    role: "student" | "teacher" | "assistant" | "admin";
    avatar?: string;
}

// Define types for requests and responses
interface AuthResponse {
  access: string;
  refresh: string;
  user: UserInterface;
}

interface LoginRequest {
  email?: string;
  password?: string;
}

interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

interface RefreshRequest {
    refresh: string
}

interface ForgotPasswordRequest {
    email: string;
}

interface ResetPasswordRequest {
    email: string;
    otp: string; // or token
    newPassword: string;
}

export type {
    UserInterface,
    AuthResponse,
    LoginRequest,
    RegisterRequest,
    RefreshRequest,
    ForgotPasswordRequest,
    ResetPasswordRequest,
}