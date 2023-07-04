export type User = {
  userId: string;
  name?: string | any;
  username?: string | any;
  profile?: string | any;
  createdAt?: string | any;
};

export type AuthContextValue = User | null;
