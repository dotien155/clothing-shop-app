import { useEffect, useState } from "react";
import API from "../../api";
import { useParams } from "react-router-dom";
import Rate from "./Rate";
import ListComment from "./ListComment";
import Comment from "./Comment";
import StarRatings from "react-star-ratings";


function Detail(props) {
    let params = useParams(); //useParams là hook để lấy tham số trên URL path

    const [data, setData] = useState('');
    const [listCmt, setListCmt] = useState([]);
    const [getAvgRating, setAvgRating] = useState(0);

    function getComment(newData) {
        console.log("newData:", newData);
        setListCmt(prev => [newData, ...prev]);
    }
    
    useEffect(() => {
        API.get('/blog/detail/' + params.id)
            .then(res => {
                setData(res.data.data);
                setListCmt(res.data.data.comment); //DS comment 
            })
            .catch(function (error) {
                console.log(error);
            })

        API.get('/blog/rate/' + params.id)
            .then(res => {
                //console.log(res.data.data);
                const arrRating = res.data.data;
                const avgRating = arrRating.reduce((total, item) => total + item.rate,0) / arrRating.length;
                //alert(avgRating);
                setAvgRating(avgRating);    
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])


    return (
        <div className="col-sm-9">
            <div className="blog-post-area">
                <h2 className="title text-center">Latest From our Blog</h2>
                <div className="single-blog-post">
                    <h3>{data.title}</h3>
                    <div className="post-meta">
                        <ul>
                            <li><i className="fa fa-user" /> Mac Doe</li>
                            <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                            <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                        </ul>
                    </div>
                    <img src={"http://localhost/laravel-api/laravel8/public/upload/Blog/image/" + data['image']} />
                    <div dangerouslySetInnerHTML={{ __html: data.description }} />    {/*render nội dung HTML từ một chuỗi string. */}
                    <div dangerouslySetInnerHTML={{ __html: data.content }} />

                    <div className="pager-area">
                        <ul className="pager pull-right">
                            <li><a href="#">Pre</a></li>
                            <li><a href="#">Next</a></li>
                        </ul>
                    </div>
                </div>
            </div>{/*/blog-post-area*/}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <StarRatings
                    rating={getAvgRating}
                    starRatedColor="blue"
                    numberOfStars={6}
                    name="rating"
                />
                </div>
            <Rate idBlog={params.id} getAvgRating={getAvgRating}/>
            <div className="socials-share">
                <a ><img src={"http://localhost/laravel-api/laravel8/public/frontend/images/blog/socials.png"} alt="" /></a>
            </div>{/*/socials-share*/}
            <Comment comments={listCmt} idBlog={params.id} getCmt={getComment} />
        </div>
    )
}
export default Detail;