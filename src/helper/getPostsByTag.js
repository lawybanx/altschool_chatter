export const getPostsByTag = (tagNames, posts) => {
  return posts.filter(post => {
    for (const tagObj of post.tags) {
      if (tagNames.includes(tagObj.tagName)) {
        return true;
      }
    }
    return false;
  });
};
