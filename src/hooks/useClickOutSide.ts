'use client'
import useEventListener from "./useEventListener"


export default function useClickOutside(ref: any, cb: Function) {
    if (window && typeof window !== undefined) {
        useEventListener("click",( e: Event) => {
            if (ref.current == null || ref.current.contains(e.target)) return
            cb(e)
        }, window)
    }
}