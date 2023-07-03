import { CommentData } from './commentData.types';

export type ReplyData = CommentData & {
  repliedUserId: string;
  repliedCommentId: string;
};
