import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateComment } from '../../../lib/api';
import { setCurrentComments } from '../../../store/comment/currentComments';
import { CommentData } from '../../../types/commentData.types';
import { ReplyData } from '../../../types/replyData.types';

interface ClickLikeToCommentHook {
  handleClickLike: (comments: CommentData[], commentId: string) => void;
  updatingLike: boolean;
}

const useClickLikeToComment = (
  currentUserId: string,
  postId: string
): ClickLikeToCommentHook => {
  const dispatch = useDispatch();

  const [updatingLike, setUpdatingLike] = useState(false);

  const handleClickLike = (comments: CommentData[], commentId: string) => {
    setUpdatingLike(true);

    const updatedComments = comments.map((comment: any) => {
      if (comment.commentId === commentId) {
        const updatedLikes =
          comment.likes && comment.likes.includes(currentUserId)
            ? comment.likes.filter((id: string) => id !== currentUserId)
            : [...comment.likes, currentUserId];

        return {
          ...comment,
          likes: updatedLikes,
        };
      } else {
        const updatedReplies = Object.values(comment.replies).map(
          (reply: any) => {
            if (reply.commentId === commentId) {
              const updatedReplyLikes = reply.likes.includes(currentUserId)
                ? reply.likes.filter((id: string) => id !== currentUserId)
                : [...reply.likes, currentUserId];

              return {
                ...reply,
                likes: updatedReplyLikes,
              };
            } else {
              return reply;
            }
          }
        );

        return {
          ...comment,
          replies: Object.fromEntries(
            updatedReplies.map((reply: ReplyData) => [reply.commentId, reply])
          ),
        };
      }
    });

    dispatch(setCurrentComments(updatedComments));

    updateComment(updatedComments, postId)
      .then(() => {
        setUpdatingLike(false);
        // console.log('updated like');
      })
      .catch((err: Error) => {
        setUpdatingLike(false);
        console.log(err);
      });
  };

  return { handleClickLike, updatingLike };
};

export default useClickLikeToComment;
