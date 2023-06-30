import {
  Flex,
  Heading,
  Text,
  Image,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import defaultProfile from '../../../assets/images/default_profile.webp';

const Card = ({ profile, name, username }) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/${username}`);
  };

  return (
    <Flex
      w='100%'
      className='shadow'
      bg={useColorModeValue('light.cardBg', 'dark.cardBg')}
      p={{ base: '.5rem', sm: '1rem', lg: '1.5rem' }}
      borderRadius='5px'
      align='center'
      direction={{ base: 'row', sm: 'column' }}
    >
      <Image
        src={profile || defaultProfile}
        alt='profile'
        boxSize={{ base: '50px', sm: '90px' }}
        objectFit='cover'
        rounded='full'
        mb={{ sm: '.5rem' }}
        mr={{ base: '.5rem', sm: '0' }}
        cursor='pointer'
        onClick={handleViewProfile}
      />
      <Heading
        fontSize='1.2rem'
        color={useColorModeValue('light.headingHover', 'dark.headingHover')}
        cursor='pointer'
        onClick={handleViewProfile}
      >
        {name}
      </Heading>
      <Text
        fontSize='.9rem'
        color={useColorModeValue('light.text', 'dark.text')}
        cursor='pointer'
        onClick={handleViewProfile}
      >
        @{username}
      </Text>
    </Flex>
  );
};

export default Card;
