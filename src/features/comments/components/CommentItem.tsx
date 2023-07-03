import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  HStack,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { ReactionButton } from '../../../shared/utils/Buttons';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai';
import { dateFormat, showEditedDate } from '../../../helper/calcTimestamp';
import CustomAvatar from '../../../shared/utils/CustomAvatar';
import { useNavigate } from 'react-router-dom';
import DiscussionBox from './DiscussionBox';
import useClickLikeToComment from '../hooks/useClickLikeToComment';
import ManageComment from '../utils/ManageComment';
import { FiCornerLeftUp } from 'react-icons/fi';
import MarkdownRenderer from '../../posts/utils/MarkdownRenderer';
import { CommentData } from '../../../types/commentData.types';

interface CommentItemProps {
  ps?: any;
  footerPs?: any;
  avatarSize?: string;
  comments: CommentData[];
  authorId: string;
  currentUserId: string | any;
  likes: string[] | any;
  value: string;
  createdAt: { seconds: number };
  currentUserProfile?: any;
  userId: string;
  postId: string;
  commentId: string;
  edited?: boolean;
  editedAt: { seconds: number } | any;
  reply?: boolean;
  repliedUserName?: string;
}

const CommentItem: React.FC<CommentItemProps> = ({
  avatarSize,
  ps,
  footerPs,
  comments,
  authorId,
  currentUserId,
  likes,
  value,
  createdAt,
  currentUserProfile,
  userId,
  postId,
  commentId,
  edited,
  editedAt,
  reply,
  repliedUserName,
}) => {
  const navigate = useNavigate();

  const [showDiscussionBox, setShowDiscussionbox] = useState(false);

  const { handleClickLike, updatingLike } = useClickLikeToComment(
    currentUserId,
    postId
  );

  const handleViewProfile = (username: string) => {
    navigate(`/${username}`);
  };

  const totalLike = likes.length;
  const alreadyLiked = likes.includes(currentUserId || '');

  const handleshowDiscussionBox = () => {
    setShowDiscussionbox(prev => !prev);
  };

  useEffect(() => {
    if (showDiscussionBox) {
      const editor = document.querySelector<HTMLInputElement>(
        `#comment${commentId} .sec-md .input`
      );
      editor?.focus();
    }
  }, [showDiscussionBox, commentId]);

  const reactionIconColor = useColorModeValue('#3d3d3d', '#d6d6d7');
  const ghostColor = useColorModeValue('light.ghostColor', 'dark.ghostColor');
  const colorHover = useColorModeValue('light.colorHover', 'dark.colorHover');
  const colorTertiary = useColorModeValue(
    'light.colorTertiary',
    'dark.colorTertiary'
  );
  const replyToColor = useColorModeValue('#8f8f8f', 'dark.colorTertiary');

  return (
    <VStack mb={['.7rem', '1rem']} ps={ps} id={`comment${commentId}`}>
      <Flex align='flex-start' w='100%'>
        <CustomAvatar
          size={avatarSize}
          profile={currentUserProfile?.profile}
          onClick={() => handleViewProfile(currentUserProfile.username)}
        />

        <Box
          boxShadow={useColorModeValue(
            '0 0 0 1px rgb(23 23 23 / 13%)',
            '0 0 0 1px rgb(255 255 255 / 15%)'
          )}
          p={{ base: '.5rem .7rem', sm: '.5rem 1rem' }}
          borderRadius='5px'
          _hover={{
            '.more-icon': { fill: reactionIconColor },
            '.arrow-up': { color: reactionIconColor },
          }}
          w='100%'
          flex='1'
          ms='.5rem'
          overflow='hidden'
        >
          <Flex justify='space-between' mb={2}>
            <HStack align='center' spacing='2px'>
              <Text
                fontSize='15px'
                fontWeight='900'
                cursor='pointer'
                color={ghostColor}
                _hover={{ color: colorHover }}
                onClick={() => handleViewProfile(currentUserProfile.username)}
              >
                {currentUserProfile.name}
              </Text>

              <Text fontSize='12px' color={colorTertiary}>
                {' '}
                • {dateFormat(createdAt)}{' '}
                {edited && (
                  <Text as='span'>
                    {showEditedDate(createdAt, editedAt)
                      ? `• Edited on ${dateFormat(editedAt)}`
                      : '• Edited'}
                  </Text>
                )}
              </Text>
            </HStack>

            {currentUserId === userId && (
              <ManageComment
                commentId={commentId}
                postId={postId}
                comments={comments}
              />
            )}
          </Flex>

          <Box
            fontSize={{ base: '14px', sm: '16px' }}
            sx={{ p: { marginBottom: '5px !important' } }}
          >
            {reply && repliedUserName !== currentUserProfile.name && (
              <Text
                as='div'
                fontSize='13px'
                color={replyToColor}
                mt='-7px !important'
                mb='.5rem !important'
              >
                <FiCornerLeftUp
                  className='arrow-up'
                  style={{ display: 'inline-block' }}
                />{' '}
                reply to {repliedUserName}
              </Text>
            )}
            <MarkdownRenderer content={value} />
          </Box>
        </Box>
      </Flex>

      <Box w='100%' ps={footerPs} mt='.3rem !important'>
        {!showDiscussionBox && (
          <HStack justify='flex-start'>
            <ReactionButton
              value={totalLike < 1 ? '' : totalLike}
              text={totalLike < 1 ? '' : totalLike > 1 ? 'likes' : 'like'}
              disabled={updatingLike}
              onClick={() => handleClickLike(comments, commentId)}
            >
              {alreadyLiked ? (
                <AiFillHeart size={25} color={colorTertiary} />
              ) : (
                <AiOutlineHeart size={25} color={colorTertiary} />
              )}
            </ReactionButton>

            <ReactionButton text='reply' onClick={handleshowDiscussionBox}>
              <AiOutlineMessage size={25} color={colorTertiary} />
            </ReactionButton>
          </HStack>
        )}

        {showDiscussionBox && (
          <DiscussionBox
            postId={postId}
            showDismiss={true}
            onDismiss={handleshowDiscussionBox}
            commentId={commentId}
            repliedUserId={userId}
          />
        )}
      </Box>
    </VStack>
  );
};

export default CommentItem;
