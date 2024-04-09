import { TextField } from "@mui/material";
import { FormikProps } from "formik";
import clsx from 'clsx'

export interface TextFieldInputProps {
    name: string;
    formik: FormikProps<any>;
    label: string;
    placeholder: string;
    className?: string
    type?: string
}

const CustomInput = (props: TextFieldInputProps) => {

    const { name, formik, label, placeholder, className, type='text' } = props

    return (
        <div className="flex flex-col w-full">
            <TextField 
                fullWidth
                id={name}
                name={name}
                label={label}
                variant={'outlined'}
                placeholder={placeholder}
                defaultValue={formik.values[name]}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched[name] && Boolean(formik.errors[name])}
                className={clsx(className)}
                type={type}
            />
           
                {formik.errors[name] && (
                    <span className="text-sm text-red-700 font-sans">
                        {formik.errors[name] as string}
                    </span>
                )}
            
        </div>
    )
}

export default CustomInput