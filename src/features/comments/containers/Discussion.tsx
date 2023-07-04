import React, { RefObject } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import DiscussionBox from '../components/DiscussionBox';
import { calcTotalDiscussion } from '../utils/calculateTotal';
import { CommentData } from '../../../types/commentData.types';

interface DiscussionProps {
  postId: string;
  comments: CommentData[];
  discussionBoxRef: RefObject<HTMLDivElement>;
}

const Discussion: React.FC<DiscussionProps> = ({
  postId,
  comments,
  discussionBoxRef,
}) => {
  return (
    <Box mt='1.5rem' ref={discussionBoxRef} p={{ base: '1rem', md: '1.5rem' }}>
      <Heading fontSize={{ base: '1.7rem', md: '2rem' }} mb={3}>
        Discussion ({calcTotalDiscussion(comments)})
      </Heading>
      <DiscussionBox postId={postId} />
    </Box>
  );
};

export default Discussion;
