import style from '@/style/annimation-image.module.scss'
import clsx from 'clsx'

export default function AnnimationImage (props: {
    imageUrl: string
}) {
    return (
        <div className={clsx(style['test-div'])}>
            <img src={props.imageUrl} alt="image_annimation" className='w-full h-full object-cover'/>
            <div className={clsx(style['child-div'])}>

            </div>
            <div className={clsx(style['child-div-2'])}>

            </div>
        </div>
    )
}