import axios from "axios";

export const getListProducts = async () => {
    try {
        const { data } = await axios.get("https://hiring-test.stag.tekoapis.net/api/products");
        return data;
    } catch (error) {
        return false;
    }
}

export const getListColors = async () => {
    try {
        const { data } = await axios.get("https://hiring-test.stag.tekoapis.net/api/colors");
        return data;
    } catch (error) {
        return false;
    }
}