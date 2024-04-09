'use client'

import { post } from "@/api/api-service";
import GoogleAutoCompleteAddress from "@/components/input/GoogleAutocompleteAddress";
import CustomButton from "@/components/input/custom-button";
import CustomRadioButton from "@/components/input/custom-radio-button";
import DateField from "@/components/input/date-field";
import CustomInput from "@/components/input/text-field";
import { Grid } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';


import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as yup from 'yup';

export default function Signup() {
    const router = useRouter()
    const [address, setAddress] = useState<any>(null);

    const [snackBarState,setSnackBarSate] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
        snackMessage: ''
    })
    const { vertical, horizontal, open, snackMessage } = snackBarState;
    const handleClose = () => {
        setSnackBarSate({ ...snackBarState, open: false });
    };
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
            gender: '',
            firstName: '',
            lastName: '',
            dob: null
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
           const body = {
                ...values,
                address
           }
           post('public-user/user-signup', body).then(res => {
                setSnackBarSate(prev => {
                    return {
                        ...prev,
                        snackMessage: 'Sign up success',
                        open: true,
                    }
                })
                router.replace('/')
           })
        },
    })
    return (
  
        <section className="xs:w-full md:container m-auto">
            <Grid className="p-4 m-auto" container spacing={2}>
                <Grid item xs={0} sm={2} md={3} lg={4}></Grid>
                <Grid item  xs={12} sm={8} md={6} lg={4}>
                    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
                        <CustomInput name={"firstName"} formik={formik} label={"First Name"} placeholder={""}  />
                        <CustomInput name={"lastName"} formik={formik} label={"Last Name"} placeholder={""}  />
                        <CustomRadioButton dataRadio={[{value: 'male', label: 'Male'}, {value: 'female', label: 'Female'}]} formik={formik} label={"Gender"} name={"gender"} />
                        <CustomInput name={"email"} formik={formik} label={"Email"} placeholder={""}  />
                        <CustomInput name={"password"} formik={formik} label={"Password"} placeholder={""} type={'password'} />
                        <DateField name={"dob"} formik={formik} label={"Birth date"} />
                        <GoogleAutoCompleteAddress address={address} setAddress={setAddress}></GoogleAutoCompleteAddress>
                        <CustomButton type="submit" title="Submit" className="bg-slate-500 rounded-sm"/>
                    </form>
                </Grid >
                <Grid item xs={0} sm={2} md={3} lg={4}></Grid>
            </Grid>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={snackMessage}
                key={vertical + horizontal}
            />
        </section>
 
    )
}