import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { baseUrl } from '../utils/baseUrl.jsx';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Register() {
    const notify = (msg, type) => toast[type](msg);
    const [loading, setLoading] = useState(false)

    let navigate = useNavigate()

    let registerFormik = useFormik({
        initialValues: {
            name: '',
            age: '',
            email: '',
            password: '',
            rePassword: '',


        },
        validationSchema: Yup.object({
            name: Yup.string().min(3,).max(15,).required(),
            age: Yup.number().required(),
            email: Yup.string().email().required(),
            password: Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/, 'password not match validation').required(),
            rePassword: Yup.string().oneOf([Yup.ref('password')], "not match").required(),
        }),
        onSubmit: (values) => {
            setLoading(true)
            axios.post(`${baseUrl}/auth/signup`, values).then((obj) => {
                if (obj.data.message == 'success') {
                    notify('success', 'success')
                    navigate('/login')
                    setLoading(false)
                }
            })
                .catch((error) => {
                    if (error) {
                        notify(error.response.data.errors.msg, 'error')
                        setLoading(false)

                    }
                })
        }
    })




    return <>
        <div className="w-50 mx-auto my-5 ">

            <h3 className="my-4">Registration form</h3>


            <form className='my-5' onSubmit={registerFormik.handleSubmit}>

                <label htmlFor="name ">your Name : </label>
                <input onBlur={registerFormik.handleBlur} value={registerFormik.values.name} onChange={registerFormik.handleChange} type="text" className='form-control   my-3 ' name='name' id='name' />

                {registerFormik.errors.name && registerFormik.touched.name ? <div className="alert alert-danger">
                    {registerFormik.errors
                        .name}
                </div> : ''}

                <label htmlFor="age ">age : </label>
                <input onBlur={registerFormik.handleBlur} value={registerFormik.values.age} onChange={registerFormik.handleChange} type="number " className='form-control   my-3 ' name='age' id='age' />

                {registerFormik.errors.age && registerFormik.touched.age ? <div className="alert alert-danger">
                    {registerFormik.errors
                        .age}
                </div> : ''}

                <label htmlFor="email ">email : </label>
                <input onBlur={registerFormik.handleBlur} value={registerFormik.values.email} onChange={registerFormik.handleChange} type="email" className='form-control   my-3 ' name='email' id='email' />

                {registerFormik.errors.email && registerFormik.touched.email ? <div className="alert alert-danger">
                    {registerFormik.errors
                        .email}
                </div> : ''}

                <label htmlFor="password ">password : </label>
                <input onBlur={registerFormik.handleBlur} value={registerFormik.values.password} onChange={registerFormik.handleChange} type="password" className='form-control   my-3 ' name='password' id='password' />

                {registerFormik.errors.password && registerFormik.touched.password ? <div className="alert alert-danger">
                    {registerFormik.errors
                        .password}
                </div> : ''}



                <label htmlFor="repassword ">rePassword : </label>
                <input onBlur={registerFormik.handleBlur} value={registerFormik.values.rePassword} onChange={registerFormik.handleChange} type="password" className='form-control   my-3 ' name='rePassword' id='name' />

                {registerFormik.errors.rePassword && registerFormik.touched.rePassword ? <div className="alert alert-danger">
                    {registerFormik.errors
                        .rePassword}
                </div> : ''}

                <button disabled={!(registerFormik.isValid && registerFormik.dirty && !loading)} type='submit' className='btn bg-main text-white'>
                    {loading ? <i className='fas fa-spinner fa-spin'></i> : 'Register'}
                </button>


            </form>
        </div>
    </>
}
