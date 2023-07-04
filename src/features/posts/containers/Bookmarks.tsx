import { Box, Heading, Text } from '@chakra-ui/react';
import PostItem from '../components/PostItem';
import { getUserProfileData } from '../../../helper/getUserProfileData';
import { useAuth } from '../../../context/auth';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { calcTotalDiscussion } from '../../comments/utils/calculateTotal';
import { RootState } from '../../../types/rootState.types';
import { PostData } from '../../../types/postData.types';
import { ProfileData } from '../../../types/profileData.types';

const Bookmarks = () => {
  const user = useAuth();

  const {
    modifiedData,
    // modifiedDataLoading: loading,
    // modifiedDataErr: err,
  } = useSelector((state: RootState) => state.modifiedData);

  const profileData = useSelector(
    (state: RootState) => state.profileData.profileData
  );

  let allPosts: any[] = [];

  if (modifiedData) {
    allPosts = modifiedData.filter((postItem: any) =>
      postItem.bookmark?.includes(user?.userId)
    );
  }

  const bookmarkedPostsData = allPosts.map((postItem: any) => {
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

  const renderPosts = () => {
    return bookmarkedPostsData.map((postData: PostData) => {
      const userProfileData = profileData?.find(
        (userData: ProfileData) => userData.id === postData.userId
      );

      const { name, profile, username } = userProfileData || {};

      return (
        <PostItem
          key={postData.id}
          name={name}
          username={username}
          profile={profile}
          cvImg={postData.cvImg}
          id={postData.id}
          createdAt={postData.createdAt}
          title={postData.title}
          tags={postData.tags}
          readTime={postData.readTime}
          updated={postData?.updated}
          userId={postData.userId}
          currentUserId={user?.userId}
          currentUserProfile={getUserProfileData(profileData, postData.userId)}
          bookmark={postData.bookmark}
          alreadyBookmarked={
            postData.bookmark &&
            postData.bookmark.includes(user?.userId as string)
          }
          likes={postData.likes}
          comments={calcTotalDiscussion(postData.comments)}
        />
      );
    });
  };

  return (
    <Box flex='2' maxW={{ base: '100%', md: '650px' }}>
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
        renderPosts()
      )}
    </Box>
  );
};

export default Bookmarks;
