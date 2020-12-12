import { useEffect, useState } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import { getSale } from "../../../jasmin/sales";
import { updateToken } from "../../../jasmin/token";
import SidebarLayout from "../../../layouts/SidebarLayout";
import Tabel from "../../tabel/Tabel/Tabel";
import TabelHeader from "../../tabel/TabelHeader/TabelHeader";
import TabelRow from "../../tabel/TabelRow/TabelRow";
import styles from "./DeliveryNote.module.css";

const DeliveryNote = () => {    
    const [sale, setSale] = useState(null);
    const id = useParams();

    useEffect(() => {
            const fetchData = async () => {
                const sale = await getSale(id);
                setSale(sale);
            };

        }, []);
    
    const renderDeliveryNote = () => {
        if (sale !== null) {
            const deliveryId = "DV" + sale.serie + ("" + sale.seriesNumber).padStart(4, "0");
            const deliveryDate = sale.documentLines[0].deliveryDate.split("T")[0];

            return (
                <React.Fragment>
                    <div className={styles.deliveryNoteHeader}>
                        <h1 className={styles.deliveryNoteHeaderId}>Delivery Note {deliveryId}</h1>
                        <span className={styles.deliveryNoteHeaderDate}>Delivery Date: {deliveryDate}</span>
                    </div>
                    { renderSaleInfo() }
                    { renderSaleMovement() }
                    { renderProducts(sale.documentLines) }
                </React.Fragment>
            )
        }
    }

    const renderSaleInfo = () => {
        return (
            <section className={styles.saleInfoSection}>
                <span className={styles.saleInfoSectionItem}>Delivery ID: {sale.serie + ("" + sale.seriesNumber).padStart(4, "0")}</span>
                <span className={styles.saleInfoSectionItemVerBar}>|</span>
                <span className={styles.saleInfoSectionItem}>Customer: {sale.buyerCustomerPartyDescription}</span>
            </section>
        )
    }

    const parseProductInfo = (product) => {
        return [product.salesItem, product.salesItemDescription, product.quantity + " (" + product.unit + ")"];
    } 

    const renderProducts = (products) => {
        const tableHeaders = ["ID", "Name", "Quantity"];

        return (
            <section className={styles.productsSection}>
                <h2 className={styles.productsSectionHeader}>Products</h2>
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
            <section className={styles.movementSection}>
                <div className={styles.loadingSection}>
                    <h4 className={styles.loadingSectionHeader}>Loading</h4>
                    <div className={styles.loadingSectionInfo}>
                        <div className={styles.loadingSectionInfoItem}>
                            <span className={styles.loadingSectionInfoLabel}>Point:</span><span>{sale.loadingPoint}</span>
                        </div>
                        <div className={styles.loadingSectionInfoItem}>
                            <span className={styles.loadingSectionInfoLabel}>Street:</span><span>{sale.loadingStreetName}</span>
                        </div>
                        <div className={styles.loadingSectionInfoItem}>
                            <span className={styles.loadingSectionInfoLabel}>Postal code:</span><span>{sale.loadingPostalZone}</span>
                        </div>
                        <div className={styles.loadingSectionInfoItem}>
                            <span className={styles.loadingSectionInfoLabel}>City:</span><span>{sale.loadingCityName}</span>
                        </div>
                        <div className={styles.loadingSectionInfoItem}>
                            <span className={styles.loadingSectionInfoLabel}>Country:</span><span>{sale.loadingCountryDescription}</span>
                        </div>
                    </div>
                </div>
                <div className={styles.unloadingSection}>
                    <h4 className={styles.unloadingSectionHeader}>Unloading</h4>
                    <div className={styles.unloadingSectionInfo}>
                        <div className={styles.unloadingSectionInfoItem}>
                            <span className={styles.unloadingSectionInfoLabel}>Point:</span><span>{sale.unloadingPoint}</span>
                        </div>
                        <div className={styles.unloadingSectionInfoItem}>
                            <span className={styles.unloadingSectionInfoLabel}>Street:</span><span>{sale.unloadingStreetName}</span>
                        </div>
                        <div className={styles.unloadingSectionInfoItem}>
                            <span className={styles.unloadingSectionInfoLabel}>Postal code:</span><span>{sale.unloadingPostalZone}</span>
                        </div>
                        <div className={styles.unloadingSectionInfoItem}>
                            <span className={styles.unloadingSectionInfoLabel}>City:</span><span>{sale.unloadingCityName}</span>
                        </div>
                        <div className={styles.unloadingSectionInfoItem}>
                            <span className={styles.unloadingSectionInfoLabel}>Country:</span><span>{sale.unloadingCountryDescription}</span>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <SidebarLayout>
            { renderDeliveryNote() }
        </SidebarLayout>
    )
}   

export default DeliveryNote;