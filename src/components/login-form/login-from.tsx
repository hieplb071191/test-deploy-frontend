import { Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from 'yup'
import CustomInput from "../input/text-field";
import CustomButton from "../input/custom-button";
import { useDispatch } from "react-redux";
import { loginThunk } from "@/redux/thunks/login.thunk";
import { ThunkDispatch } from "redux-thunk";

export default function LoginForm() {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
    const validationSchema = yup.object({
        email: yup
          .string()
          .email('Enter a valid email')
          .required('Email is required'),
        password: yup
          .string()
          .min(8, 'Password should be of minimum 8 characters length')
          .required('Password is required'),
      });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(loginThunk(values))
        }
    })

    return (<>
        <form onSubmit={formik.handleSubmit} className="w-full flex flex-col gap-3 justify-center items-center">
            <Typography variant="h6" component={'h6'} className="text-lg">
                ĐĂNG NHẬP TÀI KHOẢN
            </Typography>
            <Typography variant="h6" component={'h6'} className="text-sm">
                Nhập email và mật khẩu của bạn:
            </Typography>
            <div>
                <span className="text-xs">This site is protected by reCAPTCHA and the Google</span>
                <span className="text-xs">Privacy Policy and Terms of Service apply.</span>
            </div>
            <CustomInput name={"email"} formik={formik} label={"Email"} placeholder={"Email"} />
            <CustomInput name={"password"} formik={formik} label={"password"} placeholder={"password"} type={'passowrd'} />
            <CustomButton title={"Đăng nhập"} type={"submit"} className="w-full bg-gray-400"/>
            <span className="text-xs">Khách hàng mới? <a href="/signup"> Tạo tài khoản</a></span>
            <span className="text-xs">Quên mật khẩu? <a href="#">Khôi phục mật khẩu</a> </span>
        </form>
    </>)
}