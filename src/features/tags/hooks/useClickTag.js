import { useNavigate } from 'react-router-dom';

const useClickTag = (handleSameRoute, onClose) => {
  const navigate = useNavigate();

  return (e, tagName) => {
    e.stopPropagation();
    navigate(`/tags/${tagName}`);

    handleSameRoute && handleSameRoute();
    onClose && onClose();
  };
};

export default useClickTag;
