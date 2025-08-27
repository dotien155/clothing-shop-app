import { useState } from "react";
import StarRatings from "react-star-ratings";
import API from "../../api";

function Rate(props) {

    const {idBlog} = props;
    const [rating, setRating] = useState(0);
    const isLogin = localStorage.getItem('token');


    
    function changeRating(newRating, name) {
        //alert(newRating);
        setRating(newRating);

        const accountData = JSON.parse(localStorage.getItem("account"));
        let accessToken = localStorage.getItem("token");
        let url = '/blog/rate/' + props.idBlog;

        //check login
        if (!isLogin) {
            alert("Vui lòng Login");
        } else {
            const data = {
                blog_id: props.idBlog,
                user_id: accountData.id,
                rate: newRating
            };
    
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            };
    
            API.post(url, data, config)
                .then(res => {
                    console.log(res);
    
                })
                .catch(function (error) {
                    console.log(error)
                })
        }


    }
    return (
        <StarRatings
            rating={rating}
            starRatedColor="blue"
            changeRating={changeRating}
            numberOfStars={6}
            name="rating"
        />

    )
}
export default Rate;