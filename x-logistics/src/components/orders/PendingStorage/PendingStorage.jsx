import React, {useEffect, useRef, useState} from 'react';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import Table from '../../table/Table/Table';
import TableHeader from '../../table/TableHeader/TableHeader';
import TableRow from '../../table/TableRow/TableRow';

import {sendJasminRequest} from '../../../jasmin/request';
import {getWarehouseItems} from '../../../jasmin/inventory';

import styles from './PendingStorage.module.css';
import Loader from '../../utils/Loader';
import {reorder as reorder2} from "../../../utils/reoder";import { Button } from '@material-ui/core';
;

const PendingStorage = (props) => {
	const tableHeaders = ['ID', 'Name', 'Category', 'Quantity', 'Storage'];
	
	const [items, setItems] = useState(null);
	let lastTarget = useRef(0)
	let reversed = useRef(true)
	
	useEffect(() => {
		const fetchData = async () => {
			const response = await getWarehouseItems('RECEPTION');
			let items = response.items.map(item => {
				return [
					item.id,
					item.name,
					item.category,
					item.stock,
				]
			})
			setItems(reorder2(lastTarget.current, items, reversed.current))
		}
		
		fetchData();
	}, [])
	
	const renderItems = () => {
		if (items === null) {
			return <Loader/>
		} else if (items.length > 0) {
			return (
				items.map((item, index) => {
					return (
						<TableRow
							key={index}
							data={item}
							actionComponent={
								<Popup trigger={open => (<Button className={styles.popupButton}>Confirm</Button>)} modal='true'>
									<ItemsStoragePopup item={item}/>
								</Popup>}
						/>
					)
				})
			)
		} else if (items.length === 0) {
			return <span>No orders found</span>
		}
	}
	const reorder = (target) => {
		if (lastTarget.current === target)
			reversed.current = !reversed.current
		const sorted = reorder2(target, items, reversed.current)
		lastTarget.current = target //used for reverting order if clicked twice in succession
		setItems(sorted)
	}
	return (
		<Table>
			<TableHeader headers={tableHeaders} reorder={reorder}
									 reorderProperties={[0, 1, 2,3]}
									 orderSelected={[reversed.current, lastTarget.current]}/>
			{renderItems()}
		</Table>
	)
}

const ItemsStoragePopup = (props) => {
	const [selectedRow, setRow] = useState('A');
	const [selectedCol, setCol] = useState('1');
	const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
	
	const _handleRowChange = (event) => {
		setRow(event.target.value);
	}
	
	const _handleColChange = (event) => {
		setCol(event.target.value);
	}
	
	const _confirmItemStorage = async () => {
		const body = {
			loadingStreetName: 'Dr. Roberto Frias',
			loadingBuildingNumber: '1',
			loadingPostalZone: '4200-465',
			loadingCityName: 'Porto',
			company: 'GXSA',
			loadingCountry: 'PT',
			unloadingCountry: 'PT',
			sourceWarehouse: 'RECEPTION',
			targetWarehouse: selectedRow + selectedCol,
			documentLines: [
				{
					quantity: props.item[3],
					materialsItem: props.item[0],
				}
			],
		};
		console.log(body);

		setLoading(true);
		
		const response = await sendJasminRequest(
			`materialsManagement/stockTransferOrders`,
			'POST',
			//body,
		);
		
        setLoading(false);
        setDone(true);
	}
	
	const rowOptions = [
		'A', 'B', 'C', 'D', 'E', 'F'
	];
	
	const columnOptions = [
		'1', '2', '3', '4', '5', '6', '7'
	];
	
	return (
		<div>
		<div className={styles.popUp}>
			<span className={styles.storagePopup}>Choose storage section:</span>
			<div className={styles.selectors}>
				<select value={selectedRow} onChange={_handleRowChange}>
					{
						rowOptions.map((option) => {
							return (
								<option key={option}>{option}</option>
							)
						})
					}
				</select>
				<select value={selectedCol} onChange={_handleColChange}>
					{
						columnOptions.map((option) => {
							return (
								<option key={option}>{option}</option>
							)
						})
					}
				</select>
			</div>
			<button disabled={done} type="button" className="btn" onClick={_confirmItemStorage}>Confirm</button>
		</div>
		<div class={styles.loaderSection}>
			{ loading && <Loader size="5em" marginTop="0"/> }
		</div>
		</div>
	)
};

export default PendingStorage;