import { PostData } from "../types/postData.types";

export const getPostsByTag = (
  tagNames: string[] | any,
  posts: PostData[]
): PostData[] => {
  return posts.filter(post => {
    for (const tagObj of post.tags) {
      if (tagNames.includes(tagObj.tagName)) {
        return true;
      }
    }
    return false;
  });
};
