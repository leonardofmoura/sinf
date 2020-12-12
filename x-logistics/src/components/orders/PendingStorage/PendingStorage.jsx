import React, { useEffect, useState } from 'react';

import Tabel from '../../tabel/Tabel/Tabel';
import TabelHeader from '../../tabel/TabelHeader/TabelHeader';
import TabelRow from '../../tabel/TabelRow/TabelRow';
import TabelRowSubRow from '../../tabel/TabelRowSubRow/TabelRowSubRow';

import { sendJasminRequest } from '../../../jasmin/request';
import { getWarehouseItems } from '../../../jasmin/inventory';

const PendingStorage = (props) => {
    const tableHeaders = ['ID', 'Name', 'Category', 'Quantity'];

    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getWarehouseItems('RECEPTION');
            console.log(response);

            setItems(response.items.map(item => {
                return [
                    item.id,
                    item.name,
                    item.category,
                    item.stock,
                ]
            }))
        }

        fetchData();
    }, [])

    return(
        <Tabel>
            <TabelHeader headers={tableHeaders}/>
            {
                items.map((item, index) => {
                    return(
                        <TabelRow
                            key={index}
                            data={items}
                        >

                        </TabelRow>
                    )
                })
            }
        </Tabel>
    )
}

export default PendingStorage;