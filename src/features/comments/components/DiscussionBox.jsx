import React, { useState } from 'react';
import { Box, HStack } from '@chakra-ui/react';
import { PrimaryBtn, SecondaryBtn } from '../../../shared/utils/Buttons';
import { updateComment } from '../../../lib/api';
import { useSelector } from 'react-redux';
import { Timestamp } from 'firebase/firestore';
import { useAuth } from '../../../context/auth';
import { nanoid } from '@reduxjs/toolkit';
import { removeFromLocalStorage } from '../../../helper/localStorage';
import MarkdownEditor from '../../posts/components/MarkdownEditor';

const DiscussionBox = ({
  postId,
  commentId,
  showDismiss,
  onDismiss,
  valueToEdit,
  transformedComments,
  repliedUserId,
}) => {
  const user = useAuth();

  const { modifiedData } = useSelector(state => state.modifiedData);

  const [submitting, setSubmitting] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [MDEValue, setMDEValue] = useState(valueToEdit || '');

  const comments = modifiedData?.find(data => data.id === postId)?.comments;

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitting(true);

    const createdAt = Timestamp.now();
    const newComment = {
      value: MDEValue,
      replies: {},
      createdAt,
      userId: user.userId,
      commentId: nanoid(),
      likes: [],
    };

    let modifiedComments = [];

    if (valueToEdit) {
      modifiedComments = transformedComments(comments, MDEValue);
    } else if (commentId) {
      modifiedComments = comments.map(comment =>
        comment.commentId === commentId ||
        Object.values(comment.replies).find(cmt => cmt.commentId === commentId)
          ? {
              ...comment,
              replies: {
                ...comment.replies,
                [nanoid()]: {
                  ...newComment,
                  repliedUserId,
                  repliedCommentId: commentId,
                },
              },
            }
          : comment
      );
    } else {
      modifiedComments = [...comments, newComment];
    }

    updateComment(modifiedComments, postId)
      .then(_ => {
        setSubmitting(false);
        setMDEValue('');
        onDismiss && setTimeout(onDismiss, 100); // need new state value ('submitting = false') to disable || enable to MDE after state change

        removeFromLocalStorage('commentItemToManage');
      })
      .catch(err => {
        setSubmitting(false);
        console.log(err);
      });
  };

  return (
    <Box>
      <Box w='100%' mt='1rem !important'>
        <MarkdownEditor
          MDEValue={MDEValue}
          setMDEValue={setMDEValue}
          isSubmitting={submitting}
          setUploadingImg={setUploadingImg}
          h='200px'
        />
      </Box>

      {/* buttons */}
      <HStack justify='flex-end' w='100%' my='.5rem'>
        {showDismiss && (
          <SecondaryBtn
            onClick={onDismiss}
            loading={uploadingImg || submitting}
          >
            Dismiss
          </SecondaryBtn>
        )}

        <PrimaryBtn
          onClick={handleSubmit}
          bg='light.primary'
          isLoading={uploadingImg || submitting}
          isLoadingText={submitting && 'Submitting'}
        >
          Submit
        </PrimaryBtn>
      </HStack>
    </Box>
  );
};

export default DiscussionBox;
