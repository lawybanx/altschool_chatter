import React, { useRef, useEffect } from 'react';
import {
  Box,
  Image,
  Flex,
  Text,
  Heading,
  HStack,
  Icon,
  useColorModeValue,
  Tag,
  Divider,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth } from '../../../context/auth';
import { AiOutlineRead } from 'react-icons/ai';
import { displayDate } from '../../../helper/calcTimestamp';
import CustomAvatar from '../../../shared/utils/CustomAvatar';
import ManagePost from '../utils/ManagePost';
import DetailCard from '../utils/DetailCard';
import MarkdownRenderer from '../utils/MarkdownRenderer';
import Discussion from '../../comments/containers/Discussion';
import AllComments from '../../comments/containers/AllComments';
import { calcTotalDiscussion } from '../../comments/utils/calculateTotal';
import { PostData } from '../../../types/postData.types';

interface DetailContentProps extends PostData {
  name?: string;
  username: string;
  profile?: string;
  currentUserId?: string | null;
  currentUserProfile?: any;
  alreadyBookmarked?: boolean;
}

const DetailContent: React.FC<DetailContentProps> = ({
  name,
  username,
  profile,
  cvImg,
  id,
  createdAt,
  updatedAt,
  title,
  MDEValue,
  draft,
  tags,
  readTime,
  updated,
  userId,
  currentUserId,
  currentUserProfile,
  bookmark,
  alreadyBookmarked,
  likes,
  comments,
}) => {
  const navigate = useNavigate();
  const user = useAuth();

  const discussionBoxRef = useRef<HTMLDivElement>(null);

  const { clickComment } = useSelector((state: any) => state.scrollDiscussion);

  // scroll to
  useEffect(() => {
    const scrollHeight =
      window.pageYOffset +
      (discussionBoxRef.current?.getBoundingClientRect().top || 0) -
      60;

    if (clickComment) {
      setTimeout(() => window.scrollTo({ top: scrollHeight }), 0);
    } else {
      window.scrollTo(0, 0);
    }
  }, [clickComment, id]);

  const dividerColor = useColorModeValue('light.cardBorder', 'dark.cardBorder');
  const headingColor = useColorModeValue('light.heading', 'dark.heading');

  const isAuthor = currentUserId === userId;

  if (!user) {
    return null;
  }

  const handleNavigateToProfile = (e: React.MouseEvent, username: string) => {
    e.stopPropagation();
    navigate(`/${username}`);
  };

  return (
    <Box w='900px' m='auto' maxW='100%'>
      {/* coverImage */}
      {cvImg && (
        <Image
          src={cvImg}
          alt='cover_image'
          maxH='500px'
          width='100%'
          p='1rem'
          borderTopLeftRadius={{ base: 'none', md: '5px' }}
          borderTopRightRadius={{ base: 'none', md: '5px' }}
          objectFit='cover'
        />
      )}

      {/* title */}
      <Box p='1rem'>
        <Heading
          as='h1'
          fontSize={{ base: '1.5rem', md: '2.5rem' }}
          fontWeight='bold'
          lineHeight='1.5'
          color={headingColor}
          mb='.2rem'
          alignSelf='center'
        >
          {title}
        </Heading>
      </Box>

      {/* custom avatar, user name, date, readtime */}
      <Flex align='center' pb='1rem'>
        <HStack spacing='1rem' px='1rem'>
          <CustomAvatar
            profile={profile}
            size='40px'
            onClick={e => handleNavigateToProfile(e, username)}
          />
          <Box flex='1' pt='3px'>
            <Text
              fontWeight={600}
              cursor='pointer'
              lineHeight={1.25}
              onClick={() => navigate(`/${username}`)}
            >
              {name}
            </Text>
          </Box>
          {/* draft */}

          {draft ? (
            <Tag bg='#F1C40F' size='sm' color='#000'>
              Draft
            </Tag>
          ) : (
            <>
              <Text fontSize='sm' color='gray.500'>
                {displayDate(createdAt)}
              </Text>
              <Flex alignItems='center'>
                <Icon as={AiOutlineRead} color='blue.500' />
                <Text fontSize='xs' ml={1} color='gray.500'>
                  {readTime} min read
                </Text>
              </Flex>
            </>
          )}
          {/* manage post if user */}
          {isAuthor && <ManagePost postId={id} />}
        </HStack>
      </Flex>
      <Box px='1rem'>
        {!draft && (
          <DetailCard
            tags={tags}
            userId={userId}
            id={id}
            currentUserId={user?.userId}
            likes={likes}
            comments={calcTotalDiscussion(comments)}
            bookmark={bookmark}
            alreadyBookmarked={alreadyBookmarked}
            alreadyLiked={likes?.includes(user.userId)}
          />
        )}
      </Box>
      <MarkdownRenderer content={MDEValue} />
      {MDEValue && MDEValue.length <= 1 ? (
        ''
      ) : (
        <Box pt='2rem' px='1rem'>
          {!draft && (
            <DetailCard
              tags={tags}
              userId={userId}
              id={id}
              currentUserId={user?.userId ?? ''}
              likes={likes}
              comments={calcTotalDiscussion(comments)}
              bookmark={bookmark}
              alreadyBookmarked={bookmark?.includes(user?.userId)}
              alreadyLiked={likes?.includes(user?.userId)}
            />
          )}
        </Box>
      )}

      {!draft && <Divider mt={7} h='1px' bg={dividerColor} mx='auto' />}

      {!draft && (
        <Discussion
          discussionBoxRef={discussionBoxRef}
          postId={id}
          comments={comments}
        />
      )}

      {comments.length !== 0 && (
        <AllComments id={id} userId={userId} comments={comments} />
      )}
    </Box>
  );
};

export default DetailContent;
