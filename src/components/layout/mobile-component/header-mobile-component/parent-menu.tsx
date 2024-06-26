import CartPopup from "@/components/cart-popup/cart-popup"
import { ShowMenuTarget } from "../header"
import Menu from "./menu"


export function HeaderParentMenu ({targetMenu, handleclose}: {
    targetMenu: ShowMenuTarget | '',
    handleclose: (...params: any | null) => void | any
}) {
    const getPropHeaderChildMenu = () => {
        switch (targetMenu) {
            case ShowMenuTarget.CARD:
                return (<CartPopup onClose={handleclose}/>)
            case ShowMenuTarget.MENU:
                return (<Menu handleClose={handleclose}/>) 
        }
    }

    return (
        <div className="w-full h-svh absolute top-30 shadow-inner bg-white">
            {getPropHeaderChildMenu()}
        </div>
    )
}