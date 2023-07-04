import { useState } from 'react';
import { useAuth } from '../../../context/auth';
import { updatePostReaction } from '../../../lib/api';

type ReactionArr = string[] | any;

const useClickReactToPost = (
  reactionArr: ReactionArr,
  postId: string,
  reactType: string
) => {
  const user = useAuth();
  const [updatingReact, setUpdatingReact] = useState(false);

  const clickReactHandler = () => {
    setUpdatingReact(true);

    const prevReactionArr = reactionArr || [];
    const userId = user?.userId;

    if (!userId) {
      // User is not authenticated, handle accordingly
      return;
    }

    const transformedReact = prevReactionArr.includes(userId)
      ? prevReactionArr.filter((id: string) => id !== userId)
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
