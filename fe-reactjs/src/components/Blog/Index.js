import { useEffect, useState } from "react";
import API from "../../api";
import { Link } from "react-router-dom";


function Index() {

    const [getItem, setItem] = useState('');

    useEffect(() => {
        API.get("blog")
            .then(res => {
                setItem(res.data.blog)
            })
            .catch(function (error) {
                console.log(error)
            })
    }, [])

    function fetchData() {
        if (Object.keys(getItem).length > 0) {
            return getItem.data.map((value, key) => {
                return (
                    <div className="single-blog-post" key={key}>
                        <h3>{value.title}</h3>
                        <div className="post-meta">
                            <ul>
                                <li><i className="fa fa-user" /> Mac Doe</li>
                                <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                                <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                            </ul>
                            <span>
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star-half-o" />
                            </span>
                        </div>
                        <a href>
                            <img src={"http://localhost/laravel-api/laravel8/public/upload/Blog/image/" + value['image']} />
                        </a>
                        <p>{value.description}</p>
                        <Link to={"/blog/detail/" + value.id } className="btn btn-primary">Read More</Link>
                    </div>
                )
            })
        }
    }

    return (
        <div className="col-sm-9">
            <div className="blog-post-area">
                <h2 className="title text-center">Lastest From out Blog</h2>
                {fetchData()}
            </div>
        </div>
    )
}
export default Index;