import React, { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfileData } from '../../../helper/getUserProfileData';
import CommentItem from '../components/CommentItem';
import { setCurrentComments } from '../../../store/comment/currentComments';
import { useAuth } from '../../../context/auth';
import { CommentData } from '../../../types/commentData.types';
import { ReplyData } from '../../../types/replyData.types';

interface UserProfileData {
  name: string;
  username: string;
}

interface AllCommentsProps {
  id: string;
  userId: string;
  comments: CommentData[];
}

const AllComments: React.FC<AllCommentsProps> = ({ id, userId, comments }) => {
  const dispatch = useDispatch();
  const user = useAuth();

  useEffect(() => {
    dispatch(setCurrentComments(comments));
  }, [comments, dispatch]);

  const { profileData } = useSelector((state: any) => state.profileData);
  const { currentComments } = useSelector(
    (state: any) => state.currentComments
  );

  const repliedComment = (replies: ReplyData) =>
    Object.values(replies).sort(
      (a, b) => a.createdAt.seconds - b.createdAt.seconds
    );

  return (
    <Box mt='2rem' pb='10rem' px='1rem'>
      {comments.map((comment: CommentData) => (
        <Box key={comment.commentId}>
          <CommentItem
            avatarSize='30px'
            footerPs='37px'
            comments={currentComments}
            authorId={userId}
            currentUserId={user?.userId}
            likes={comment.likes}
            value={comment.value}
            createdAt={comment.createdAt}
            currentUserProfile={
              getUserProfileData(profileData, comment.userId) as UserProfileData
            }
            userId={comment.userId}
            postId={id}
            commentId={comment.commentId}
            edited={comment.edited}
            editedAt={comment.editedAt}
          />
          {Object.values(comment.replies).length !== 0 &&
            repliedComment(comment.replies).map((item: ReplyData) => (
              <CommentItem
                key={item.commentId}
                comments={currentComments}
                authorId={userId}
                currentUserId={user?.userId}
                likes={item.likes}
                ps='20px'
                avatarSize='28px'
                footerPs='35px'
                value={item.value}
                createdAt={item.createdAt}
                currentUserProfile={
                  getUserProfileData(
                    profileData,
                    item.userId
                  ) as UserProfileData
                }
                repliedUserName={
                  getUserProfileData(profileData, item.repliedUserId)?.name ||
                  ''
                }
                userId={item.userId}
                postId={id}
                commentId={item.commentId}
                edited={item.edited}
                editedAt={item.editedAt}
                reply={true}
              />
            ))}
        </Box>
      ))}
    </Box>
  );
};

export default AllComments;
