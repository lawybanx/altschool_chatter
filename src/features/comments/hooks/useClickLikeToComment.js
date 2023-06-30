import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateComment } from '../../../lib/api';
import { setCurrentComments } from '../../../store/comment/currentComments';

const useClickLikeToComment = (currentUserId, postId) => {
  const dispatch = useDispatch();

  const [updatingLike, setUpdatingLike] = useState(false);

  const handleClickLike = (comments, commentId) => {
    setUpdatingLike(true);

    const externalComments = comments.map(comment =>
      comment.commentId === commentId
        ? {
            ...comment,
            likes: comment.likes.includes(currentUserId)
              ? comment.likes.filter(id => id !== currentUserId)
              : [...comment.likes, currentUserId],
          }
        : comment
    );

    const modifiedComments = externalComments.map(comment => ({
      ...comment,
      replies: {
        ...Object.values(comment.replies).map(cmt =>
          cmt.commentId === commentId
            ? {
                ...cmt,
                likes: cmt.likes.includes(currentUserId)
                  ? cmt.likes.filter(id => id !== currentUserId)
                  : [...cmt.likes, currentUserId],
              }
            : cmt
        ),
      },
    }));

    dispatch(setCurrentComments(modifiedComments));

    updateComment(modifiedComments, postId)
      .then(_ => {
        setUpdatingLike(false);
        // console.log('updated like');
      })
      .catch(err => {
        setUpdatingLike(false);
        console.log(err);
      });
  };

  return { handleClickLike, updatingLike };
};

export default useClickLikeToComment;
