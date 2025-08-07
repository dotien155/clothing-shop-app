import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // hook chuyển trang

function Header() {

    const navigate = useNavigate();

    const isLogin = localStorage.getItem('token');


    //click logout xoa all local va chuyen huong ve login
    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };
    return (
        <div className="App">
            <header id="header">{/*header*/}
                <div className="header_top">{/*header_top*/}
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="contactinfo">
                                    <ul className="nav nav-pills">
                                        <li><a href="#"><i className="fa fa-phone" /> +2 95 01 88 821</a></li>
                                        <li><a href="#"><i className="fa fa-envelope" /> info@domain.com</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="social-icons pull-right">
                                    <ul className="nav navbar-nav">
                                        <li><a href="#"><i className="fa fa-facebook" /></a></li>
                                        <li><a href="#"><i className="fa fa-twitter" /></a></li>
                                        <li><a href="#"><i className="fa fa-linkedin" /></a></li>
                                        <li><a href="#"><i className="fa fa-dribbble" /></a></li>
                                        <li><a href="#"><i className="fa fa-google-plus" /></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>{/*/header_top*/}
                <div className="header-middle">{/*header-middle*/}
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 clearfix">
                                <div className="logo pull-left">
                                    <a href="{{ url('/') }}"><img src={"http://localhost/laravel-api/laravel8/public/frontend/images/home/logo.png"} alt="" /></a>
                                </div>
                            </div>
                            <div className="col-md-8 clearfix">
                                <div className="shop-menu clearfix pull-right">
                                    {/* <ul className="nav navbar-nav">
                                        <li><a href="{{ url('/yourCart') }}"><i className="fa fa-shopping-cart" /><span className="badge badge-warning count-cart" id="lblCartCount" /> Cart</a></li>
                                        @guest
                                        <li className="nav-item">
                                            <a className="nav-link" href="{{ url('/member-login') }}"><i className="fa fa-lock" />{'{'}{'{'} __('Login') {'}'}{'}'}</a>
                                        </li>
                                        @if (Route::has('register'))
                                        <li className="nav-item">
                                            <a className="nav-link" href="{{ url('/member-register') }}"><i className="fa fa-user" />{'{'}{'{'} __('Register') {'}'}{'}'}</a>
                                        </li>
                                        @endif
                                        @else
                                        <li className="nav-item dropdown">
                                            <img src="{{ URL::to('/upload/user/avatar/'.Auth::user()->avatar) }}" alt="user" className="rounded-circle" style={{ width: '20px', height: '20px' }} />
                                            <a style={{ display: 'inline-block' }} id="navbarDropdown" className="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                                {'{'}{'{'} Auth::user()-&gt;name {'}'}{'}'} <span className="caret" />
                                            </a>
                                            <div style={{ padding: '10px' }} className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                                <p><a className="dropdown-item" href="{{ url('/member-logout') }}">
                                                    {'{'}{'{'} __('Logout') {'}'}{'}'}
                                                </a></p>
                                                <p><a className="dropdown-item" href="{{ url('/product/'.Auth::user()->id.'/list') }}">
                                                    {'{'}{'{'} ('View your product') {'}'}{'}'}
                                                </a></p>
                                                <p><a className="dropdown-item" href="{{ url('/product/add') }}">
                                                    {'{'}{'{'} ('Add product') {'}'}{'}'}
                                                </a></p>
                                                <p><a className="dropdown-item" href="{{ url('/member-profile') }}">
                                                    {'{'}{'{'} ('Profile') {'}'}{'}'}
                                                </a></p>
                                            </div>
                                        </li>
                                        @endguest
                                    </ul> */}
                                    <ul className="nav navbar-nav">
                                        <li>
                                            <a href="/yourCart">
                                                <i className="fa fa-shopping-cart" />
                                                <span className="badge badge-warning count-cart" id="lblCartCount"></span>
                                                Cart
                                            </a>
                                        </li>

                                        {!isLogin ? (
                                            <>
                                                <li className="nav-item">
                                                    <Link to="/login"><i className="fa fa-lock" />Login</Link>
                                                </li>

                                                <li className="nav-item">
                                                    <Link to="/register"><i className="fa fa-user" />Register</Link>
                                                </li>
                                            </>
                                        ) : (
                                            <>
                                                <li className="nav-item">
                                                    <Link to="/account"><i className="fa fa-lock" />Account</Link>
                                                </li>

                                                <li className="nav-item">
                                                    <a onClick={handleLogout} style={{ cursor: 'pointer' }}>
                                                        <i className="fa fa-unlock" />Logout
                                                    </a>
                                                </li>
                                            </>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>{/*/header-middle*/}
                <div className="header-bottom">{/*header-bottom*/}
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-9">
                                <div className="navbar-header">
                                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                                        <span className="sr-only">Toggle navigation</span>
                                        <span className="icon-bar" />
                                        <span className="icon-bar" />
                                        <span className="icon-bar" />
                                    </button>
                                </div>
                                <div className="mainmenu pull-left">
                                    <ul className="nav navbar-nav collapse navbar-collapse">
                                        <li><a href="/" className="active">Home</a></li>
                                        <li className="dropdown"><a href="/">Shop<i className="fa fa-angle-down" /></a>
                                            {/*  <ul role="menu" class="sub-menu">
                                    <li><a href="shop.html">Products</a></li>
									<li><a href="product-details.html">Product Details</a></li> 
									<li><a href="checkout.html">Checkout</a></li> 
									<li><a href="cart.html">Cart</a></li> 
									<li><a href="login.html">Login</a></li> 
                                </ul> */}
                                        </li>
                                        <li className="dropdown">
                                            <Link to="/blog">Blog<i className="fa fa-angle-down" /></Link>
                                            {/* <ul role="menu" class="sub-menu">
                                    <li><a href="{{ url('/blog/list') }}">Blog List</a></li>
									<li><a href="blog-single.html">Blog Single</a></li>
                                </ul> */}
                                        </li>
                                        {/* <li><a href="404.html">404</a></li> */}
                                        <li><a href="contact-us.html">Contact</a></li>
                                    </ul>
                                </div>
                            </div>
                            {/* <div className="col-sm-3">
                                <div className="search_box pull-right">
                                    <form style={{ position: 'relative' }} action="{{ url('/search') }}" method="GET">
                                        @csrf
                                        <input type="text" name="search_content" placeholder="Search" />
                                        <button type="submit" className="btn btn-default search">Search
                                        </button>
                                    </form>
                                </div>
                            </div> */}
                            <div className="col-sm-3">
                                <div className="search_box pull-right">
                                    <form style={{ position: "relative" }} action="/search" method="GET">
                                        <input type="text" name="search_content" placeholder="Search" />
                                        <button type="submit" className="btn btn-default search">Search</button>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>{/*/header-bottom*/}
            </header>{/*/header*/}
        </div>

    );
}

export default Header;