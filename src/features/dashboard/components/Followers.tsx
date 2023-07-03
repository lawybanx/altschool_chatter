import { Box } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from '../../../context/auth';
import Card from '../utils/Card';
import NoDataMessage from '../utils/NoDataMessage';

const Followers: React.FC = () => {
  const user = useAuth();
  const { profileData } = useSelector((state: any) => state.profileData);

  if (!user) {
    // If user is null, return null or a placeholder component
    return null;
  }

  const followerId =
    profileData
      ?.find((userData: any) => userData.id === user.userId)
      ?.followers?.map((id: string) => id) || [];

  const followers = profileData?.filter((userData: any) =>
    followerId.includes(userData.id)
  );

  if (!followers?.length) {
    return <NoDataMessage title={`You don't have any followers yet.`} />;
  }

  return (
    <Box
      display='grid'
      gridTemplateColumns={{
        sm: 'repeat(2, minmax(0, 1fr))',
        lg: 'repeat(3, minmax(0, 1fr))',
      }}
      gap={{ sm: '.7rem' }}
    >
      {followers.map((userData: any) => (
        <Card
          key={userData.id}
          name={userData.name}
          username={userData.username}
          profile={userData.profile}
        />
      ))}
    </Box>
  );
};

export default Followers;
