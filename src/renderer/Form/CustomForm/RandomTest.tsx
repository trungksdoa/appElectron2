import PropTypes from 'prop-types';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { Button } from 'reactstrap';

interface PhotoProps {
  // eslint-disable-next-line react/require-default-props
  name: string;
  // eslint-disable-next-line react/require-default-props
  imageUrl: string;
  // eslint-disable-next-line react/require-default-props
  onImageUrlChange: any;
  // eslint-disable-next-line react/require-default-props
  onRandomButtonBlur: any;
}

// eslint-disable-next-line @typescript-eslint/no-use-before-define
RandomPhoto.propTypes = {
  name: PropTypes.string,
  imageUrl: PropTypes.string,
  onImageUrlChange: PropTypes.func,
  onRandomButtonBlur: PropTypes.func,
};

// eslint-disable-next-line @typescript-eslint/no-use-before-define
RandomPhoto.defaultProps = {
  // eslint-disable-next-line react/default-props-match-prop-types
  name: '',
  // eslint-disable-next-line react/default-props-match-prop-types
  imageUrl: '',
  // eslint-disable-next-line react/default-props-match-prop-types
  onImageUrlChange: null,
  // eslint-disable-next-line react/default-props-match-prop-types
  onRandomButtonBlur: null,
};

const getRandomImageUrl = () => {
  const randomId = Math.trunc(Math.random() * 2000);
  return `https://picsum.photos/id/${randomId}/300/300`;
};

function RandomPhoto(props: PhotoProps) {
  const { name, imageUrl, onImageUrlChange, onRandomButtonBlur } = props;

  const handleRandomPhotoClick = async () => {
    console.log(props);
    if (onImageUrlChange) {
      const randomImageUrl = getRandomImageUrl();
      console.log(randomImageUrl);
      onImageUrlChange(randomImageUrl);
    }
  };
  return (
    <div className="random-photo">
      <div className="random-photo__button">
        <Button
          outline
          name={name}
          color="primary"
          onBlur={onRandomButtonBlur}
          onClick={handleRandomPhotoClick}
        >
          Random a photo
        </Button>
      </div>

      <div className="random-photo__photo">
        {imageUrl && <img src={imageUrl} alt="Ooops ... not found" />}
      </div>
    </div>
  );
}

export default RandomPhoto;
