import React, {useEffect, useRef, useState} from 'react';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import Table from '../../table/Table/Table';
import TableHeader from '../../table/TableHeader/TableHeader';
import TableRow from '../../table/TableRow/TableRow';
import TableRowSubRow from '../../table/TableRowSubRow/TableRowSubRow';

import {sendJasminRequest} from '../../../jasmin/request';
import Loader from '../../utils/Loader';

import styles from './PendingReception.module.css';
import {reorderDoubleArray} from "../../../utils/reoder";

import { LinearProgress } from "@material-ui/core";

const PendingReception = (props) => {
	const tableHeaders = ['ID', 'Supplier', 'Date'];
	const subTableHeaders = ['Item', 'Description', 'Quantity', 'Reception'];
	
	const [orders, setOrders] = useState(null);
	let lastTarget = useRef(0)
	let reversed = useRef(true)
	
	useEffect(() => {
		const fetchData = async () => {
			const itemsResponse = await sendJasminRequest('goodsReceipt/processOrders/1/1000?company=GXSA', 'GET');
			const ordersResponse = await sendJasminRequest('purchases/orders', 'GET');
			
			const uniqueOrdersToProcess = itemsResponse.data.map(item => item.sourceDocKey);
			const filteredOrders = ordersResponse.data.filter(item => uniqueOrdersToProcess.includes(item.naturalKey));
			
			let items = filteredOrders.map(order => {
				return {
					data: [
						order.naturalKey,
						order.sellerSupplierPartyName,
						order.documentDate.split("T")[0],
					],
					items: itemsResponse.data.filter(item => item.sourceDocKey === order.naturalKey).map(item => {
						return {
							tableData: [
								item.item,
								item.description,
								item.quantity,
							],
							requestData: {
								item: item.item,
								sourceDocLineNumber: item.sourceDocLineNumber,
								quantity: item.quantity,
							}
						}
					}),
				}
			})
			setOrders(reorderDoubleArray(lastTarget.current, items, reversed.current, "data"))
		}
		fetchData();
	}, []);
	
	const renderOrders = () => {
		if (orders === null) {
			return <Loader/>
		} else if (orders.length > 0) {
			return (
				orders.map((order, index) => {
					return (
						<TableRow
							key={index}
							subHeaders={subTableHeaders}
							data={order.data}
						>
							{
								order.items.map((item, index) => {
									return (
										<TableRowSubRow
											data={item.tableData}
											key={index}
											actionComponent={
												<Popup trigger={open => (<button>Confirm</button>)} modal='true'>
													<ConfirmReceptionPopup order={order.data} item={item}/>
												</Popup>}
										/>
									)
								})
							}
						</TableRow>
					)
				})
			)
		} else if (orders.length === 0) {
			return (<span>No orders found</span>)
		}
	}
	const reorder = (target) => {
		if (lastTarget.current === target)
			reversed.current = !reversed.current
		const sorted = reorderDoubleArray(target, orders, reversed.current,"data")
		lastTarget.current = target //used for reverting order if clicked twice in succession
		setOrders(sorted)
	}
	return (
		<Table>
			<TableHeader headers={tableHeaders} reorder={reorder}
									 reorderProperties={[0, 1, 2]}
									 orderSelected={[reversed.current, lastTarget.current]}/>
			{renderOrders()}
		</Table>
	)
};

const ConfirmReceptionPopup = (props) => {
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);

    const _confirmItemReception = async () => {
        const body = [
            {
                sourceDocKey: props.order[0],
                quantity: props.item.requestData.quantity,
                sourceDocLineNumber: props.item.requestData.sourceDocLineNumber,
            }
        ];

        setLoading(true);

        const response = await sendJasminRequest(
            'goodsReceipt/processOrders/GXSA',
            'POST',
            body,
        );

        setLoading(false);
        setDone(true);
        window.location.reload(false);
    }

    return(
        <div>
            <div class={styles.confirmSection}>
                <span>{`Do you wish to confirm reception of ${props.item.tableData[2]} ${props.item.tableData[0]}s of order ${props.order[0]}?`}</span>
                <button disabled={done} type="button" className="btn" onClick={_confirmItemReception}>Confirm</button>
            </div>
            <div class={styles.loaderSection}>
                { loading && <Loader size="5em" marginTop="0"/> }
            </div>
        </div>
    );
};

export default PendingReception;