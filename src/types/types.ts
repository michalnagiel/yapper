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
  liked_by: string[];
}

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface Comment {
  id: number;
  content: string;
  author: string;
  created_at: string;
  likes_count: string;
  is_liked: string;
  liked_by: string[];
}