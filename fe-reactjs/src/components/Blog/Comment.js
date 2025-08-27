import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FormErrs from "../Error/FormErrs";
import API from "../../api";
import ListComment from "./ListComment";

function Comment(props) {

    const { comments,  idBlog} = props;
    //console.log(props);
    //console.log(comments);
    

    const [idReply, setIdReply] = useState('');
    const [getComment, setComment] = useState([]);
    const [errors, setErrors] = useState({});
    const isLogin = localStorage.getItem('token');

    const handleComment = (e) => {
        setComment(e.target.value)
    }

    const handleReplyClick = (id) => {
        setIdReply(prev => prev === id ? '' : id);
        setErrors({});
    };

    function handleSubmit(e) {
        e.preventDefault();
        let errsSubmit = {};
        let flag = true;

        const accountData = JSON.parse(localStorage.getItem("account"));
        let accessToken = localStorage.getItem("token");
        let url = '/blog/comment/' + props.idBlog;

        //alert(accessToken);

        //config để gửi token qua api
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        };

        //check loi
        if (!isLogin) {
            errsSubmit.message = "Vui lòng Login";
            flag = false;
        }

        if (!getComment) {
            errsSubmit.message = "Vui lòng nhập nội dung bình luận";
            flag = false;
        }


        if (!flag) {
            setErrors(errsSubmit);
            return; // stop
        }

        const formData = new FormData();
        formData.append('id_blog', props.idBlog);
        formData.append('id_user', accountData.id);
        formData.append('id_comment', idReply || 0); //khong co idReply thi = 0
        formData.append('comment', getComment);
        formData.append('image_user', accountData.avatar);
        formData.append('name_user', accountData.name);

        API.post(url, formData, config)
            .then(res => {
                console.log(res);
                setComment('');
                props.getCmt(res.data.data); //truyền mảng chứa cmt mới qua Detail
            })
            .catch(function (error) {
                console.log(error)
            })

    }

    return (
        <div>
            <ListComment comments={comments} idReply={idReply} handleReplyClick={handleReplyClick} idBlog={idBlog} />
            <form className="replay-box" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-sm-12">
                        <FormErrs errs={errors} />
                        <h2>{idReply ? "Reply to Comment" : "Leave a Comment"}</h2>
                        <div className="text-area">
                            <div className="blank-arrow">
                                <label>Your Name</label>
                            </div>
                            <span>*</span>
                            <textarea name="message" rows={11}
                                value={getComment}
                                onChange={handleComment}
                            />
                            <button type="submit" className="btn btn-primary">Post</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>

    )
}
export default Comment;