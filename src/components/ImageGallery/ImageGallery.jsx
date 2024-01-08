import { useEffect, useState } from 'react';
import fetchImages from 'services/pixabay-api';
import ImageGalleryItem from './ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';
import Searchbar from 'components/Searchbar';

const perPage = 12;

const ImageGallery = ({ query }) => {
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (!query) {
            return;
        }

        const fetchImagesData = async () => {
            const data = await fetchImages(query, page, perPage);
            setImages(prevImages => [...prevImages, ...data.hits]);
            return;
        };

        fetchImagesData();
    }, [query, page]);

    const loadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    const elements = images.map(({ webformatURL, largeImageURL }, index) => (
        <ImageGalleryItem
            key={index}
            smallImage={webformatURL}
            largeImage={largeImageURL}
        />
    ));

    return (
        <>
            <GalleryList>{elements}</GalleryList>
            <button type="button" onClick={loadMore}>
                load more
            </button>
        </>
    );
};

export default ImageGallery;
