function Rate() {
    return (
        <div className="rating-area">
            <ul className="ratings">
                <li className="rate-this">Rate this item:</li>
                <li>
                    <i className="fa fa-star color" />
                    <i className="fa fa-star color" />
                    <i className="fa fa-star color" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                </li>
                <li className="color">(6 votes)</li>
            </ul>
            <ul className="tag">
                <li>TAG:</li>
                <li><a className="color" >Pink <span>/</span></a></li>
                <li><a className="color" >T-Shirt <span>/</span></a></li>
                <li><a className="color" >Girls</a></li>
            </ul>
        </div>
    )
}
export default Rate;