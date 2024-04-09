import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material"
import { FormikProps } from "formik"

export type CustomRadioButtonProps = {
    dataRadio: {
        value: string,
        label: string
    }[],
    onhandler?: (params: any | undefined) => any,
    formik: FormikProps<any>
    label: string,
    name: string
}

export default function CustomRadioButton ({dataRadio, onhandler, formik, label,name}: CustomRadioButtonProps) {

    return (
        <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
                {label}
            </FormLabel>
            <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name={name}
                value={formik.values[name] ?? ""}
                onChange={(event) =>{
                    formik.setFieldValue(name, event.target.value)
                } }
                onBlur={() => formik.handleBlur}
                className="flex flex-row"
            >
                {
                    dataRadio.map((item, index) => (
                        <FormControlLabel value={item.value} control={<Radio color="error"/>} label={item.label} key={index} className="w-auto h-auto"/>
                    ))
                }
            </RadioGroup>
        </FormControl>
    )
    
}