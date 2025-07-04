import * as React from 'react';
import axios from "axios";

const URLDOCSEARCH = "https://gateway.scan-interfax.ru/api/v1/documents";
const token = localStorage.getItem('accessToken');


export const api_call_docsearch = async (objData) => {
    if (!objData) {
        console.warn("ObjectsID или items не определены:", objData);
        return;
    }

    const docIds = objData.map(item => item.encodedId);

    try {
        const response_docsearch = await axios.post(
            URLDOCSEARCH,
            { ids: docIds },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
            }
        );

        console.log(response_docsearch.data);
        return response_docsearch.data

    } catch (error) {
        console.error(error);
    }
};