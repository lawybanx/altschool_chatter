import React, { useEffect } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/auth';
import ProfileBioCard from '../components/ProfileBioCard';
import PostItem from '../../posts/components/PostItem';
import Error from '../../../shared/components/Error';
import { calcTotalDiscussion } from '../../comments/utils/calculateTotal';

const Profile = () => {
  const location = useLocation();
  const { username } = useParams();
  const user = useAuth();

  useEffect(() => window.scrollTo(0, 0), [location]);

  const { modifiedData } = useSelector(state => state.modifiedData);

  const { profileData, profileDataLoading } = useSelector(
    state => state.profileData
  );

  let currentUserProfile = null;
  let userId;
  let userPosts = null;

  if (profileData) {
    currentUserProfile = profileData.find(data => data.username === username);

    userId = currentUserProfile?.id;
  }

  if (!currentUserProfile && !profileDataLoading) {
    return <Error />;
  }

  if (modifiedData) {
    userPosts = modifiedData
      .filter(
        postData =>
          postData.userId === userId && !postData.draft && !postData.pinned
      )
      .sort((a, b) => b.createdAt - a.createdAt);
  }

  return (
    <Box mt='-.5rem !important' w='100%' flex='1'>
      <Box h={['7rem', '7rem', '9rem']} background={'#1e293b'} />
      <Box mx={{ base: 'none', md: '.5rem' }}>
        <Box maxW='1000px' mx='auto'>
          <ProfileBioCard profileData={currentUserProfile} />
          <Flex mt='2rem'>
            <Box
              flex={{ base: 'unset', md: '2' }}
              borderRadius='5px'
              w='100%'
              px='1rem'
            >
              {userPosts &&
                userPosts.map(postData => (
                  <PostItem
                    key={postData.id}
                    name={postData.name}
                    username={postData.username}
                    profile={postData.profile}
                    id={postData.id}
                    createdAt={postData.createdAt}
                    title={postData.title}
                    tags={postData.tags}
                    readTime={postData.readTime}
                    isUpdated={postData?.updated}
                    userId={postData.userId}
                    currentUserId={user?.userId}
                    currentUserProfile={currentUserProfile}
                    comments={calcTotalDiscussion(postData.comments)}
                    bookmark={postData.bookmark}
                    alreadyBookmarked={postData.bookmark?.includes(
                      user?.userId
                    )}
                    likes={postData.likes}
                  />
                ))}
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
