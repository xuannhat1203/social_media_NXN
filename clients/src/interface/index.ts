interface Follow {
  userId: number;
  created_at: string;
}

interface Friend {
  userId: number;
  add_at: string;
}
export interface User {
  id: number;
  userName: string;
  email: string;
  avatar: string;
  banner: string;
  follow: Follow[];
  friends: Friend[];
  groups: any[];
  create_at: string;
}
