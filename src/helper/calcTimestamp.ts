export const calTimeStamp = (timeStamp: { seconds: number }): string => {
  return new Date(timeStamp.seconds * 1000).toISOString();
};

export const dateFormat = (timeStamp: { seconds: number }): string => {
  const date = new Date(timeStamp.seconds * 1000)
    .toDateString()
    .split(' ')
    .slice(1, 3);
  return [date[0], +date[1]].join(' ');
};

export const isLimitedDate = (createdAt: { seconds: number }): boolean => {
  const createdDate = createdAt.seconds;
  const currentDate = Math.floor(new Date().getTime() / 1000);
  const limitedDate = currentDate - createdDate;

  return limitedDate > 432000;
};

export const showEditedDate = (
  createdAt: { seconds: number },
  updatedAt: { seconds: number }
): boolean => {
  // const reg = /\d+/;
  const postedDate = +dateFormat(createdAt);
  const editedDate = +dateFormat(updatedAt);
  return postedDate < editedDate;
};

export const joinOnDate = (createdAt: string): string => {
  let date: string;

  if (createdAt.length === 13) {
    // Date provided as a timestamp in milliseconds (e.g., created using Google provider)
    date = new Date(parseInt(createdAt)).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } else {
    // Date provided in UTC format (e.g., created using email/password provider)
    date = new Date(createdAt).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  return date;
};

export const displayDate = (timeStamp: { seconds: number }): string => {
  const date = new Date(timeStamp.seconds * 1000)
    .toDateString()
    .split(' ')
    .slice(1, 4);
  return [date[0], date[1] + ',', date[2]].join(' ');
};
