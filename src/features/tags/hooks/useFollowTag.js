import { useState } from 'react';
import { useAuth } from '../../../context/auth';
import { updateProfileData } from '../../../lib/api';

const useFollowTag = profileData => {
  const user = useAuth();
  const userId = user?.userId;

  const [loading, setLoading] = useState(false);

  const followTagHandler = async tagName => {
    setLoading(true);

    const currentUserProfile = profileData.find(data => data.id === userId);

    const tags = currentUserProfile.followingTags || [];

    const transformedFollowingTags = tags.includes(tagName)
      ? tags.filter(tagname => tagname !== tagName)
      : [...tags, tagName];

    updateProfileData({ followingTags: transformedFollowingTags }, userId)
      .then(_ => {
        setLoading(false);
        // console.log('followed tag successfully');
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  };

  return { followTagHandler, loading };
};

export default useFollowTag;
