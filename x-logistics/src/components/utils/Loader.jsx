export default function Loader(props) {
    return (
        <div className={`d-flex justify-content-center ${ props.marginTop ? "mt-"+props.marginTop : "mt-5"}`}>
            <div className="spinner-border" style={{width: props.size ? props.size : "10em", height: props.size ? props.size : "10em", }} role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}