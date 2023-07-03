export type ProfileData = {
  id: string;
  createdAt: string;
  name: string;
  username: string;
  profile?: string;
  twitter?: string;
  website?: string;
  location?: string;
  email?: string;
  github?: string;
  followers?: string[];
  following?: string[];
  followingTags?: string[];
};
