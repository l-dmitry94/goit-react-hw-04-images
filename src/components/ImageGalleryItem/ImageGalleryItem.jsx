import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ smallImage, largeImage, tags, onShowModal }) => {
    return (
        <GalleryItem onClick={() => onShowModal(largeImage, tags)}>
            <GalleryItemImage src={smallImage} alt={tags} loading="lazy" />
        </GalleryItem>
    );
};

export default ImageGalleryItem;
