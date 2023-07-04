import React from 'react';
import { Box, HStack, Text, Tag, useColorModeValue } from '@chakra-ui/react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth } from '../../../context/auth';
import styled from '@emotion/styled';
import { css, SerializedStyles } from '@emotion/react';
import { RootState } from '../../../types/rootState.types';

interface MenuTextProps {
  title: string;
  count: number;
}

const MenuText: React.FC<MenuTextProps> = ({ title, count }) => {
  return (
    <HStack justify='space-between'>
      <Text>{title}</Text>
      <Tag ml='3' size='md'>
        {count}
      </Tag>
    </HStack>
  );
};

interface MenuProps {
  totalPublishedPosts: number;
  totalDraftPosts: number;
}

const Menu: React.FC<MenuProps> = ({
  totalPublishedPosts,
  totalDraftPosts,
}) => {
  const user = useAuth();
  const location = useLocation();

  const { profileData } = useSelector((state: RootState) => state.profileData);

  const totalFollowing = profileData?.filter(userData =>
    userData.followers?.includes(user?.userId ?? '')
  ).length;

  const totalFollowers =
    profileData.find(userData => userData.id === user?.userId)?.followers
      ?.length || 0;

  const totalFollowingTags =
    profileData.find(userData => userData.id === user?.userId)?.followingTags
      ?.length || 0;

  const bgColor = useColorModeValue(
    'rgb(59 73 223 / 10%)',
    'rgb(49 46 129 / 75%)'
  );

  const hoverColor = useColorModeValue('rgb(47 58 178)', 'rgb(165, 180, 252)');
  const color = useColorModeValue('rgb(64, 64, 64)', 'rgb(212, 212, 212)');

  const menuItemStyles: SerializedStyles = css`
    padding: 0.5rem;
    display: block;
    cursor: pointer;
    border-radius: 5px;
    margin-bottom: 4px;
    color: ${color};

    &:hover {
      background: ${bgColor};
      color: ${hoverColor};
    }
  `;

  return (
    <Box w='230px' display={{ base: 'none', md: 'block' }}>
      <MenuItem
        to='/dashboard'
        css={menuItemStyles.toString()}
        // activeClassName='active'
        style={{
          background: location.pathname === '/dashboard' ? bgColor : '',
        }}
        // exact
      >
        <MenuText title='Posts' count={totalPublishedPosts} />
      </MenuItem>

      <MenuItem
        to='/dashboard/drafts'
        css={menuItemStyles.toString()}
        style={{
          background: location.pathname === '/dashboard/drafts' ? bgColor : '',
        }}
        // activeClassName='active'
      >
        <MenuText title='Drafts' count={totalDraftPosts} />
      </MenuItem>

      <MenuItem
        to='/dashboard/following'
        css={menuItemStyles.toString()}
        style={{
          background:
            location.pathname === '/dashboard/following' ? bgColor : '',
        }}
        // activeClassName='active'
      >
        <MenuText title='Following' count={totalFollowing} />
      </MenuItem>

      <MenuItem
        to='/dashboard/followers'
        css={menuItemStyles.toString()}
        style={{
          background:
            location.pathname === '/dashboard/followers' ? bgColor : '',
        }}
        // activeClassName='active'
      >
        <MenuText title='Followers' count={totalFollowers} />
      </MenuItem>

      <MenuItem
        to='/dashboard/following_tags'
        css={menuItemStyles.toString()}
        style={{
          background:
            location.pathname === '/dashboard/following_tags' ? bgColor : '',
        }}
        // activeClassName='active'
      >
        <MenuText title='Following tags' count={totalFollowingTags} />
      </MenuItem>
    </Box>
  );
};

const MenuItem = styled(NavLink)`
  ${({ css }: { css?: string }) => css}
`;

export default Menu;
