import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { baseUrl } from '../utils/baseUrl.jsx';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Login({saveUserData}) {
    const notify = (msg, type) => toast[type](msg);
    const [loading, setLoading] = useState(false)

    let navigate = useNavigate()

    let registerFormik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },

        validationSchema: Yup.object({
            email: Yup.string().email().required(),
            password: Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/, 'password not match validation').required(),
        }),

        onSubmit: (values) => {
            setLoading(true)
            axios.post(`${baseUrl}/auth/signin`, values).then((obj) => {
                localStorage.setItem('token', obj.data.token)
                if (obj.data.message === 'success') {
                    notify('success', 'success')
                    saveUserData()
                    navigate('/')
                    setLoading(false)

                }
            })
                .catch((error) => {
                    if (error) {
                        notify(error.response.data.message, 'error')
                        setLoading(false)

                    }
                })
        }
    })




    return <>
        <div className="w-50 mx-auto my-5 ">

            <h3 className="my-4">Login form</h3>


            <form className='my-5' onSubmit={registerFormik.handleSubmit}>



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

                <button disabled={!(registerFormik.isValid && registerFormik.dirty && !loading)} type='submit' className='btn bg-main text-white'>
                    {loading ? <i className='fas fa-spinner fa-spin'></i> : 'Login'}
                </button>


            </form>
        </div>
    </>
}
