import axios from 'axios';

const BASE_URL = "https://pixabay.com/api";
const API_KEY = "41528122-08bf6ff4052e91093ac35f1ea"

const fetchImages = async (query, page = 1, perPage) => {
    const params = new URLSearchParams({
        q: query,
        page,
        key: API_KEY,
        image_type: "photo",
        orientation: "horizontal",
        per_page: perPage
    })

    const response = await axios({
        method: "GET",
        url: `${BASE_URL}/?${params}`
    })

    return response.data
};

export default fetchImages