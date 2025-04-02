import { PostService } from "./services/post.service"
import { Post } from "./interfaces/post.interface"
import { PostComment } from "./interfaces/post.interface"
import { PostCreateDTObject } from "./interfaces/post.interface"
import { CommentCreateDTObject } from "./interfaces/post.interface"
export * from "./store"

export {
  Post,
  PostService,
  PostComment,
  PostCreateDTObject,
  CommentCreateDTObject
}
