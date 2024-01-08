import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ smallImage, largeImage }) => {
    return (
        <GalleryItem>
            <GalleryItemImage src={smallImage} alt="" loading="lazy" />
        </GalleryItem>
    );
};

export default ImageGalleryItem;
