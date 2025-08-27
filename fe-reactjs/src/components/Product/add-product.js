import { useEffect, useState } from "react";
import API from "../../api";
import FormErrs from "../Error/FormErrs";

function AddProduct() {

    const [brand, setBrand] = useState([]);
    const [category, setCategory] = useState([]);
    const [getFiles, setFiles] = useState("");
    const [errs, setErrs] = useState({});

    const arrDuoiFiles = ["png", "jpg", "jpeg"];

    const [getInputs, setInputs] = useState({
        name: "",
        price: "",
        id_category: "",
        id_brand: "",
        status: 1,
        sale: 0,
        detail: "",
        company: "",
        image: null
    })
    const handleInput = (e) => {
        const nameInput = e.target.name;
        const value = e.target.value;
        setInputs(state => ({ ...state, [nameInput]: value }))
    };

    function handleFile(e) {

        const images = Array.from(e.target.files); //Array.form() de chuyen filelist thanh mang
        console.log(images);

        if (images.length > 3) {
            setErrs(prev => ({ ...prev, files: `Chỉ được upload tối đa 3 hình.` }));
            return;
        }

        setFiles(images);
    }

    function handleSubmit(e) {
        e.preventDefault();
        let errsSubmit = {};
        let flag = true;

        //Check name
        if (getInputs.name == "") {
            errsSubmit.name = "Vui lòng nhập tên product";
            flag = false;
        }
        //Check price
        if (getInputs.price == "") {
            errsSubmit.price = "Vui lòng nhập price";
            flag = false;
        }
        //Check brand
        if (getInputs.id_brand == "") {
            errsSubmit.id_brand = "Vui lòng chọn brand";
            flag = false;
        }
        //Check category
        if (getInputs.id_category == "") {
            errsSubmit.id_category = "Vui lòng chọn categry";
            flag = false;
        }
        //Check status
        if (getInputs.status == "") {
            errsSubmit.status = "Vui lòng chọn New or Sale";
            flag = false;
        }
        //Check detail
        if (getInputs.detail == "") {
            errsSubmit.detail = "Vui lòng nhập detail";
            flag = false;
        }
        //Check company
        if (getInputs.company == "") {
            errsSubmit.company = "Vui lòng nhập company";
            flag = false;
        }

        //check image
        if (getFiles == "") {
            errsSubmit.avatar = "Vui lòng chọn ít nhất 1 ảnh";
            flag = false;
        }
        else {

            for (let file of getFiles) {
                // Check file type
                const getDuoiFile = file.name.split('.').pop().toLowerCase();

                if (!arrDuoiFiles.includes(getDuoiFile)) {
                    errsSubmit.avatar = "Phải tải file ảnh";
                    flag = false;
                }
                // Check file size ≤ 1MB = 1024 * 1024 bytes
                if (file.size > 1024 * 1024) {
                    errsSubmit.avatar = "Ảnh phải ≤ 1MB";
                    flag = false;
                }
            }
        }

        if (!flag) {
            setErrs(errsSubmit);
        } else {

            const accessToken = localStorage.getItem('token');
            //alert(accessToken);
            //config để gửi token qua api
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    // 'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json'
                }
            };

            let formData = new FormData();
            formData.append('name', getInputs.name);
            formData.append('price', getInputs.price);
            formData.append('category', getInputs.id_category);
            formData.append('brand', getInputs.id_brand);
            formData.append('company', getInputs.company);
            formData.append('detail', getInputs.detail);
            formData.append('status', getInputs.status);
            formData.append('sale', getInputs.sale);

            Object.keys(getFiles).map((item, i) => {
                formData.append('file[]', getFiles[item]);
            });

            console.log(config);
            console.log(accessToken);
            API.post('/user/product/add' ,formData ,config)
            .then(res => {
                console.log(res);

            })
            .catch(function(error) {
                console.log(error);
            })



        }
    }


    useEffect(() => {
        API.get('/category-brand')
            .then(res => {
                console.log(res);
                setBrand(res.data.brand);
                setCategory(res.data.category);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])

    return (
        <div className="col-sm-9">
            <div className="blog-post-area">
                <h3 class="title text-center">Create New Product!</h3>
                <FormErrs errs={errs} />
                <div class="signup-form">
                    <form encType="multipart/form-data" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <div className="col-md-12">
                                <input type="text" placeholder="Name" name="name" onChange={handleInput} />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-md-12">
                                <input type="text" placeholder="Price" name="price" onChange={handleInput} />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-md-12">
                                <select className="form-control form-control-line" name="id_category" onChange={handleInput}>
                                    <option >Please choose category</option>
                                    {category.map((value, key) => (
                                        <option key={key} value={value.id} > {value.category} </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-md-12">
                                <select className="form-control form-control-line" name="id_brand" onChange={handleInput} >
                                    <option >Please choose brand</option>
                                    {brand.map((value, key) => (
                                        <option key={key} value={value.id} > {value.brand} </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-md-12">
                                <select className="form-control form-control-line" name="status" id="status" onChange={handleInput} >
                                    <option value>Please choose status</option>
                                    <option value={1} >New</option>
                                    <option value={0} >Sale</option>
                                </select>
                            </div>
                        </div>
                        {getInputs.status == 0 ? (
                            <div className="form-group">
                                <div className="col-md-12" id="sale" >
                                    <input type="text" name="sale" style={{ width: '250px', display: 'inline-block' }} onChange={handleInput} />
                                    <span>%</span>
                                </div>
                            </div>
                        ) : null}
                        <div className="form-group">
                            <div className="col-md-12">
                                <input type="text" placeholder="Company profile" name="company" onChange={handleInput} />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-md-12">
                                <input type="file" name="file[]" multiple onChange={handleFile} />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-md-12">
                                <textarea rows={5} className="form-control form-control-line" placeholder="Detail" name="detail" onChange={handleInput} />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-default">Create!</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default AddProduct;