import { getPostsByTag } from '../../../helper/getPostsByTag';
import { calcTotalDiscussion } from '../../comments/utils/calculateTotal';
import { PostData } from '../../../types/postData.types';

export const sortPosts = (
  sort: string | any,
  posts: PostData[],
  followingTags: string[] | any
): PostData[] => {
  let sortedPosts: PostData[] = [];

  switch (sort) {
    case 'latest':
      sortedPosts = posts.sort((a: any, b: any) => {
        const aDate = new Date(
          a.createdAt.seconds * 1000 + a.createdAt.nanoseconds / 1000000
        );
        const bDate = new Date(
          b.createdAt.seconds * 1000 + b.createdAt.nanoseconds / 1000000
        );
        return bDate.getTime() - aDate.getTime();
      });
      break;

    case 'followingTags':
      if (followingTags.length === 0) {
        // Randomize posts if there are no following tags
        sortedPosts = posts.sort(() => Math.random() - 0.5);
      } else {
        sortedPosts = getPostsByTag(followingTags, posts);
      }
      break;

    case 'top':
      sortedPosts = posts
        .map(post => {
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
      sortedPosts = posts.sort((a, b) => {
        const aDate = new Date(
          a.createdAt.seconds * 1000 + a.createdAt.nanoseconds / 1000000
        );
        const bDate = new Date(
          b.createdAt.seconds * 1000 + b.createdAt.nanoseconds / 1000000
        );
        return bDate.getTime() - aDate.getTime();
      });
      break;
  }

  return sortedPosts;
};
