import { useState } from 'react';
import { useAuth } from '../../../context/auth';
import { updatePostReaction } from '../../../lib/api';

const useClickReactToPost = (reactionArr, postId, reactType) => {
  const user = useAuth();
  const [updatingReact, setUpdatingReact] = useState(false);

  const clickReactHandler = () => {
    setUpdatingReact(true);

    const prevReactionArr = reactionArr || [];
    const { userId } = user;

    const transformedReact = prevReactionArr.includes(userId)
      ? prevReactionArr.filter(id => id !== userId)
      : [...prevReactionArr, userId];

    updatePostReaction({ [reactType]: transformedReact }, postId)
      .then(_ => {
        setUpdatingReact(false);

        // console.log('react added successfully');
      })
      .catch(err => {
        setUpdatingReact(false);

        console.log(err);
      });
  };

  return { clickReactHandler, updatingReact };
};

export default useClickReactToPost;
