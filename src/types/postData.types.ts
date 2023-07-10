import { CommentData } from './commentData.types';
import { TagData } from './tagData.types';
import { TimestampObject } from './timestampObject.types';

export type PostData = {
  [x: string]: any;
  id: string;
  MDEValue?: string;
  cvImg?: string;
  title: string;
  draft?: boolean;
  readTime: number;
  updated?: boolean;
  userId: string;
  bookmark?: string[];
  likes?: string[] | any;
  comments: CommentData[] | number | any;
  tags: TagData[] | any;
  createdAt: TimestampObject;
  updatedAt?: TimestampObject;
};
