import { Box } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from '../../../context/auth';
import Card from '../utils/Card';
import NoDataMessage from '../utils/NoDataMessage';

const Following = () => {
  const user = useAuth();
  const { profileData } = useSelector(state => state.profileData);

  const following = profileData?.filter(userData =>
    userData.followers?.includes(user.userId)
  );

  if (!following.length) {
    return <NoDataMessage title={`You don't follow any users`} />;
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
      {following.map(userData => (
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

export default Following;
