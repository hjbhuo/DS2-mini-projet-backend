import { UserRole } from '../../users/user.entity';

export class RegisterDto {
  username: string;
  email: string;
  password: string;
  role: UserRole; // ✅ ENUM, PAS string
}

export class LoginDto {
  email: string;
  password: string;
}
