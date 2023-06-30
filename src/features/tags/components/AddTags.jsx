import React, { useEffect, useRef, useState } from 'react';
import Tag from '../utils/Tag';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Flex, Input, Wrap, WrapItem } from '@chakra-ui/react';
// import tagSuggestions from './tagSuggestion.json';
import { getPopularTags } from '../../../helper/getPopularTags';
import { setTagsToStore } from '../../../store/post/postData';
import { nanoid } from '@reduxjs/toolkit';
import { VscChromeClose } from 'react-icons/vsc';
import useClickOutside from '../hooks/useClickOutside';

const AddTags = ({ filteredTagsFromLocalStorage }) => {
  const { modifiedData } = useSelector(state => state.modifiedData);
  const tags = getPopularTags(modifiedData);

  //states
  const [tagData, setTagData] = useState(tags);
  const [filterTagName, setFilterTagName] = useState('');
  const [focusTagInput, setFocusTagInput] = useState(false);
  const [filteredTags, setFilteredTags] = useState(
    filteredTagsFromLocalStorage || []
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTagsToStore(filteredTags));
  }, [filteredTags, dispatch]);

  //refs
  const inputTagRef = useRef();

  //handle click outside to close suggesstion box
  useClickOutside(setFocusTagInput, ['suggestion-box', 'tag-input']);

  //showing tag suggestion
  const tagsToShow = () => {
    if (filterTagName === '') {
      return;
    }

    return tagData.filter(tag =>
      tag.tagName.toLowerCase().includes(filterTagName.toLowerCase())
    );
  };

  const filteredTagsToShow = () => {
    return filteredTags.map(tag => (
      <WrapItem key={nanoid()} pos='relative'>
        <Tag
          tag={tag}
          onDeleteTag={() => handleDeleteTag(tag)}
          showCloseIcon={true}
        >
          <VscChromeClose size={20} />
        </Tag>
      </WrapItem>
    ));
  };

  const addToFilteredTags = tag => {
    setFilteredTags(prevArr => [...prevArr, tag]);
    setTagData(prevArr => prevArr.filter(item => item.tagName !== tag.tagName));
  };

  const handleAddTag = tag => {
    addToFilteredTags(tag);
    setFilterTagName('');
    inputTagRef.current.focus();

    setTimeout(() => setFocusTagInput(true), 100); // two setState trigger once and doesn't get true
  };

  const handleDeleteTag = tag => {
    setFilteredTags(prevArr =>
      prevArr.filter(item => item.tagName !== tag.tagName)
    );

    if (tag.isCustomTag) {
      return;
    }

    setTagData(prevArr => [...prevArr, tag]);
  };

  const capitalizeFirstLetter = input => {
    return input.replace(/\b\w/g, match => match.toUpperCase());
  };

  // generating tag icon
  const suggestions = () => {
    if (tagsToShow()) {
      const alreadyInTag = filteredTags.find(
        tag => tag.tagName === filterTagName
      );

      const transformedTags = alreadyInTag
        ? [...tagsToShow()]
        : [{ tagName: filterTagName, isCustomTag: true }, ...tagsToShow()];

      return transformedTags.map(tag => (
        <WrapItem key={nanoid()}>
          <Tag onAddTag={() => handleAddTag(tag)} tag={tag} />
        </WrapItem>
      ));
    }
  };

  // showSuggestionBox
  const showSuggestionBox = focusTagInput && tagsToShow() ? 'flex' : 'none';

  const tagInputPlaceHolder = `Add tag ( ${4 - filteredTags.length} )`;

  return (
    <>
      <Box mb={3}>
        <Wrap overflow='visible'>
          {filteredTagsToShow()}

          {filteredTags.length !== 4 && (
            <WrapItem maxW='120px'>
              <Input
                h='34px'
                w='100%'
                px='.5rem'
                className='tag-input'
                ref={inputTagRef}
                placeholder={tagInputPlaceHolder}
                borderRadius='5px'
                value={filterTagName}
                onChange={({ target }) =>
                  setFilterTagName(capitalizeFirstLetter(target.value))
                }
              />
            </WrapItem>
          )}
        </Wrap>
      </Box>

      <Flex
        wrap='wrap'
        gap='.5rem'
        display={showSuggestionBox}
        w='100%'
        className='suggestion-box shadowSecondary'
        m='0 auto 1rem'
        p={3}
        overflow='auto'
        borderRadius='5px'
        maxH='6rem'
      >
        {suggestions()}
      </Flex>
    </>
  );
};

export default React.memo(AddTags);
