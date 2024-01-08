import { useFormik } from 'formik';
import { IconContext } from 'react-icons';
import { FaSearch } from 'react-icons/fa';
import { Form, Header, SearchButton, SearchInput } from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
    const formik = useFormik({
        initialValues: {
            search: '',
        },
        onSubmit: async (values, { setSubmitting }) => {
            onSubmit(values);
            setSubmitting(false);
        },
    });

    return (
        <Header>
            <Form className="form" onSubmit={formik.handleSubmit}>
                <SearchButton type="submit" disabled={formik.isSubmitting}>
                    <IconContext.Provider value={{ size: 18 }}>
                        <FaSearch />
                    </IconContext.Provider>
                </SearchButton>

                <SearchInput
                    type="text"
                    name="search"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    onChange={formik.handleChange}
                    value={formik.values.search}
                />
            </Form>
        </Header>
    );
};

export default Searchbar;
