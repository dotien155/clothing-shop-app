import { useEffect, useState } from "react";
import FormErrs from "../Error/FormErrs";
import { useParams } from "react-router-dom";
import API from "../../api";

function EditProduct() {

    const params = useParams();
    const [getInputs, setInputs] = useState({
        name: "",
        price: "",
        detail: "",
        company_profile: "",
        sale: "",
        id_category: "",
        id_brand: "",
        status: "",
        image: []
    });
    const [errs, setErrs] = useState({});
    const [getFiles, setFiles] = useState([]);
    const [brand, setBrand] = useState([]);
    const [category, setCategory] = useState([]);
    const [imgDelete, setImgDelete] = useState([]);

    const handleCheckbox = (img) => {
        // console.log(img);
        setImgDelete((oldArray) => {
            let newArr;
            if (oldArray.includes(img)) {
                return oldArray.filter((imgName) => imgName !== img); // neu co roi thi loc ra => lay nhung ten con lai vao mang 
            } else {
                return [...oldArray, img]; // chua co thi add vao cuoi
            }
        })
    }

    const handleInput = (e) => {
        const nameInput = e.target.name;
        const value = e.target.value;
        setInputs(state => ({ ...state, [nameInput]: value }));
    }

    const accessToken = localStorage.getItem('token');
    const accData = JSON.parse(localStorage.getItem('account'));
    const id_user = accData.id;
    //console.log("accData_id", accData.id);
    let config = {
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    };


    function handleFile(e) {

        const images = Array.from(e.target.files); //Array.form() de chuyen filelist thanh mang
        //console.log(images);

        if (images.length > 3) {
            setErrs(prev => ({ ...prev, files: `Chỉ được upload tối đa 3 hình.` }));
            return;
        }

        setFiles(images);
    }

    const arrDuoiFiles = ["png", "jpg", "jpeg"];

    function handleSubmit(e) {
        e.preventDefault();

        //console.log("Log",getInputs)
        let errsSubmit = {};
        let flag = true;

        //check image
        if (getFiles) {
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

        //check Login
        if (!accessToken) {
            alert("Vui lòng Login");
        }

        if (!flag) {
            setErrs(errsSubmit);
        } else {

            const accessToken = localStorage.getItem('token');
            let url = '/user/product/update/' + params.id;

            //config để gửi token qua api
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    //'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json'
                }
            };


            const formData = new FormData();
            formData.append('name', getInputs.name);
            formData.append('price', getInputs.price);
            formData.append('category', getInputs.id_category);
            formData.append('brand', getInputs.id_brand);
            formData.append('status', getInputs.status);
            formData.append('sale', getInputs.sale);
            formData.append('company', getInputs.company_profile);
            formData.append('detail', getInputs.detail);

            //img them
            Object.keys(getFiles).map((item, i) => {
                formData.append('file[]', getFiles[item]);
            });

            //img them
            Object.keys(imgDelete).map((item, i) => {
                formData.append('avatarCheckBox[]', imgDelete[item]);
            });

            API.post(url, formData, config)
                .then(res => {
                    console.log(res);
                   // setInputs(res.data.data);
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }
    useEffect(() => {
        API.get('/category-brand')
            .then(res => {
                //console.log(res);
                setBrand(res.data.brand);
                setCategory(res.data.category);
            })
            .catch(function (error) {
                console.log(error);
            })

        let url = "/user/my-product";
        API.get(url, config)
            .then(res => {
                //console.log(res)
                const product = Object.values(res.data.data).find(item => item.id == params.id);
                console.log("Product", product);
                if (product) {
                    setInputs({ ...product, image: JSON.parse(product.image) });
                    //console.log("img", product.image);
                }

            })
            .catch(function (error) {
                console.log(error)
            })
    }, [])

    //lay data ra theo id ( params.id) va hien thi ra form


    return (
        <div className="col-sm-9">
            <div className="blog-post-area">
                <h3 className="title text-center">Edit Product!</h3>
                <FormErrs errs={errs} />
                <div className="signup-form">
                    <form encType="multipart/form-data" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <div className="col-md-12">
                                <input type="text" name="name" value={getInputs.name} onChange={handleInput} />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-md-12">
                                <input type="text" name="price" value={getInputs.price} onChange={handleInput} />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-md-12">
                                <select className="form-control form-control-line" name="id_category" onChange={handleInput} value={getInputs.id_category}>
                                    <option >{category.find(c => c.id === getInputs.id_category)?.category || "Please choose category"}</option>
                                    {category.map((value, key) => (
                                        <option key={key} value={value.id} > {value.category} </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-md-12">
                                <select className="form-control form-control-line" name="id_brand" onChange={handleInput} value={getInputs.id_brand}>
                                    <option>{brand.find(b => b.id === getInputs.id_brand)?.brand || "Please choose brand"}</option>
                                    {brand.map((value, key) => (
                                        <option key={key} value={value.id} > {value.brand} </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-md-12">
                                <select className="form-control form-control-line" name="status" id="status" onChange={handleInput} >
                                    <option value={getInputs.status}>{getInputs.status == 1 ? "New" : "Sale"}</option>
                                    <option value={1} >New</option>
                                    <option value={0} >Sale</option>
                                </select>
                            </div>
                        </div>
                        {getInputs.status == 0 ? (
                            <div className="form-group">
                                <div className="col-md-12" id="sale" >
                                    <input type="text" name="sale" value={getInputs.sale} style={{ width: '250px', display: 'inline-block' }} onChange={handleInput} />
                                    <span>%</span>
                                </div>
                            </div>
                        ) : null}
                        <div className="form-group">
                            <div className="col-md-12">
                                <input type="text" name="company_profile" value={getInputs.company_profile} onChange={handleInput} />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-md-12">
                                <input type="file" name="file[]" multiple onChange={handleFile} />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-md-12" style={{ display: "flex", gap: "20px" }}>
                                {getInputs.image.map((img, index) => {
                                    return (
                                        <li key={index} style={{ display: "flex" }}>
                                            <img src={"http://localhost/laravel-api/laravel8/public/upload/product/" +  accData.id+ "/small_" + img} style={{ width: 50, height: 55, marginRight: 10, marginBottom: 10 }} />
                                            <input type="checkbox" name="imgCheckbox[]" value={img} onChange={() => handleCheckbox(img)} />
                                        </li>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-md-12">
                                <textarea rows={5} className="form-control form-control-line" name="detail" value={getInputs.detail} onChange={handleInput} />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-default">Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default EditProduct;