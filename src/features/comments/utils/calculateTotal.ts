import { CommentData } from '../../../types/commentData.types';

export const calcTotalDiscussion = (comments: CommentData[]): number => {
  return comments.reduce((count: number, item: CommentData) => {
    return count + Object.values(item.replies).length + 1;
  }, 0);
};

export const calculateWrittenComments = (
  commentArr: CommentData[],
  userId: string
): number => {
  let writtenComments = 0;

  commentArr.forEach(commentItem => {
    if (commentItem.userId === userId) {
      writtenComments++;
    }

    const repliedComments = Object.values(commentItem.replies);
    repliedComments.forEach((comment: any) => {
      if (comment.userId === userId) {
        writtenComments++;
      }
    });
  });

  return writtenComments;
};
