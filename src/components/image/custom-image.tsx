import style from '../../style/custom-image.module.scss'


export type ImageProp = {
    imageUrl: string
}

export default function CustomImage ({
    imageUrl
}: ImageProp) {
    return (
        <div className='relative'>
            <img 
                src={imageUrl} 
                alt={imageUrl} 
                className='w-full h-full object-cover'
            />
            <div className={`absolute w-full h-full top-0 left-0 bg-transparent ${style['border-image-hover']}`}>

            </div>
        </div>
        
    )
}