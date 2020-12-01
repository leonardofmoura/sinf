import React, { useState, useEffect } from 'react';

import OrderItem from '../OrderItem/OrderItem';

import styles from './OrderList.module.css';

const OrderList = (props) => {
    // hard coded for now
    const orders = [
        {
            id: '0000001',
            supplier: 'NVIDIA Inc',
            date: '11/11/2020',
            summary: '37 2080 Ti Graphics Cards',
            items: [
                {
                    productId: '0000001',
                    quantity: 37,
                    itemName: 'NVIDIA 2080 Ti',
                    category: 'Graphics card',
                },
            ]
        },
        {
            id: '0000002',
            supplier: 'NVIDIA Inc',
            date: '12/11/2020',
            summary: '2080 Ti Graphics Cards',
            items: [
                {
                    productId: '0000001',
                    quantity: 20,
                    itemName: 'NVIDIA 2080 Ti',
                    category: 'Graphics card',
                },
            ]
        }
    ];

    //const [accessToken, setAccessToken] = useState('');
    const [items, setItems] = useState([]);
    /*
    useEffect(() => {
        const fetchToken = async () => {
            const options = {
                method: 'POST',
                mode: 'cors',
                crossDomain:true,
                headers: {
                    'Content-type': 'application/json',
                    grant_type: 'client_credentials',
                    client_id: 'GXSAKEY',
                    client_secret: '70fce762-8fc6-4095-ab02-708f1ab99e13',
                    scope: 'application',
                    'access-control-allow-origin': '*',
                }
            };

            fetch('https://identity.primaverabss.com/connect/token', options)
                .then(response => response.json())
                .then(responseJson => {
                    console.log(responseJson);
                });
        }

        fetchToken();
    }, []);
    */
    useEffect(() => {
        const fetchData = async () => {
            const options = {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkFEM0Q1RDJERjM4OTZBMDUwMzYwNzVDQkNFNDc0RDJBMjI4MUVCM0UiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJyVDFkTGZPSmFnVURZSFhMemtkTktpS0I2ejQifQ.eyJuYmYiOjE2MDY3OTExODYsImV4cCI6MTYwNjgwNTU4NiwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5wcmltYXZlcmFic3MuY29tIiwiYXVkIjpbImh0dHBzOi8vaWRlbnRpdHkucHJpbWF2ZXJhYnNzLmNvbS9yZXNvdXJjZXMiLCJqYXNtaW4iXSwiY2xpZW50X2lkIjoiR1hTQUtFWSIsInNjb3BlIjpbImFwcGxpY2F0aW9uIl19.Y462TmQOWkORcl4BNnueDOu_Z6lBH42cj6loPtgJwKTK89qn8G2QL_FmfS9v4075iytq3M2628RXBjoNlOKBeEHU99O29Khbysw79dVL2MSuvWHwus1pF1nt9DChVNTz3BHIUjmg4rdGKU8CmjSiTJg8ig8fmtyXTYsL7DMvkw1SVvpHyoHJdBbOvuSmVYHuGkDvZEhf00NamuWWcmLVO4lDdvjJ2aoN1SsBUL49_aNggTMFehB-KI3ZghA5SGqgTeMtR1cLjRZV-C_NjeMY89bZXemmcPrBWfs5vSVck3vCg-DUGp6UUMuMMSWjXE7S80BbqaRJkFEWgISvo3e3xw`,
                },
            };

            const response = await fetch('https://my.jasminsoftware.com/api/242853/242853-0001/purchases/orders', options)
                .catch((error) => {
                    console.error(error);
                });

            const responseJson = await response.json();

            setItems(responseJson);
        };

        fetchData();
    }, []);

    console.log('BEFORE RENDERS:');
    console.log(items);

    if (items.length === 0) {
        console.log('Returning null');
        return null;
    }

    return (
        <div className={styles.orderListContent}>
            {console.log('BEFORE MAP:')}
            {console.log(items)}
            {
                items.map((item) => {
                    return (
                        <OrderItem order={item}/>
                    )
                })
            }
        </div>
    );
}

export default OrderList;