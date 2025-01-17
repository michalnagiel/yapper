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
