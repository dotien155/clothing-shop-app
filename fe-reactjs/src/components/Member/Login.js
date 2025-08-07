import { useState } from "react";
import { useNavigate } from "react-router-dom"; // hook chuyển trang
import API from "../../api";
import FormErrs from "../Error/FormErrs";

function Login() {
    const navigate = useNavigate();

    const [getInputs, setInputs] = useState({
        email: "",
        password: "",
        level: 0
    });
    const [errors, setErrors] = useState({});

    const handleInput = (e) => {
        const nameInput = e.target.name;
        const value = e.target.value;
        setInputs(state => ({ ...state, [nameInput]: value }))
    }

    function handleSubmit(e) {
        e.preventDefault();
        let errsSubmit = {};
        let flag = true;

        //Check email
        if (getInputs.email == "") {
            errsSubmit.email = "Vui lòng nhập email";
            flag = false;
        } else {
            const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            if (!regex.test(getInputs.email)) {
                errsSubmit.email = "Email không hợp lệ";
                flag = false;
            }
        }

        //Check password
        if (getInputs.password == "") {
            errsSubmit.password = "Vui lòng nhập pass";
            flag = false;
        }

        if (!flag) {
            setErrors(errsSubmit);
        } else {

            const data = {
                email: getInputs.email,
                password: getInputs.password,
                level: 0
            };

            API.post('login', data)
                .then(res => {
                    if (res.data.errors) {
                        setErrors(res.data.errors);
                    } else {
                        console.log(res)
                        localStorage.setItem("token", res.data.token); // save token vao localS de kiem tra da dang nhap chua
                        localStorage.setItem("account",JSON.stringify(res.data.Auth));
                        navigate('/');
                        //alert("okoe");
                    }
                })
                .catch(function (error) {
                    console.log(error)
                })
        }
    }
    return (
        <div className="col-sm-4 col-sm-offset-1">
            <div className="login-form">
                <FormErrs errs={errors} />
                <h2>Login to your account</h2>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="Email Address" name="email" onChange={handleInput} />
                    <input type="password" placeholder="Password" name="password" onChange={handleInput} />
                    <span>
                        <input type="checkbox" className="checkbox" />
                        Keep me signed in
                    </span>
                    <button type="submit" className="btn btn-default">Login</button>
                </form>
            </div>
        </div>
    )
}
export default Login;