import React from 'react';
import { Box, Tabs, Tab, TabList, TabPanel, TabPanels } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/auth';
import { getUserProfileData } from '../../../helper/getUserProfileData';
import PostItem from '../components/PostItem';
import { sortPosts } from '../utils/sortPosts';
import ErrorMessage from '../../../shared/components/ErrorMessage';
import { calcTotalDiscussion } from '../../comments/utils/calculateTotal';
import { RootState } from '../../../types/rootState.types';
import { PostData } from '../../../types/postData.types';
import { ProfileData } from '../../../types/profileData.types';

const Feeds: React.FC = () => {
  const user = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    modifiedData,
    modifiedDataLoading: loading,
    modifiedDataErr: err,
  } = useSelector((state: RootState) => state.modifiedData);

  const profileData = useSelector(
    (state: RootState) => state.profileData.profileData
  );

  let allPosts: PostData[] = [];

  if (modifiedData && !loading && !err) {
    allPosts = modifiedData.filter((postData: PostData) => !postData.draft);
  }

  const queryParam = new URLSearchParams(location.search);
  const sortQueryParams = queryParam.get('sort');

  const followingTags =
    profileData?.find((userData: ProfileData) => userData.id === user?.userId)
      ?.followingTags || [];

  const sortedPosts = sortPosts(sortQueryParams, allPosts, followingTags);

  const handleClickNavItem = (value: string) => {
    navigate(`/?sort=${value}`);
  };

  const renderPosts = () => {
    return sortedPosts.map((postData: PostData) => {
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

  const tabs = [
    { label: 'Latest', value: 'latest' },
    { label: 'For you', value: 'followingTags' },
    { label: 'Top', value: 'top' },
  ];

  return (
    <Box flex='2' maxW={{ base: '100%', md: '650px' }}>
      <Tabs
        isLazy
        index={
          sortQueryParams === 'followingTags'
            ? 1
            : sortQueryParams === 'top'
            ? 2
            : 0
        }
      >
        <TabList>
          {tabs.map(tab => (
            <Tab key={tab.value} onClick={() => handleClickNavItem(tab.value)}>
              {tab.label}
            </Tab>
          ))}
        </TabList>
        {!loading && !profileData && <ErrorMessage />}
        <TabPanels>
          {tabs.map(tab => (
            <TabPanel key={tab.value} px={{ base: '0', md: '0 1rem' }}>
              {renderPosts()}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Feeds;
