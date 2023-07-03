import React from 'react';
import { Box, Heading, HStack, Select } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Menu from '../utils/Menu';
import Content from '../utils/Content';
// import DashboardSkeleton from '../components/skeletons/DashboardSkeleton';
import { useAuth } from '../../../context/auth';
import { RootState } from '../../../types/rootState.types';
import { PostData } from '../../../types/postData.types';

const Dashboard: React.FC = () => {
  const user = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    modifiedData,
    modifiedDataLoading: loading,
    modifiedDataErr: err,
  } = useSelector((state: RootState) => state.modifiedData);

  if (!user) {
    return <Navigate to='/create-account' replace />;
  }

  let publishedPosts: any;
  let draftPosts: any;
  
  if (modifiedData && !loading && !err) {
    publishedPosts = modifiedData.filter(
      (postData: PostData) => postData.userId === user.userId && !postData.draft
    );

    draftPosts = modifiedData.filter(
      (postData: PostData) => postData.userId === user.userId && postData.draft
    );
  }

  // if (loading) {
  //   return <DashboardSkeleton />;
  // }

  const totalPublishedPosts = publishedPosts?.length;
  const totalDraftPosts = draftPosts?.length;

  const selectedMenu = location.pathname.split('/').slice(2, 3).join('');

  const handleSelect = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    const pathname = target.value.toLowerCase();
    if (pathname === 'posts') {
      navigate('/dashboard');
      return;
    }

    navigate(`/dashboard/${pathname}`);
  };

  return (
    <Box w='100%' maxW='1280px' flex={1} p={{ md: '.5rem', xl: '1rem' }}>
      {!loading && !err && (
        <>
          <Box px={['.5rem', '.5rem', '0']} mb={3}>
            <Heading fontSize={{ base: '1.5rem', md: '1.8rem' }} mb='.5rem'>
              Dashboard
            </Heading>

            <Select
              display={['block', 'block', 'none']}
              mt='.5rem'
              onChange={handleSelect}
              value={selectedMenu}
            >
              <option value='posts'>Posts</option>
              <option value='drafts'>Drafts</option>
              <option value='following'>Following</option>
              <option value='followers'>Followers</option>
              <option value='following_tags'>Following Tags</option>
            </Select>
          </Box>

          <HStack align='flex-start'>
            <Menu
              totalPublishedPosts={totalPublishedPosts}
              totalDraftPosts={totalDraftPosts}
            />
            <Content />
          </HStack>
        </>
      )}
    </Box>
  );
};

export default Dashboard;
