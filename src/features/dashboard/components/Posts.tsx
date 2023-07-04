import React from 'react';
import { Box, Divider } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useAuth } from '../../../context/auth';
import NoDataMessage from '../utils/NoDataMessage';
import PostCard from '../utils/PostCard';
import { sortPosts } from '../../posts/utils/sortPosts';
import { calcTotalDiscussion } from '../../comments/utils/calculateTotal';

const Posts: React.FC = () => {
  const user = useAuth();
  const userId = user?.userId ?? '';

  const {
    modifiedData,
    modifiedDataLoading: loading,
    modifiedDataErr: err,
  } = useSelector((state: any) => state.modifiedData);

  let publishedPosts: any;
  if (modifiedData && !loading && !err) {
    publishedPosts = modifiedData.filter(
      (postData: any) => postData.userId === userId && !postData.draft
    );
  }

  if (publishedPosts && publishedPosts.length === 0 && !loading && !err) {
    return (
      <NoDataMessage
        title={`This is where you can manage your posts, but you haven't written anything yet.`}
      />
    );
  }

  publishedPosts = sortPosts(null, publishedPosts, null);

  return (
    <Box borderRadius='2px' className='shadow'>
      {publishedPosts &&
        publishedPosts.map((post: any) => (
          <Box key={post.id}>
            <PostCard
              title={post.title}
              isDraft={post.draft}
              createdAt={post.createdAt}
              updatedAt={post.updatedAt}
              likes={post.likes}
              comments={calcTotalDiscussion(post.comments)}
              views={post.views}
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

export default Posts;
