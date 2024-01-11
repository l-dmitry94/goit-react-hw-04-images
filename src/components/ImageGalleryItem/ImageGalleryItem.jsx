import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ smallImage, largeImage, tags }) => {
    return (
        <GalleryItem>
            <GalleryItemImage src={smallImage} alt={tags} loading="lazy" />
        </GalleryItem>
    );
};

export default ImageGalleryItem;
