
function ListComment(props) {

    const { comments = [], handleReplyClick } = props;
    console.log(comments);
    //console.log("comment: ",comments);
    //console.log("dem: ",comments.length);

    return (
        <div className="response-area">
            <h2>{comments.length} RESPONSES</h2>
            <ul className="media-list">
                {comments.map((cmt, index) => {
                    if (cmt.id_comment == 0) {
                        return (
                            <li key={index} className="media">
                                <a className="pull-left" href="#">
                                    <img
                                        className="media-object"
                                        src={
                                            "http://localhost/laravel-api/laravel8/public/upload/user/avatar/" +
                                            cmt.image_user
                                        }
                                        style={{ width: "100px" }}
                                    />
                                </a>
                                <div className="media-body">
                                    <ul className="sinlge-post-meta">
                                        <li><i className="fa fa-user" />{cmt.name}</li>
                                        <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                                        <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                                    </ul>
                                    <p>{cmt.comment}</p>
                                    <a className="btn btn-primary" onClick={() => handleReplyClick(cmt.id)}>
                                        <i className="fa fa-reply" />Reply
                                    </a>

                                    {/*comment con */}
                                    {comments.map((child, childIndex) => {
                                        if (child.id_comment == cmt.id) {
                                            return (
                                                <div key={childIndex} className="media second-media">
                                                    <a className="pull-left" href="#">
                                                        <img className="media-object" src={"http://localhost/laravel-api/laravel8/public/upload/user/avatar/" + child.image_user} style={{ width: "50px" }} />
                                                    </a>
                                                    <div className="media-body">
                                                        <ul className="sinlge-post-meta">
                                                            <li><i className="fa fa-user" />{child.name}</li>
                                                            <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                                                            <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                                                        </ul>
                                                        <p>{child.comment}</p>
                                                    </div>
                                                </div>
                                            );
                                        }
                                        return null;
                                    })}
                                </div>
                            </li>
                        );
                    }
                    return null;
                })}
            </ul>
        </div>
    )
}
export default ListComment;