'use client'

import CustomButton from "@/components/input/custom-button";
import DateField from "@/components/input/date-field";
import CustomInput from "@/components/input/text-field";
import { Grid } from "@mui/material";


import { useFormik } from "formik";
import * as yup from 'yup';

export default function Signup() {

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
           console.log(values)
        },
    })
    return (
  
        <section className="xs:w-full md:container m-auto">
            <Grid className="p-4 m-auto" container spacing={2}>
                <Grid item xs={0} sm={2} md={3} lg={4}></Grid>
                <Grid item  xs={12} sm={8} md={6} lg={4}>
                    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
                        <CustomInput name={"email"} formik={formik} label={"Email"} placeholder={""}  />
                        <CustomInput name={"password"} formik={formik} label={"Password"} placeholder={""}  />
                        <DateField name={"dob"} formik={formik} label={"Birth date"} />
                        <CustomButton type="submit" title="Submit" className="bg-slate-500 rounded-sm"/>
                    </form>
                </Grid >
                <Grid item xs={0} sm={2} md={3} lg={4}></Grid>
            </Grid>
        </section>
 
    )
}