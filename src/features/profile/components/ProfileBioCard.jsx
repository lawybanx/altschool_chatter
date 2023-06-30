import React from 'react';
import {
  Box,
  Heading,
  HStack,
  Image,
  Link,
  Text,
  useColorModeValue,
  Wrap,
} from '@chakra-ui/react';
import { BsGithub, BsTwitter } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { LightBtn, PrimaryBtn } from '../../../shared/utils/Buttons';
import { useAuth } from '../../../context/auth';
import defaultProfile from '../../../assets/images/default_profile.webp';
import { joinOnDate } from '../../../helper/calcTimestamp';
import useFollowUser from '../hooks/useFollowUser';
import { joinOn, location, personalWebsite } from '../../../assets/icons';

const LinkIcon = ({ hoverColor, href, children, onClick }) => {
  return (
    <Link
      href={href}
      color='gray.500'
      _hover={{ svg: { color: hoverColor } }}
      target='blank'
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

const ProfileBioCard = ({ profileData }) => {
  const user = useAuth();
  let userId = user?.userId;

  const { handleClickFollow, loading } = useFollowUser(profileData, userId);

  const alreadyFollow = profileData?.followers?.includes(userId);

  const iconHover = useColorModeValue('rgb(23, 23, 23)', 'rgb(250, 250, 250)');

  return (
    <Box
      className='shadowSecondary'
      bg={useColorModeValue('light.cardBg', 'dark.cardBg')}
      mt='-3.5rem'
      borderRadius={['0', '0', '5px']}
      pos='relative'
      p={{ base: '1rem .5rem', md: '1rem' }}
      textAlign={{ base: 'start', md: 'center' }}
    >
      <Box
        boxSize={{ base: '60px', md: '120px' }}
        pos='absolute'
        top={{ base: '-30px', md: '-60px' }}
        left={{ base: '2.5rem', md: '50%' }}
        transform='translateX(-50%)'
        borderWidth={{
          md: '7px ',
          base: '4px ',
        }}
        borderColor='#1e293b'
        rounded='full'
        backgroundImage={profileData?.profile || defaultProfile}
        backgroundColor='#1e293b'
        backgroundPosition='center'
        backgroundRepeat='no-repeat'
        backgroundSize='cover'
      />

      <HStack justify='flex-end' mb={{ md: '1.5rem' }} h='40px'>
        {!alreadyFollow && (
          <PrimaryBtn
            bg='light.primary'
            onClick={handleClickFollow}
            isLoading={loading}
          >
            {profileData?.id === userId ? 'Edit Profile' : 'Follow'}
          </PrimaryBtn>
        )}

        {alreadyFollow && (
          <LightBtn w='100px' onClick={handleClickFollow} isLoading={loading}>
            Following
          </LightBtn>
        )}
      </HStack>
      {profileData && (
        <Box>
          <Heading fontSize={['1.5rem', '1.7rem']}>{profileData.name}</Heading>

          <Text
            fontSize={{ md: '17px' }}
            letterSpacing='.5px'
            mt='.3rem'
            maxW={{ base: '100%', md: '70%' }}
            mx='auto'
          >
            {profileData?.bio?.trim().length
              ? profileData.bio
              : '404 bio not found'}
          </Text>

          <Wrap
            display='flex'
            justifyContent={{ base: 'flex-start', md: 'center' }}
            mt='1rem'
            fontSize='15px'
            spacing={3}
          >
            {profileData?.location && (
              <HStack>
                <Image src={location} alt='icon' />
                <Text>{profileData.location}</Text>
              </HStack>
            )}

            {profileData?.createdAt && (
              <HStack>
                <Image src={joinOn} alt='icon' />
                <Text>Joined on {joinOnDate(profileData.createdAt)}</Text>
              </HStack>
            )}

            {profileData?.website && (
              <HStack cursor='pointer'>
                <Image src={personalWebsite} alt='icon' />
                <Link
                  _hover={{ color: 'light.primary' }}
                  href={profileData.website}
                  target='blank'
                >
                  {profileData?.website}
                </Link>
              </HStack>
            )}

            <HStack>
              {profileData?.github && (
                <LinkIcon href={profileData.github} hoverColor={iconHover}>
                  <BsGithub size={22} title='Github' />
                </LinkIcon>
              )}

              {profileData?.twitter && (
                <LinkIcon href={profileData.twitter} hoverColor='#1da1f2'>
                  <BsTwitter size={23} title='Twitter' />
                </LinkIcon>
              )}

              {profileData?.email && (
                <LinkIcon
                  hoverColor={iconHover}
                  onClick={() => window.open(`mailto:${profileData.email}`)}
                >
                  <MdEmail size={23} title='Email' />
                </LinkIcon>
              )}
            </HStack>
          </Wrap>
        </Box>
      )}
    </Box>
  );
};

export default ProfileBioCard;
