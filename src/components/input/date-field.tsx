
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { FormikProps } from 'formik';
import dayjs from 'dayjs';
import clsx from 'clsx'

export type DateFieldProps = {
    name: string;
    formik: FormikProps<any>
    label: string
    className?: string
}

const DateField = (props: DateFieldProps) => {
    const {name, formik, label,className} = props
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                        name={name}
                        defaultValue={dayjs(formik.values[name])}
                        onChange={(value) => formik.setFieldValue(name, value)}
                        label={label}
                        onError={() => formik.errors[name]}
                        className={clsx( className)}
                    />
            </LocalizationProvider>
            
        </>
    )
}

export default DateField