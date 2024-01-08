import { useState } from 'react';
import { Wrapper } from './App.styled';
import ImageGallery from 'components/ImageGallery';
import Searchbar from 'components/Searchbar';

const App = () => {
    const [query, setQuery] = useState('');

    const handleSubmit = query => {
        if (!query.search) {
            return;
        }

        setQuery(query.search.toLowerCase());
    };

    return (
        <Wrapper>
            <Searchbar onSubmit={handleSubmit} />
            <ImageGallery query={query} />
        </Wrapper>
    );
};

export default App;
