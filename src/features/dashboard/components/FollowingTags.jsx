import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import { nanoid } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { useAuth } from '../../../context/auth';
import TagItem from '../../tags/components/TagItem';
import NoDataMessage from '../utils/NoDataMessage';

const FollowingTags = () => {
  const user = useAuth();

  const { profileData, profileDataLoading } = useSelector(
    state => state.profileData
  );

  const followingTags =
    profileData?.find(userData => userData.id === user?.userId)
      ?.followingTags || [];

  if (!followingTags.length) {
    return <NoDataMessage title={`You don't follow any tags yet...`} />;
  }

  return (
    <SimpleGrid columns={{ base: 2, md: 3 }} spacing={2}>
      {followingTags.map(tag => (
        <TagItem
          tagName={tag}
          key={nanoid()}
          profileData={profileData}
          profileDataLoading={profileDataLoading}
        />
      ))}
    </SimpleGrid>
  );
};

export default FollowingTags;
