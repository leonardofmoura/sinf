import { useEffect, useState } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import { getSale } from "../../../jasmin/sales";
import { setAutoToken } from "../../../jasmin/token";
import SidebarLayout from "../../../layouts/SidebarLayout";
import Tabel from "../../tabel/Tabel/Tabel";
import TabelHeader from "../../tabel/TabelHeader/TabelHeader";
import TabelRow from "../../tabel/TabelRow/TabelRow";

export default function DeliveryNote() {
    setAutoToken();
    const [sale, setSale] = useState(null);
    const { id } = useParams();

    useEffect(() => {
            const fetchData = async () => {
                const sale = await getSale(id);
                console.log(sale);
                setSale(sale);
            };
            
            fetchData();
        }, []);
    
    const renderDeliveryNote = () => {
        if (sale !== null) {
            return (
                <React.Fragment>
                    <h1>Delivery Note: 31244</h1>
                    { renderSaleInfo() }
                    { renderProducts(sale.documentLines) }
                    { renderSaleMovement() }
                </React.Fragment>
            )
        }
    }

    const renderSaleInfo = () => {
        return (
            <span>ola</span>
        )
    }

    const parseProductInfo = (product) => {
        return [product.id, product.salesItemDescription, product.quantity + " (" + product.unit + ")"];
    }

    const renderProducts = (products) => {
        const tableHeaders = ["ID", "Name", "Quantity"];

        return (
            <section>
                <h2>Products</h2>
                <Tabel>
                    <TabelHeader headers={tableHeaders}/>
                    {
                        products.map((product, index) => {
                            return <TabelRow data={parseProductInfo(product)} key={index} /> 
                        })
                    }
                </Tabel>
            </section>
        ) 
    }

    const renderSaleMovement = () => {
        return (
            <span>another hello</span>
        )
    }

    return (
        <SidebarLayout>
            { renderDeliveryNote() }
        </SidebarLayout>
    )
}   