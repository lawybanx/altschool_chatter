import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  SimpleGrid,
  Stack,
  Flex,
  Text,
  Heading,
  Icon,
  HStack,
  Box,
  Link,
  useColorModeValue,
  Tag,
} from '@chakra-ui/react';
import { displayDate } from '../../../helper/calcTimestamp';
import { FiHeart, FiMessageSquare, FiEye } from 'react-icons/fi';
import { RiBookmarkLine } from 'react-icons/ri';
import { titleRoute } from '../../../helper/titleRoute';
import ManagePost from '../../posts/utils/ManagePost';

const PostCard = ({
  title,
  isDraft,
  createdAt,
  updatedAt,
  likes,
  comments,
  views,
  bookmark,
  username,
  id,
}) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/${titleRoute(username, title, id)}`);
  };

  return (
    <Box bg={useColorModeValue('light.cardBg', 'dark.cardBg')}>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing={2}
        p={2}
        alignItems='center'
      >
        <Stack direction='column' spacing={2} align='flex-start'>
          <Box>
            <Link
              style={{ textDecoration: 'none' }}
              _focus={{ boxShadow: 'none' }}
              _hover={{ color: 'light.primary' }}
              onClick={handleNavigate}
            >
              <Heading fontSize='md'>{title}</Heading>
            </Link>
          </Box>
          <Flex fontSize='xs' color='gray.500' fontWeight='medium'>
            {createdAt && <Text>Published: {displayDate(createdAt)}</Text>}
            {updatedAt && <Text ml={2}>Edited: {displayDate(updatedAt)}</Text>}
          </Flex>
        </Stack>
        <Flex justify='space-between'>
          <Flex>
            {isDraft ? (
              <Tag bg='#F1C40F' size='sm' color='#000'>
                Draft
              </Tag>
            ) : (
              <>
                <HStack mr={2}>
                  <Icon as={FiHeart} />
                  <Text>{likes.length || 0}</Text>
                </HStack>
                <HStack mr={2}>
                  <Icon as={FiMessageSquare} />
                  <Text>{comments || 0}</Text>
                </HStack>
                <HStack mr={2}>
                  <Icon as={RiBookmarkLine} />
                  <Text>{(bookmark && bookmark.length) || 0}</Text>
                </HStack>
                <HStack mr={2}>
                  <Icon as={FiEye} />
                  <Text>{(views && views.length) || 0}</Text>
                </HStack>
              </>
            )}
          </Flex>
          <Flex justify='flex-end'>
            <ManagePost postId={id} />
          </Flex>
        </Flex>
      </SimpleGrid>
    </Box>
  );
};

export default PostCard;
