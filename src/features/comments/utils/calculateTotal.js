export const calcTotalDiscussion = comments =>
  comments.reduce(
    (count, item) => count + Object.values(item.replies).length + 1,
    0
  );

export const claculateWrittenComments = (commentArr, userId) => {
  let writtenComments = 0;

  commentArr.forEach(commentItem => {
    if (commentItem.userId === userId) {
      writtenComments++;
    }

    const repliedComments = Object.values(commentItem.replies);
    repliedComments.forEach(comment => {
      if (comment.userId === userId) {
        writtenComments++;
      }
    });
  });

  return writtenComments;
};
