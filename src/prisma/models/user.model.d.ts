export class User {
  id?: string;
  isAdmin?: boolean;
  username: string;
  password: string;
  email: string;
  rating?: number;
  avatar_url?: string;
  created_at?: Date;
  updated_at?: Date;
}
