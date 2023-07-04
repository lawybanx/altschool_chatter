import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useAuth } from '../../../context/auth';
import { getUserProfileData } from '../../../helper/getUserProfileData';
import PostItem from '../../posts/components/PostItem';
import { getPostsByTag } from '../../../helper/getPostsByTag';
import { calcTotalDiscussion } from '../../comments/utils/calculateTotal';
import { PostData } from '../../../types/postData.types';
import { ProfileData } from '../../../types/profileData.types';
import { RootState } from '../../../types/rootState.types';

const TagDetails = () => {
  const user = useAuth();
  const { tagname } = useParams<{ tagname: string }>();

  const tagnames = [tagname];

  const {
    modifiedData,
    modifiedDataLoading: loading,
    modifiedDataErr: err,
  } = useSelector((state: RootState) => state.modifiedData);

  const {
    profileData,
    // profileDataLoading
  } = useSelector((state: RootState) => state.profileData);

  let posts: PostData[] = [];

  if (modifiedData && !loading && !err) {
    posts = modifiedData.filter((postData: PostData) => !postData.draft);
  }

  const tagPosts = getPostsByTag(tagnames, posts);

  const renderPosts = () => {
    return tagPosts.map((postData: PostData) => {
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
          {tagname}
        </Heading>
        <Text fontSize='lg' color='gray.500'>
          {tagPosts.length} posts
        </Text>
      </Box>
      {renderPosts()}
    </Box>
  );
};

export default TagDetails;
