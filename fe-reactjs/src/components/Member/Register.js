import { useState } from "react";
import API from "../../api";
import FormErrs from "../Error/FormErrs";

function Register() {

    const [getInputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        avatar: null,
        level: 0
    });

    const arrDuoiFiles = ["png", "jpg", "jpeg"];

    const [errs, setErrs] = useState({});

    const [getAvatar, setAvatar] = useState("");
    const [getFiles, setFiles] = useState("");

    const handleInput = (e) => {
        const nameInput = e.target.name;
        const value = e.target.value;
        setInputs(state => ({ ...state, [nameInput]: value }))
    }

    function handleFile(e) {

        const file = e.target.files;
        // send file to api serve
        let reader = new FileReader();
        reader.onload = (e) => {

            setAvatar(e.target.result); //de gui qua API
            setFiles(file);  //de form goi ra kiem tra
        };
        reader.readAsDataURL(file[0]);
    }

    function handleSubmit(e) {
        e.preventDefault();
        let errsSubmit = {};
        let flag = true;

        //Check name
        if (getInputs.name == "") {
            errsSubmit.name = "Vui lòng nhập tên người dùng";
            flag = false;
        }

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

        //Check Avatar
        if (getFiles == "") {
            errsSubmit.avatar = "Vui lòng chọn ảnh đại diện";
            flag = false;
        }
        else {

            // Check file type
            const getDuoiFile = getFiles[0].name.split('.').pop();

            if (!arrDuoiFiles.includes(getDuoiFile)) {
                errsSubmit.avatar = "Phải tải file ảnh";
                flag = false;
            }
            // Check file size ≤ 1MB = 1024 * 1024 bytes
            if (getFiles[0].size > 1024 * 1024) {
                errsSubmit.avatar = "Ảnh phải ≤ 1MB";
                flag = false;
            }
        }

        if (!flag) {
            setErrs(errsSubmit);
        } else {

            const data = {
                name: getInputs.name,
                email: getInputs.email,
                password: getInputs.password,
                phone: getInputs.phone,
                address: getInputs.address,
                level: 0,
                avatar: getAvatar
            };

            API.post('register', data)
                .then(res => {
                    if (res.data.errs) {
                        setErrs(res.data.errs);
                    } else {
                        alert('Success')
                    }
                })
                .catch(function (error) {
                    console.log(error)
                })
        }

    }
    return (
        <div className="col-sm-4">
            <div className="signup-form">
                <FormErrs errs={errs} />
                <h2>New User Signup!</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <input type="text" placeholder="Name" name="name" onChange={handleInput} />
                    <input type="email" placeholder="Email Address" name="email" onChange={handleInput} />
                    <input type="password" placeholder="Password" name="password" onChange={handleInput} />
                    <input type="text" placeholder="Phone" name="phone" onChange={handleInput} />
                    <input type="text" placeholder="Address" name="address" onChange={handleInput} />
                    <input type="file" name="avatar" onChange={handleFile} ></input>

                    <button type="submit" className="btn btn-default">Signup</button>
                </form>
            </div>
        </div>
    )
}
export default Register;