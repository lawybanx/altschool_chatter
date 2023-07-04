import React, { useEffect } from 'react';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DetailContent from '../components/DetailContent';
import { useAuth } from '../../../context/auth';
import { getUserProfileData } from '../../../helper/getUserProfileData';
import { RootState } from '../../../types/rootState.types';
import { PostData } from '../../../types/postData.types';
import { addView } from '../../../lib/api';

const PostDetails: React.FC = () => {
  const { title } = useParams<{ title: string }>();
  const user = useAuth();

  // get postId from (title + postId)
  const param = title!.split('_');
  const postId = param[param.length - 1];

  useEffect(() => {
    addView(postId);
  }, [postId]);

  const {
    modifiedData,
    modifiedDataLoading: loading,
    modifiedDataErr: err,
  } = useSelector((state: RootState) => state.modifiedData);

  const { profileData } = useSelector((state: RootState) => state.profileData);

  let postDetail: PostData[] | any = [];

  postDetail = modifiedData?.find(
    (postData: PostData) => postData.id === postId
  );

  // const currentUserProfile = profileData?.find(
  //   data => data.id === postDetail?.userId
  // );

  const bgColor = useColorModeValue('light.cardBg', 'dark.cardBg');

  if (!postDetail && loading) {
    return <Text>Loading...</Text>;
  }

  if (!postDetail && err) {
    return <Text>Deleting post...</Text>;
  }

  if (!postDetail) {
    // Handle the case where the post is not found
    return <Text>Post not found.</Text>;
  }

  return (
    <Box
      w='100%'
      maxW='1280px'
      justifyContent='center'
      mt='-.6rem'
      bg={bgColor}
    >
      <DetailContent
        name={postDetail.name}
        username={postDetail.username}
        profile={postDetail.profile}
        cvImg={postDetail.cvImg}
        id={postDetail.id}
        MDEValue={postDetail.MDEValue}
        createdAt={postDetail.createdAt}
        updatedAt={postDetail.editedAt}
        title={postDetail.title}
        tags={postDetail.tags}
        draft={postDetail.draft}
        readTime={postDetail.readTime}
        updated={postDetail?.updated}
        userId={postDetail.userId}
        currentUserId={user?.userId}
        currentUserProfile={getUserProfileData(profileData, postDetail.userId)}
        bookmark={postDetail.bookmark}
        alreadyBookmarked={
          postDetail.bookmark &&
          postDetail.bookmark.includes(user?.userId as string)
        }
        likes={postDetail.likes}
        comments={postDetail.comments}
      />
    </Box>
  );
};

export default PostDetails;
