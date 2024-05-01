
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import clsx from 'clsx'
import style from '@/style/common.module.scss'

export default function CartPopup() {
    const cart = useSelector((state: RootState) => state.cart.cart)

    return (
        <div className="p-4 flex flex-col w-full h-full">
            <div className="p-3">
                <span className="text-base font-semibold font-sans text-[#677279]">GIỎ HÀNG</span>
            </div>
            <hr />
            <div className="flex flex-col">
                {
                    !cart?.items?.length  ? (
                        <div className="flex flex-col w-full justify-center items-center gap-4 sx:py-8 xl:py-6">
                            <svg width="60" height="52" viewBox="0 0 81 70">
								<g transform="translate(0 2)" stroke-width="4" stroke="#333333" fill="none" fill-rule="evenodd">
									<circle stroke-linecap="square" cx="34" cy="60" r="6"></circle>
									<circle stroke-linecap="square" cx="67" cy="60" r="6"></circle>
									<path d="M22.9360352 15h54.8070373l-4.3391876 30H30.3387146L19.6676025 0H.99560547"></path>
								</g>
							</svg>
                            <span className="text-sm text-gray-400 font-light">Hiện chưa có sản phẩm</span>
                        </div>
                    ) : (
                        <div className="flex flex-col py-4">
                            {
                                cart.items.map((item: any, index: number) => {
                                    return (
                                        <div className="flex justify-between" key={index}>
                                            <div className="flex justify-start gap-3">
                                                <span className="text-sm text-gray-400 font-light">
                                                    {item.productName}
                                                </span>
                                                <span className="flex justify-between">
                                                    {item.price.toLocaleString()}đ
                                                </span>
                                            </div>
                                            <span>
                                                {item.quantity}
                                            </span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                }
            </div>
            <hr />
            <div className="flex justify-between mt-4">
                <span className="text-[#677279] text-sm font-light">TỔNG TIỀN</span>
                <span className="text-sm font-semibold text-red-600">0đ</span>
            </div>
            <div className="flex gap-4 justify-between py-4">
                <button className={clsx("w-1/2 h-[45px] text-sm text-white font-light", style['background-button-black'])} type="submit">Xem giỏ hàng</button>
                <button className={clsx("w-1/2 h-[45px] text-sm text-white font-light", style['background-button'])} type="submit">Đặt hàng</button>
            </div>
        </div>
    )
}