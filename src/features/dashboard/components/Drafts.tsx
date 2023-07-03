import React from 'react';
import { Box, Divider } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useAuth } from '../../../context/auth';
import NoDataMessage from '../utils/NoDataMessage';
import PostCard from '../utils/PostCard';
import { sortPosts } from '../../posts/utils/sortPosts';
import { RootState } from '../../../types/rootState.types';
import { PostData } from '../../../types/postData.types';

const Drafts: React.FC = () => {
  const user = useAuth();

  const {
    modifiedData,
    modifiedDataLoading: loading,
    modifiedDataErr: err,
  } = useSelector((state: RootState) => state.modifiedData);

  if (!user) {
    // If user is null, return null or a placeholder component
    return null;
  }

  const { userId } = user;

  let draftPosts: any;
  if (modifiedData && !loading && !err) {
    draftPosts = modifiedData.filter(
      (postData: PostData) => postData.userId === userId && postData.draft
    );
  }

  if (draftPosts.length === 0 && !loading && !err) {
    return <NoDataMessage title={`You have not saved any draft yet.`} />;
  }

  draftPosts = sortPosts(null, draftPosts, null);

  return (
    <Box borderRadius='2px' className='shadow'>
      {draftPosts &&
        draftPosts.map((post: any) => (
          <Box key={post.id}>
            <PostCard
              title={post.title}
              isDraft={post.draft}
              // createdAt={post.createdAt}
              updatedAt={post.updatedAt}
              likes={post.likes}
              comments={post.comments}
              // views={null}
              bookmark={post.bookmark}
              username={post.username}
              id={post.id}
            />
            <Divider w='100%' />
          </Box>
        ))}
    </Box>
  );
};

export default Drafts;
