import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api";

function MyProduct() {
    const [myProduct, setMyProduct] = useState({});

    const accessToken = localStorage.getItem('token');
    const navigate = useNavigate();
    let config = {
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    };

    useEffect(() => {
        API.get("/user/my-product", config)
            .then(res => {
                console.log(res)
                setMyProduct(res.data.data);
                
            })
            .catch(function (error) {
                console.log(error)
            })
    }, [])

    const handleDelete = (id) => {
        let url = "/user/product/delete/" +  id;
        API.get(url, config)
        .then(res =>{
            console.log(res);
            setMyProduct(res.data.data);

        })
        .catch(function (error) {
            console.log(error);
        })
    }


    return (
        <div className="col-sm-9">
            <div className="table-responsive cart_info">
                <table className="table table-condensed" style={{ border: "1px solid gray" }}>
                    <thead>
                        <tr className="cart_menu" style={{ backgroundColor: "orange" }}>
                            <td className="id">ID</td>
                            <td className="name">Name</td>
                            <td className="image">Image</td>
                            <td className="price">Price</td>
                            <td className="action">Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(myProduct).length > 0 ? (
                            Object.values(myProduct).map((item) => {
                                return (
                                    <tr key={item.id} style={{color: "blue"}}>
                                        <td className="cart_id">
                                            <p>{item.id}</p>
                                        </td>
                                        <td className="cart_image">
                                            <img src={"http://localhost/laravel-api/laravel8/public/upload/product/"+ item.id_user +"/small_" + JSON.parse(item.image)[0]} />
                                        </td>
                                        <td className="cart_name">
                                            <p>{item.name}</p>
                                        </td>
                                        <td className="cart_price">
                                            <p>${item.price}</p>
                                        </td>
                                        <td className="cart_action">
                                            <Link to={"/account/edit-product/" + item.id} style={{ marginRight: 20 }}>Edit</Link>
                                            <button onClick={() => handleDelete(item.id)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        ) : (
                            <tr>
                                <td>
                                    Chưa có sản phẩm nào để hiển thị !!!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <button style={{ backgroundColor: "orange" }}
                    className="btn btn-default" onClick={() => navigate('/account/add-product')}>
                    ADD NEW
                </button>
            </div>
        </div>
    )
}
export default MyProduct;