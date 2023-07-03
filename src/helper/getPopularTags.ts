import { TagData } from '../types/tagData.types';

type TransformedData = {
  draft: boolean;
  tags: TagData[];
};

export const getPopularTags = (
  transformedData: TransformedData[]
): { tagName: string; publishedPosts: number }[] => {
  let popularTags: { tagName: string; publishedPosts: number }[] = [];

  if (transformedData) {
    const availableTags: TagData[] = [];

    transformedData.forEach(postData => {
      if (!postData.draft && postData.tags.length) {
        availableTags.push(...postData.tags);
      }
    });

    // calculate number of duplicate tags
    const tagCounts: { [tagName: string]: number } = {};
    availableTags.forEach(tag => {
      tagCounts[tag.tagName] = (tagCounts[tag.tagName] || 0) + 1;
    });

    popularTags = Object.entries(tagCounts).map(([tagName, count]) => ({
      tagName,
      publishedPosts: count,
    }));

    popularTags.sort((a, b) => b.publishedPosts - a.publishedPosts);
  }

  return popularTags;
};
