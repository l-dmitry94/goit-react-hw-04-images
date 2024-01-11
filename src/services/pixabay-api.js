import axios from 'axios';

const BASE_URL = "https://pixabay.com/api";
const API_KEY = "41528122-08bf6ff4052e91093ac35f1ea"

const fetchImages = async (query, page = 1) => {
    const params = new URLSearchParams({
        q: query,
        key: API_KEY,
        image_type: "photo",
        orientation: "horizontal",
        per_page: 12,
        page
    })

    const response = await axios({
        method: "GET",
        url: `${BASE_URL}/?${params}`
    })

    return response.data
};

export default fetchImages