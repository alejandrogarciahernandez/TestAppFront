import { useEffect, useState } from "react";
import { mockDataCaterogries } from "../utils/mockData";

export const useCategories = () => {

    const [state, setState] = useState({
        data: null,
        isLoading: true,
        hasError: null
    });

    const getFetch = async () => {
        const resp = await fetch( process.env.REACT_APP_BACKEND_HOST + '/categories');
        const data = await resp.json();
        setState({
            data, 
            isLoading: false,
            hasError: null
        })
    }

    useEffect(() => {
        getFetch();
    }, [])

    return state;
}