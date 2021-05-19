import axios from 'axios';
import { useContext } from 'react';
import { PaginationContext } from './../context/pagination';
import { LoginContext } from './../auth/context';

const useAjax = (url) => {
    const paginationContext = useContext(PaginationContext);
    const loginContext = useContext(LoginContext);

    console.log(loginContext.user.user.type);

    let config = {
        headers: {
            mode: 'cors',
            cache: 'no-cache',
            'Content-Type': 'application/json',
        },
    };

    const fetchingData = async (id, method = 'get', item) => {
        if (method === 'get') {
            const results = await axios[method](url, config);
            paginationContext.setItems([...results.data.results]);
            paginationContext.setList([...results.data.results]);
        }

        if (
            method === 'post' &&
            (loginContext.user.user.type === 'admin' ||
                loginContext.user.user.type === 'editor')
        ) {
            item.due = new Date();
            const results = await axios[method](url, item, config);
            paginationContext.setItems([...paginationContext.items, results.data]);
        }

        if (
            method === 'put' &&
            (loginContext.user.user.type === 'admin' ||
                loginContext.user.user.type === 'editor')
        ) {
            let item = paginationContext.items.filter((i) => i._id === id)[0] || {};

            if (item._id) {
                item.complete = !item.complete;
                const results = await axios[method](`${url}/${id}`, item, config);
                paginationContext.setItems(
                    paginationContext.items.map((listItem) =>
                        listItem._id === item._id ? results.data : listItem,
                    ),
                );
            }
        }

        if (method === 'delete' && loginContext.user.user.type === 'admin') {
            let item = paginationContext.items.find((i) => i._id === id) || {};

            if (item._id) {
                const results = await axios[method](`${url}/${id}`, config);
                paginationContext.setItems(
                    paginationContext.items.filter(
                        (listItem) => listItem._id !== results.data._id,
                    ),
                );
            }
        }
    };

    return fetchingData;
};

export default useAjax;