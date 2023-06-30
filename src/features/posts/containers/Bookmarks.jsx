import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import PostItem from '../components/PostItem';
import { getUserProfileData } from '../../../helper/getUserProfileData';
import { useAuth } from '../../../context/auth';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Bookmarks = () => {
  const user = useAuth();

  const {
    modifiedData,
    modifiedDataLoading: loading,
    modifiedDataError: err,
  } = useSelector(state => state.modifiedData);

  const profileData = useSelector(state => state.profileData.profileData);

  let allPosts = [];

  if (modifiedData) {
    allPosts = modifiedData.filter(postItem =>
      postItem.bookmark?.includes(user?.userId)
    );
  }

  const bookmarkedPostsData = allPosts.map(postItem => {
    const { userId } = postItem;
    const currentUserProfile = getUserProfileData(profileData, userId);

    return {
      ...postItem,
      currentUserProfile,
    };
  });

  if (!user) {
    return <Navigate to='/create-account' replace />;
  }

  return (
    <Box flex='2'>
      <Box
        fontSize='2xl'
        fontWeight='bold'
        textAlign='center'
        p='5'
        border='1px solid #ccc'
        mb='5'
        borderRadius='lg'
      >
        <Heading as='h1' fontSize='2xl' fontWeight='bold'>
          Bookmarks
        </Heading>
        <Text fontSize='lg' color='gray.500'>
          All articles you have bookmarked
        </Text>
      </Box>

      {bookmarkedPostsData.length === 0 ? (
        <Box
          fontSize='2xl'
          fontWeight='bold'
          textAlign='center'
          p='5'
          border='1px solid #ccc'
          mb='5'
          borderRadius='lg'
        >
          <Heading as='h1' fontSize='2xl' fontWeight='bold'>
            No bookmarks yet
          </Heading>
          <Text fontSize='lg' color='gray.500'>
            You haven’t bookmarked any posts yet
          </Text>

          <Text fontSize='lg' color='gray.500'>
            When you do, they’ll show up here.
          </Text>
        </Box>
      ) : (
        bookmarkedPostsData.map(postData => (
          <PostItem
            key={postData.id}
            name={postData.name}
            username={postData.username}
            profile={postData.profile}
            coverImg={postData.cvImg}
            id={postData.id}
            createdAt={postData.createdAt}
            title={postData.title}
            tags={postData.tags}
            readTime={postData.readTime}
            isUpdated={postData?.updated}
            userId={postData.userId}
            currentUserId={user?.userId}
            currentUserProfile={getUserProfileData(
              profileData,
              postData.userId
            )}
            bookmark={postData.bookmark}
            alreadyBookmarked={postData.bookmark?.includes(user?.userId)}
            likes={postData.likes}
          />
        ))
      )}
    </Box>
  );
};

export default Bookmarks;
