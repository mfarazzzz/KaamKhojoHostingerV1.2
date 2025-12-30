export type UserRole = 'admin' | 'employer' | 'candidate';

export interface User {
  id: string;
  name: string;
  email: string;
  type: UserRole;
  category?: string;
}
