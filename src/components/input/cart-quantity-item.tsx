import { TextField } from "@mui/material";
import { FormikProps } from "formik";
import { useEffect, useRef, useState } from "react";

export type CartQuantityItemProps = {
    name: string;
    formik: FormikProps<any>;
    label: string;
    placeholder: string;
    className?: string
    type?: string
    maxProduct: number
}

const CartQuantityItem = ({
    name,
    formik,
    maxProduct = 0
}: CartQuantityItemProps) => {
    const [value, setValue] = useState<number>(0)
    useEffect(() => {
        if (formik.values[name]) {
            setValue(formik.values[name] as number)
        }
    }, [])
    const inputRef = useRef<any>()
    useEffect(() => {
        inputRef.current.value = value
        formik.setFieldValue(name, value)
    }, [value])

    const handleChangeValue = (type: string) => {
        if (type === 'increament') {
            setValue(prev => {
                if (prev < maxProduct) {
                    return prev + 1
                }
                else {
                    return prev
                }
            })
        } else {
            setValue(prev => {
                if (prev > 0) {
                    return prev -1
                } else {
                    return prev
                }
            })
        }
    }
    return (
        <div className="flex flex-row justify-between items-center border-solid border-gray-300 border-2 p-3 sx:w-1/2 xl:w-1/3 rounded-sm">
            <span className="text-xl font-bold cursor-pointer" onClick={() => handleChangeValue('increament')}> + </span>
            <input 
                name={name}
                defaultValue={value}
                onChange={(value) => {
                    formik.setFieldValue(name, value.target.value)
                    setValue(Number(value.target.value))
                }}
                className="border-none w-full text-center outline-none text-xl font-bold font-sans"
                pattern="[0-9]{5}"
                ref={inputRef}
                type="number"
                min={0}
                max={maxProduct}
                disabled={!maxProduct}
            />
            <span className="text-2xl font-bold cursor-pointer" onClick={() => handleChangeValue('decreament')}> - </span>
        </div>
    )
}

export default CartQuantityItem