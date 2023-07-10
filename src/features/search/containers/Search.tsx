import { Box, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from '../../../context/auth';
import { calcTotalDiscussion } from '../../comments/utils/calculateTotal';
import { getUserProfileData } from '../../../helper/getUserProfileData';
import useGetQuerySearchTerm from '../hooks/useGetQuerySearchTerm';
import ErrorMessage from '../../../shared/components/ErrorMessage';
import PostItem from '../../posts/components/PostItem';
import SearchInput from '../components/SearchInput';
import { RootState } from '../../../types/rootState.types';
import { PostData } from '../../../types/postData.types';
import { ProfileData } from '../../../types/profileData.types';

const Search: React.FC = () => {
  const user = useAuth();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const querySearchTerm = useGetQuerySearchTerm('spq') || '';

  // scroll top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [querySearchTerm]);

  const {
    modifiedData,
    modifiedDataLoading: loading,
    modifiedDataErr: err,
  } = useSelector((state: RootState) => state.modifiedData);

  const { profileData } = useSelector((state: RootState) => state.profileData);

  let allPostData: PostData[] = [];
  if (modifiedData && !loading && !err) {
    allPostData = modifiedData.filter((postData: PostData) => !postData.draft);
  }

  const searchedPostData: PostData[] | null = allPostData?.filter(
    (postData: PostData) =>
      postData.title.toLowerCase().includes(querySearchTerm.toLowerCase()) ||
      postData.name.toLowerCase().includes(querySearchTerm.toLowerCase())
  );

  const searchTermColor = useColorModeValue(
    'light.headingHover',
    'dark.headingHover'
  );
  const cardBg = useColorModeValue('light.cardBg', 'dark.cardBg');

  const renderPosts = (): JSX.Element[] => {
    if (searchedPostData) {
      return searchedPostData.map((postData: PostData) => {
        const userProfileData: ProfileData | undefined = profileData?.find(
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
            currentUserProfile={getUserProfileData(
              profileData,
              postData.userId
            )}
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
    }

    return [];
  };

  if (err) {
    return <ErrorMessage />;
  }

  return (
    <Box flex={1} maxW={{ base: '100%', md: '650px' }} w='100%'>
      <SearchInput
        ref={searchInputRef}
        querySearchTerm={querySearchTerm}
        display={{ base: 'block', md: 'none' }}
        mb='1rem'
        route='search'
      />

      {searchedPostData && searchedPostData.length !== 0 ? (
        <Box p={{ base: '1rem', md: '0' }}>
          {querySearchTerm && (
            <Heading
              fontSize={{ base: '1.3rem', md: '1.5rem' }}
              mb={4}
              display={{ base: 'none', md: 'block' }}
            >
              Search results for '{' '}
              <Text as='span' color={searchTermColor}>
                {querySearchTerm}
              </Text>{' '}
              '
            </Heading>
          )}
          {renderPosts()}
        </Box>
      ) : (
        <Box
          mt={5}
          p='5rem 1rem'
          textAlign='center'
          borderRadius='5px'
          bg={cardBg}
          className='shadow'
        >
          No results match that query 🤔
        </Box>
      )}
    </Box>
  );
};

export default Search;
