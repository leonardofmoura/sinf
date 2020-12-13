export default function Loader(props) {
    return (
        <div className="d-flex justify-content-center mt-5">
            <div className="spinner-border" style={{width: "15rem", height: "15rem", }} role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}