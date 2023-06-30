import React from 'react';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DetailContent from '../components/DetailContent';

const PostDetails = () => {
  const { title } = useParams();

  // get postId from (title + postId)
  const param = title.split('_');
  const postId = param[param.length - 1];

  const {
    modifiedData,
    modifiedDataLoading: loading,
    modifiedDataErr: err,
  } = useSelector(state => state.modifiedData);

  const { profileData } = useSelector(state => state.profileData);

  const postDetail = modifiedData?.find(postData => postData.id === postId);

  const currentUserProfile = profileData?.find(
    data => data.id === postDetail?.userId
  );

  return (
    <Box
      w='100%'
      maxW='1280px'
      justifyContent='center'
      mt='-.6rem'
      bg={useColorModeValue('light.cardBg', 'dark.cardBg')}
    >
      {!postDetail && loading ? (
        <Text>Loading...</Text>
      ) : (
        <DetailContent
          postDetail={postDetail}
          loading={loading}
          err={err}
          currentUserProfile={currentUserProfile}
        />
      )}
    </Box>
  );
};
export default PostDetails;
