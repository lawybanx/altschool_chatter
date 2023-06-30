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

const Feeds = () => {
  const user = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    modifiedData,
    modifiedDataLoading: loading,
    modifiedDataError: err,
  } = useSelector(state => state.modifiedData);

  const profileData = useSelector(state => state.profileData.profileData);

  let allPosts = [];

  if (modifiedData && !loading && !err) {
    allPosts = modifiedData.filter(postData => !postData.draft);
  }

  const queryParam = new URLSearchParams(location.search);
  const sortQueryParams = queryParam.get('sort');

  const followingTags =
    profileData?.find(userData => userData.id === user?.userId)
      ?.followingTags || [];

  const sortedPosts = sortPosts(sortQueryParams, allPosts, followingTags);

  const handleClickNavItem = value => {
    navigate(`/?sort=${value}`);
  };

  const renderPosts = () => {
    return sortedPosts.map(postData => (
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
        currentUserProfile={getUserProfileData(profileData, postData.userId)}
        bookmark={postData.bookmark}
        alreadyBookmarked={postData.bookmark?.includes(user?.userId)}
        likes={postData.likes}
        comments={calcTotalDiscussion(postData.comments)}
      />
    ));
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
