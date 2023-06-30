import React from 'react';
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Drawer,
  Link,
  DrawerContent,
  DrawerOverlay,
  Image,
  useDisclosure,
  HStack,
} from '@chakra-ui/react';
import {
  FiHome,
  FiCompass,
  FiTrendingUp,
  FiMenu,
  FiBookmark,
  FiActivity,
  FiBell,
  FiEdit,
  FiGithub,
  FiHeart,
  FiLogOut,
  FiLinkedin,
  FiShare,
  FiTwitter,
  FiX,
  FiPlusCircle,
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import logolight from '../../assets/images/logolight.png';
import logodark from '../../assets/images/logodark.png';
import Header from './Header';

const LinkItems = [
  { name: 'Home', icon: FiHome },
  { name: 'Explore', icon: FiCompass },
  { name: 'Bookmarks', icon: FiBookmark },
  { name: 'Drafts', icon: FiEdit },
  { name: 'Analytics', icon: FiActivity },
];

export default function SidebarMenu({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH='100vh' bg={useColorModeValue('light.cardBg', 'dark.cardBg')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size='xs'
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  let navigate = useNavigate();

  return (
    <Box
      transition='3s ease'
      bg={useColorModeValue('light.cardBg', 'dark.cardBg')}
      borderRight='1px'
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos='fixed'
      h='full'
      {...rest}
    >
      <Flex h='20' alignItems='center' mx='6' justifyContent='space-between'>
        <Image
          src={useColorModeValue(logolight, logodark)}
          cursor='pointer'
          alt='logo'
          h='40px'
          onClick={() => navigate('/')}
        />

        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map(link => (
        <NavItem key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Link
      href='#'
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align='center'
        p='3'
        mx='3'
        borderRadius='sm'
        role='group'
        cursor='pointer'
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr='4'
            fontSize='16'
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

export const MobileNav = ({ onOpen, ...rest }) => {
  let navigate = useNavigate();

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height='20'
      alignItems='center'
      bg={useColorModeValue('light.cardBg', 'dark.cardBg')}
      borderBottomWidth='1px'
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <Box display={{ base: 'flex', md: 'none' }}>
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          onClick={onOpen}
          variant='outline'
          aria-label='open menu'
          icon={<FiMenu />}
        />

        <Image
          src={useColorModeValue(logolight, logodark)}
          cursor='pointer'
          alt='logo'
          h='40px'
          ml='2'
          onClick={() => navigate('/')}
        />
      </Box>

      <HStack spacing={{ base: '0', md: '6' }}>
        <Header />
      </HStack>
    </Flex>
  );
};
