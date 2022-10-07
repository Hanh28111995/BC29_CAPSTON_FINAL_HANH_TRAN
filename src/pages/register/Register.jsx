import { notification } from 'antd';
import React, { useState } from 'react';
import { createRef } from 'react';
import { useNavigate } from "react-router-dom";
import { registerApi } from 'services/user';
import './index.scss';


const DEFAULT_VALUES = {
    email: "",
    passWord: "",
    name: "",
    phoneNumber: "",
}
// const DEFAULT_ERRORS = {
//     email: "",
//     passWord: "",
//     name: "",
//     phoneNumber: "",
// }
export default function Register() {
    const navigate = useNavigate();
    // const [valid, setValid] = useState({ isValid: true })
    const [state, setState] = useState({
        values: DEFAULT_VALUES,
        // errors: DEFAULT_ERRORS,
    });

    const handleChange = (event) => {
        const { name, title, minLength, maxLength, pattern, value, validity: { valueMissing, patternMismatch, tooLong, tooShort }, } = event.target;
        // let message = '';

        // if (pattern) {
        //     const regex = new RegExp(pattern);
        //     if (!regex.test(value)) {
        //         console.log(name);
        //         if (name === 'taiKhoan') {
        //             message = `${title} không chứa kí tự đặc biệt.`;
        //         }
        //         if (name === 'hoTen') {
        //             message = `${title} không chứa number và kí tự đặc biệt.`;
        //         }
        //         if (name === 'email') {
        //             message = `${title} không hợp lệ.`;
        //         } 
        //         if (name === 'soDT') {
        //             message = `${title} gồm các số từ 0-9.`;
        //         } 
        //     }
        // }

        // // if (patternMismatch) {
        // //     message = `Vui lòng nhập ${title} `;
        // // }

        // if (tooShort || tooLong) {
        //     message = `${title} từ ${minLength} - ${maxLength} kí tự .`;
        // }

        // if (valueMissing) {
        //     message = `Vui lòng nhập ${title} `;
        // }
        setState({
            values: {
                ...state.values,
                [name]: value,
            },
            // errors: {
            //     ...state.errors,
            //     [name]: message,
            // }
        });
        // if (formRef.current?.checkValidity()) {
        //     setValid({
        //         isValid: false
        //     })
        // }
    };



    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(state.values)
        // if (event.target.checkValidity()) {
        //     setValid({
        //         isValid: true
        //     })
        // }
        // else{
        //     setValid({
        //         isValid: false
        //     })
        // }
        // console.log(valid.isValid)
        // if (valid.isValid) {
        //     notification.error({
        //         description: ` Vui lòng nhập đầy đủ thông tin`,
        //     })
        // }
        // else {
        try {
            const result = await registerApi(state.values);
            console.log(result.data)

            notification.success({
                description: ` Register success`,
            })
            navigate("/");
        }
        catch (err) {
            notification.warning({
                description: `Register fail`,
            });
        }
        // }
    }

    const formRef = createRef();
    const { email, passWord, name, phoneNumber } = state.values;
    return (
        <>
            <header>
                <nav className="navbar navbar-expand-sm bg-light navbar-light">
                    {/* Brand/logo */}
                    <a className="navbar-brand" href="#">
                        <img src="https://wac-cdn.atlassian.com/dam/jcr:e348b562-4152-4cdc-8a55-3d297e509cc8/Jira%20Software-blue.svg?cdnVersion=535" alt="logo" style={{ height: '28px' }} />
                    </a>
                    {/* Links */}
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <button className="btn btn-signup" >
                                <a className="nav-link" href="/">Sign In</a>
                            </button>
                        </li>
                    </ul>
                </nav>
            </header>
            <section>
                <div className='row container-fluid'>
                    <div className='form-content'>
                        <form ref={formRef} noValidate className='w-75 mx-auto my-5'
                            onSubmit={handleSubmit}
                        >
                            <div className='form-group'>
                                <h2 className='text-center mb-2'>Register</h2>
                                <label>Email</label>
                                <input
                                    title='email'
                                    value={email}
                                    required
                                    name='email'
                                    onChange={handleChange}
                                    type='text'
                                    className='form-control'
                                />
                                {/* {state.errors.taiKhoan && (
                    <span className='text-danger'>{state.errors.taiKhoan}</span>
                )} */}
                            </div>
                            <div className='form-group'>
                                <label>Mật khẩu</label>
                                <input
                                    title='Mật khẩu'
                                    value={passWord}
                                    required
                                    name='passWord'
                                    onChange={handleChange}
                                    type='text'
                                    className='form-control'
                                // pattern='/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/'
                                // minLength={6}
                                // maxLength={12}
                                />
                                {/* {state.errors.matKhau && (
                    <span className='text-danger'>{state.errors.matKhau}</span>
                )} */}
                            </div>
                            <div className='form-group'>
                                <label>Họ tên</label>
                                <input
                                    title='Họ tên'
                                    value={name}
                                    required
                                    name='name'
                                    onChange={handleChange}
                                    type='text'
                                    className='form-control'
                                // pattern= "^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$"
                                />
                                {/* {state.errors.hoTen && (
                    <span className='text-danger'>{state.errors.hoTen}</span>
                )} */}
                            </div>
                            <div className='form-group'>
                                <label>Số điện thoại</label>
                                <input
                                    title='Số ĐT'
                                    value={phoneNumber}
                                    required
                                    name='phoneNumber'
                                    onChange={handleChange}
                                    type='text'
                                    className='form-control'
                                // pattern="^[0-9]+$"
                                // minLength={8}
                                // maxLength={10}
                                />
                                {/* {state.errors.soDT && (
                    <span className='text-danger'>{state.errors.soDT}</span>
                )} */}
                            </div>

                            <button className='btn btn-success w-100 my-3'>REGISTER</button>

                        </form>
                    </div>
                </div>
            </section>

        </>
    )
}