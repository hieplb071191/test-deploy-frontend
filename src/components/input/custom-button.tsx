
import clsx, { ClassValue } from 'clsx'
export interface CustomButtonProps {
    title: string;
    type: 'submit' | 'button' | 'reset';
    onHandler?: (props: any | undefined) => any
    className?: string;
}
export default function CustomButton ({
    title,
    type,
    onHandler,
    className
}: CustomButtonProps) {
    return (
        <>
            <button className={clsx("border-none h-9 rounded w-28 bg-green-700 text-white", className)} type={type} onClick={onHandler}>
                {title}
            </button>
        </>
    )
}