import { getPostsByTag } from '../../../helper/getPostsByTag';
import { calcTotalDiscussion } from '../../comments/utils/calculateTotal';
// sort post based on latest, following tags, and top posts
export const sortPosts = (sort, posts, followingTags) => {
  let sortedPosts = [];

  switch (sort) {
    case 'latest':
      sortedPosts = posts?.sort((a, b) => b.createdAt - a.createdAt);
      break;
    case 'followingTags':
      if (followingTags.length === 0) {
        // randomize posts if there are no following tags
        sortedPosts = posts?.sort(() => Math.random() - 0.5);
        break;
      }
      sortedPosts = getPostsByTag(followingTags, posts);

      break;
    case 'top':
      sortedPosts = posts
        ?.map(post => {
          const totalLikes = post.likes.length;
          const totalComments = calcTotalDiscussion(post.comments);
          return { ...post, totalLikes, totalComments };
        })
        .sort(
          (a, b) =>
            b.totalLikes + b.totalComments - (a.totalLikes + a.totalComments)
        );

      break;
    default:
      sortedPosts = posts?.sort((a, b) => b.createdAt - a.createdAt);
      break;
  }

  return sortedPosts;
};
