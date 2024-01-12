import { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import {
    GalleryList,
    Image,
    LoadMoreButton,
    LoadMoreButtonWrapper,
    Wrapper,
    WrapperLoader,
} from './App.styled';
import Searchbar from 'components/Searchbar';
import fetchImages from 'services/pixabay-api';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Modal from 'components/Modal';

const App = () => {
    const [query, setQuery] = useState('');
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(41);
    const [isLoading, setIsLoading] = useState(false);
    const [isShowLoadMore, setIsShowLoadMore] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [imageModal, setimageModal] = useState({});

    useEffect(() => {
        if (!query) {
            return;
        }

        setIsLoading(true);

        const fetchImagesData = async () => {
            try {
                const data = await fetchImages(query, page);
                if (!data.hits.length) {
                    toast.error('Таких изображений не найдено');
                }
                setIsShowLoadMore(page < Math.ceil(data.totalHits / 12));
                setImages(prevImages => [...prevImages, ...data.hits]);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchImagesData();
    }, [query, page]);

    const loadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    const handleSubmit = queryForm => {
        const normalizeQueryForm = queryForm.toLowerCase();

        if (!normalizeQueryForm) {
            toast.warn('Ви не ввели запит');
            return;
        }

        if (normalizeQueryForm === query) {
            toast.warn('Ви вже проглядаєте цей запит');
            return;
        }

        setImages([]);
        setPage(1);
        setQuery(normalizeQueryForm);
    };

    const onShowModal = (largeImage, tags) => {
        setShowModal(true);
        setimageModal({ largeImage, tags });
    };

    const onCloseModal = () => {
        setShowModal(false);
        setimageModal({});
    };

    const elements = images.map(
        ({ webformatURL, largeImageURL, tags }, index) => (
            <ImageGalleryItem
                key={index}
                smallImage={webformatURL}
                largeImage={largeImageURL}
                tags={tags}
                onShowModal={onShowModal}
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
                        wrapperStyle={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            zIndex: 100,
                            transform: 'translate(-50%, -50%)',
                        }}
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
            {showModal && (
                <Modal closeModal={onCloseModal}>
                    <Image src={imageModal.largeImage} alt={imageModal.tags} />
                </Modal>
            )}

            <ToastContainer autoClose={3000} />
        </Wrapper>
    );
};

export default App;
