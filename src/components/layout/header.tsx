"use client";

import { HeaderMobile } from "./mobile-component/header";
import HeaderPC from "./pc-component/header";


export default function Header () {
    return (
        <>
            <HeaderPC />
            <HeaderMobile />
        </>
    )
}

