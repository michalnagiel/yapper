export interface Hashtag {
  id: number;
  name: string;
}

export interface Post {
  id: number;
  content: string;
  author: string;
  created_at: string;
  hashtags: Hashtag[];
}

export interface User {
  id: number;
  username: string;
  email: string;
}