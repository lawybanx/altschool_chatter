import { nanoid } from '@reduxjs/toolkit';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/auth';
import {
  getItemFromLocalStorage,
  removeFromLocalStorage,
  saveToLocalStorage,
} from '../../../helper/localStorage';
import { createPost, deletePost, draftPost, editPost } from '../../../lib/api';
import { setTitleToStore } from '../../../store/post/postData';
import { PostData } from '../../../types/postData.types';

const useCreatePost = (currentPostDataToEdit: PostData) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useAuth();

  // Value from redux store
  const postDataFromStore = useSelector((state: any) => state.postData);

  const initialState = useMemo(
    () => ({
      cvImg: '', // Set a default value for cvImg
      title: '',
      tags: [],
      MDEValue: '',
      userId: user?.userId,
    }),
    [user?.userId]
  );

  // States
  const [postData, setPostData] = useState<PostData>(
    currentPostDataToEdit ||
      getItemFromLocalStorage('postDataToPublish') ||
      initialState
  );

  const [title, setTitle] = useState(postData?.title);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);

  // Set title to store
  useEffect(() => {
    dispatch(setTitleToStore(title));
  }, [title, dispatch]);

  // Set postData state every time postData from store changes
  useEffect(() => {
    const newData: Partial<PostData> = {
      cvImg: postDataFromStore.cvImg || '',
      title: postDataFromStore.title,
      tags: postDataFromStore.tags,
      MDEValue: postDataFromStore.MDEValue,
      userId: user?.userId,
    };

    setPostData(prevData => ({ ...prevData, ...newData }));
  }, [postDataFromStore, user?.userId]);

  // Save to localStorage
  useEffect(() => {
    saveToLocalStorage(
      currentPostDataToEdit ? 'postDataToManage' : 'postDataToPublish',
      JSON.stringify(postData)
    );
  }, [postData, currentPostDataToEdit]);

  const publishPostHandler = async () => {
    setPublishing(true);

    if (postData.draft) {
      await deletePost(postData.id);
    }

    // If post is a draft, it will have an id but it will be replaced with a Firebase auto-generated id when fetching data in [useGetData.js] file

    try {
      await createPost({ ...postData, draft: false });
      setPublishing(false);
      removeFromLocalStorage('postDataToPublish');
      navigate('/dashboard');
      // console.log('created post successfully');
    } catch (err) {
      setPublishing(false);
      console.log(err);
    }
  };

  const draftPostHandler = async () => {
    setSavingDraft(true);

    // const route = postData.draft &&

    try {
      await draftPost({
        ...postData,
        draft: true,
        id: postData.id || nanoid().replaceAll('_', '-'),
      });

      setSavingDraft(false);
      navigate('/dashboard/drafts');
      removeFromLocalStorage('postDataToPublish');
      removeFromLocalStorage('postDataToManage');
      // console.log('drafted post successfully');
    } catch (err) {
      setSavingDraft(false);
      console.log(err);
    }
  };

  const editPostHandler = async () => {
    setPublishing(true);

    const route = postData.draft ? '/dashboard/drafts' : '/dashboard';

    try {
      await editPost({ ...postData, updated: true });
      setPublishing(false);
      navigate(route);
      removeFromLocalStorage('postDataToManage');
      // console.log('edited post successfully');
    } catch (err) {
      setPublishing(false);
      console.log(err);
    }
  };

  return {
    postData,
    title,
    setTitle,
    publishing,
    savingDraft,
    uploadingImg,
    setUploadingImg,
    publishPostHandler,
    draftPostHandler,
    editPostHandler,
  };
};

export default useCreatePost;
