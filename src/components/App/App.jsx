import { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import {
    GalleryList,
    LoadMoreButton,
    LoadMoreButtonWrapper,
    Wrapper,
    WrapperLoader,
} from './App.styled';
import Searchbar from 'components/Searchbar';
import fetchImages from 'services/pixabay-api';
import ImageGalleryItem from 'components/ImageGalleryItem';

const perPage = 12;

const App = () => {
    const [query, setQuery] = useState('');
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(41);
    const [isLoading, setIsLoading] = useState(false);
    const [isShowLoadMore, setIsShowLoadMore] = useState(false);

    useEffect(() => {
        if (!query) {
            return;
        }

        setIsLoading(true);

        const fetchImagesData = async () => {
            try {
                const data = await fetchImages(query, page, perPage);
                setIsShowLoadMore(data.hits.length === perPage)
                setImages(prevImages => [...prevImages, ...data.hits]);
            } catch (error) {
                
            } finally {
                setIsLoading(false)
            }
        };

        fetchImagesData();
    }, [query, page]);

    const loadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    const handleSubmit = query => {
        if (!query.search) {
            return;
        }

        setQuery(query.search.toLowerCase());
        // setPage(1);
        setImages([]);
    };

    const elements = images.map(
        ({ webformatURL, largeImageURL, tags }, index) => (
            <ImageGalleryItem
                key={index}
                smallImage={webformatURL}
                largeImage={largeImageURL}
                tags={tags}
            />
        )
    );

    return (
        <Wrapper>
            <Searchbar onSubmit={handleSubmit} />
            {isLoading && (
                <WrapperLoader>
                    <ThreeDots
                        visible={true}
                        height="80"
                        width="80"
                        color="#4fa94d"
                        radius="9"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{position: "absolute", top: "50%", left: "50%", zIndex: 100, transform: "translate(-50%, -50%)"}}
                        wrapperClass="loader"
                    />
                </WrapperLoader>
            )}
            <GalleryList>{elements}</GalleryList>
            {isShowLoadMore && (
                <LoadMoreButtonWrapper>
                    <LoadMoreButton type="button" onClick={loadMore}>
                        load more
                    </LoadMoreButton>
                </LoadMoreButtonWrapper>
            )}
        </Wrapper>
    );
};

export default App;
