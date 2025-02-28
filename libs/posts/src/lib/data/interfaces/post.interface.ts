import { Profile } from '@tt/profile';

export interface PostCreateDTObject {
  title: string;
  content: string;
  authorId: number;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  author: Profile;
  images: string[];
  createdAt: string;
  updatedAt: string;
  comments: PostComment[];
}

export interface CommentCreateDTObject {
  text: string;
  authorId: number;
  postId: number;
  // commentId: number //to do
}

export interface PostComment {
  id: number;
  text: string;
  author: {
    id: number;
    username: string;
    avatarUrl: string;
    subsribersAmount: number;
  };
  postId: number;
  commentId: number;
  createdAt: string;
  updatedAt: string;
}
