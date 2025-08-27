import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api";

function ProductDetail() {
    const params = useParams();
    const [data, setData] = useState('');
    const url = '/product/detail/' + params.id;
    //console.log(url);

    useEffect(() => {
        API.get(url)
            .then(res => {
                console.log(res);
                setData(res.data.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])

    return (
        <div className="col-sm-9 padding-right">
            {data && (
                <div className="product-details">{/*product-details*/}
                    <div className="col-sm-5">
                        <div className="view-product">
                            <img src={"http://localhost/laravel-api/laravel8/public/upload/product/" + data.id_user + "/" + JSON.parse(data.image)[0]} />
                            <a href="images/product-details/1.jpg" rel="prettyPhoto"><h3>ZOOM</h3></a>
                        </div>
                        <div id="similar-product" className="carousel slide" data-ride="carousel">
                            {/* Wrapper for slides */}
                            <div className="carousel-inner">
                                {JSON.parse(data.image).map((value, index) => (
                                    <div className={index == 0 ? "item active" : "item"}>
                                        {JSON.parse(data.image).map((img, i) => (
                                            <img key={i} src={"http://localhost/laravel-api/laravel8/public/upload/product/" + data.id_user + "/small_" + img} />
                                        ))}
                                    </div>
                                ))}
                            </div>
                            {/* Controls */}
                            <a className="left item-control" href="#similar-product" data-slide="prev">
                                <i className="fa fa-angle-left" />
                            </a>
                            <a className="right item-control" href="#similar-product" data-slide="next">
                                <i className="fa fa-angle-right" />
                            </a>
                        </div>
                    </div>
                    <div className="col-sm-7">
                        <div className="product-information">{/*/product-information*/}
                            <img src={data.status == 1 ? "http://localhost/laravel-api/laravel8/public/frontend/images/product-details/new.jpg" : ""} className="newarrival" alt="" />
                            <h2>{data.name}</h2>
                            <p>Web ID: {data.id}</p>
                            <img src="images/product-details/rating.png" alt="" />
                            <span>
                                <span>US ${data.price}</span>
                                <label>Quantity:</label>
                                <input type="text" defaultValue={3} />
                                <button type="button" className="btn btn-fefault cart">
                                    <i className="fa fa-shopping-cart" />
                                    Add to cart
                                </button>
                            </span>
                            <p><b>Availability:</b> In Stock</p>
                            <p><b>Condition:</b> {data.status == 1 ? "New" : "Sale"}</p>
                            <p><b>Brand:</b> E-SHOPPER</p>
                            <img src="http://localhost/laravel-api/laravel8/public/frontend/images/product-details/share.png" className="share img-responsive" alt="" />
                        </div>{/*/product-information*/}
                    </div>
                </div>
            )}
            <div className="category-tab shop-details-tab">{/*category-tab*/}
                <div className="col-sm-12">
                    <ul className="nav nav-tabs">
                        <li><a href="#details" data-toggle="tab">Details</a></li>
                        <li><a href="#companyprofile" data-toggle="tab">Company Profile</a></li>
                        <li><a href="#tag" data-toggle="tab">Tag</a></li>
                        <li className="active"><a href="#reviews" data-toggle="tab">Reviews (5)</a></li>
                    </ul>
                </div>
                <div className="tab-content">
                    <div className="tab-pane fade" id="details">
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery1.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery2.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery3.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery4.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="companyprofile">
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery1.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery3.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery2.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery4.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="tag">
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery1.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery2.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery3.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery4.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade active in" id="reviews">
                        <div className="col-sm-12">
                            <ul>
                                <li><a href><i className="fa fa-user" />EUGEN</a></li>
                                <li><a href><i className="fa fa-clock-o" />12:41 PM</a></li>
                                <li><a href><i className="fa fa-calendar-o" />31 DEC 2014</a></li>
                            </ul>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                            <p><b>Write Your Review</b></p>
                            <form action="#">
                                <span>
                                    <input type="text" placeholder="Your Name" />
                                    <input type="email" placeholder="Email Address" />
                                </span>
                                <textarea name defaultValue={""} />
                                <b>Rating: </b> <img src="images/product-details/rating.png" alt="" />
                                <button type="button" className="btn btn-default pull-right">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>{/*/category-tab*/}
            <div className="recommended_items">{/*recommended_items*/}
                <h2 className="title text-center">recommended items</h2>
                <div id="recommended-item-carousel" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="item active">
                            <div className="col-sm-4">
                                <div className="product-image-wrapper">
                                    <div className="single-products">
                                        <div className="productinfo text-center">
                                            <img src="images/home/recommend1.jpg" alt="" />
                                            <h2>$56</h2>
                                            <p>Easy Polo Black Edition</p>
                                            <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="product-image-wrapper">
                                    <div className="single-products">
                                        <div className="productinfo text-center">
                                            <img src="images/home/recommend2.jpg" alt="" />
                                            <h2>$56</h2>
                                            <p>Easy Polo Black Edition</p>
                                            <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="product-image-wrapper">
                                    <div className="single-products">
                                        <div className="productinfo text-center">
                                            <img src="images/home/recommend3.jpg" alt="" />
                                            <h2>$56</h2>
                                            <p>Easy Polo Black Edition</p>
                                            <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="col-sm-4">
                                <div className="product-image-wrapper">
                                    <div className="single-products">
                                        <div className="productinfo text-center">
                                            <img src="images/home/recommend1.jpg" alt="" />
                                            <h2>$56</h2>
                                            <p>Easy Polo Black Edition</p>
                                            <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="product-image-wrapper">
                                    <div className="single-products">
                                        <div className="productinfo text-center">
                                            <img src="images/home/recommend2.jpg" alt="" />
                                            <h2>$56</h2>
                                            <p>Easy Polo Black Edition</p>
                                            <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="product-image-wrapper">
                                    <div className="single-products">
                                        <div className="productinfo text-center">
                                            <img src="images/home/recommend3.jpg" alt="" />
                                            <h2>$56</h2>
                                            <p>Easy Polo Black Edition</p>
                                            <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a className="left recommended-item-control" href="#recommended-item-carousel" data-slide="prev">
                        <i className="fa fa-angle-left" />
                    </a>
                    <a className="right recommended-item-control" href="#recommended-item-carousel" data-slide="next">
                        <i className="fa fa-angle-right" />
                    </a>
                </div>
            </div>{/*/recommended_items*/}
        </div>
    )
}
export default ProductDetail;