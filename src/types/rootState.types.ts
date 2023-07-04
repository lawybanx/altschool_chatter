import { PostData } from './postData.types';
import { ProfileData } from './profileData.types';

export type RootState = {
  modifiedData: {
    modifiedData: PostData[];
    modifiedDataLoading: boolean;
    modifiedDataErr: Error | null;
  };
  profileData: {
    profileData: ProfileData[];
    profileDataLoading: boolean;
    profileDataErr: Error | null;
  };
  postData: {
    postData: PostData[];
    postDataLoading: boolean;
    postDataErr: Error | null;
  };
  currentPost: {
    currentPost: PostData | null;
    currentPostLoading: boolean;
    currentPostErr: Error | null;
  };
  currentComments: {
    currentComments: any;
    currentCommentsLoading: boolean;
    currentCommentsErr: Error | null;
  };
  scrollDiscussion: {
    scrollDiscussion: boolean;
  };
};
