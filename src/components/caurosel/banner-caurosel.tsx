'use client'
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import style from '../../style/banner-caurosel.module.scss'
import useTrait from "@/hooks/useTrait";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';


export type BannerCauroselType =  {
    image: string;
    url?: string;
    handler?: () => void;
}
export type BannerCauroselProps = {
    datas: BannerCauroselType[];
    propId: string
}

export default function BannerCaurosel({datas, propId}: BannerCauroselProps) {

    const [activeImage, setActiveImage] = useState<number>(0)
    let startX = useTrait(0)
    let draxX = useTrait(0)

    function handleMouseDown(event: any) {
        startX.set(event.pageX)
        draxX.set(event.pageX)
    }

    function handleMoved (event: any) {
        draxX.set(event.pageX)
    }

    useEffect(() => {
        const diffX = draxX.get() - startX.get()
        const el = window.document.getElementById(`${propId}-${activeImage}`)
        if (el) {
            el.style.transform = `translateX(${diffX}px)`
        }
    }, [draxX, startX])

    function handleDrop(event: any)  {

        draxX.set(event.pageX)

        if(startX.get() - draxX.get() > 0) {
            setActiveImage(pre => {
                if (pre === (datas.length - 1)) {
                    return 0;
                } else {
                    return pre + 1
                }

            })
        } else if(startX.get() - draxX.get() < 0) {
            setActiveImage(pre => {
                if (pre === 0) {
                    return datas.length - 1;
                } else {
                    return pre - 1
                }

            })
        }
        startX.set(event.pageX)
        draxX.set(event.pageX)
    }
    function hanldeIncrementActiveImage() {
        setActiveImage(prev => {
            if (prev === (datas.length - 1)) {
                return 0
            } else {
                return prev + 1
            }
        })
    }
    function hanldedowncrementActiveImage() {
        setActiveImage(prev => {
            if (prev === 0) {
                return datas.length - 1
            } else {
                return prev - 1
            }
        })
    }

    return (
        <div className="w-full h-auto overflow-hidden flex flex-row relative">
            {
                datas.map((item, index) => {
                   return item.url ? (
                        <div></div>
                   ) : (
                        <div 
                            className={`w-full h-full ${activeImage === index ? style['active'] : style['disable']}`}
                            key={index} 
                            onDrag={(event) => handleMoved(event)}
                            onMouseDown={(event) => handleMouseDown(event)}
                            onDragEnd={(event) => handleDrop(event)}
                            id={`${propId}-${index}`}
                        >
                            <img src={item.image} alt={item.url}  className={ `object-cover w-full h-full ${style['display-image']}`}/>
                        </div>
                    )
                })
            }
            <div className="w-12 h-10 absolute top-2/4 left-2 bg-white opacity-50 hover:opacity-100 flex justify-center items-center cursor-pointer" onClick={hanldedowncrementActiveImage}>
                <KeyboardArrowLeftIcon  />
            </div>
            <div className="w-12 h-10 absolute top-2/4 right-2 bg-white opacity-50 hover:opacity-100 flex justify-center items-center cursor-pointer" onClick={hanldeIncrementActiveImage}>
                <KeyboardArrowRightIcon />
            </div>
            <div className="w-12 flex justify-between items-center absolute bottom-2 left-1/2 right-1/2">
                {
                    datas.map((item, index) => {
                        return (
                            <div key={index} className={activeImage === index ? `${style['activate-image']} cursor-pointer` : `${style['not-activate-image']} cursor-pointer`} onClick={() => setActiveImage(index)}>

                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}