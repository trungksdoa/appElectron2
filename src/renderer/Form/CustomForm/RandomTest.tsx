import PropTypes from 'prop-types';
import React from 'react';
import {Button} from 'reactstrap';


interface PhotoProps {
    name: string,
    imageUrl: string,
    onImageUrlChange: any,
    onRandomButtonBlur: any,
}

RandomPhoto.propTypes = {
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    onImageUrlChange: PropTypes.func,
    onRandomButtonBlur: PropTypes.func,
};

RandomPhoto.defaultProps = {
    name: '',
    imageUrl: '',
    onImageUrlChange: null,
    onRandomButtonBlur: null,
}

const getRandomImageUrl = () => {
    const randomId = Math.trunc(Math.random() * 2000);
    return `https://picsum.photos/id/${randomId}/300/300`;
}

function RandomPhoto(props: PhotoProps) {
    const {name, imageUrl, onImageUrlChange, onRandomButtonBlur} = props;

    const handleRandomPhotoClick = async () => {
        console.log(props)
        if (onImageUrlChange) {
            const randomImageUrl = getRandomImageUrl();
            console.log(randomImageUrl)
            onImageUrlChange(randomImageUrl)
        }
    }
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
                {imageUrl && <img src={imageUrl} alt="Ooops ... not found"/>}
            </div>
        </div>
    );
}

export default RandomPhoto;