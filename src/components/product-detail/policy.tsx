import { useState } from "react";
import style from '@/style/product-detail.module.scss'
import clsx from 'clsx'


export default function ProductDetailPolicy({
    size = [],
    color = [],
    description = ''
}: {
    size: string[],
    color: string[],
    description?: string,
}) {
    const [activeTab, setActiveTab] = useState<number>(1)
    return (
        <section>
            <div className={clsx(style['border-under'], style['hr'],"w-full flex flex-wrap gap-5 text-sm")}>
                <div className={
                    clsx("p-3 cursor-pointer", activeTab === 1 && style['border-under'])} 
                    
                    onClick={() => setActiveTab(1)}
                >
                    <span className="inline">
                        MÔ TẢ
                    </span>
                </div>
                <div 
                    className={clsx("p-3 cursor-pointer",  activeTab === 2 && style['border-under'])}  
                    onClick={() => setActiveTab(2)}
                >
                    <span className="inline">
                        ĐIỀU KHOẢN DỊCH VỤ
                    </span>
                    
                </div>
                <div 
                    className={clsx("p-3 cursor-pointer",  activeTab === 3 && style['border-under'])}  
                    onClick={() => setActiveTab(3)}
                >
                    <span className="inline">
                        CHÍNH SÁCH ĐỔI TRẢ
                    </span>
                </div>
            </div>
            <div>
                {
                    activeTab === 1 && (
                        <div className="p-3 text-gray-500 text-md">
                            <p className="text-md font-bold">
                                <span>Kích thước</span>
                            </p>
                            <div className="flex flex-col gap-3">
                                {
                                    !!size.length && size.map((item, index) => {
                                        return(
                                            <span key={index}>Size {item}</span>
                                        )
                                    })
                                }
                            </div>
                            <p className="text-md font-bold">
                               Màu sắc
                            </p>
                            <div className="flex flex-col gap-3">
                                {
                                    !!color.length && color.map((item, index) => {
                                        return(
                                            <div key={index} className="w-4 h-4" style={{background: `${item}`}}></div>
                                        )
                                    })
                                }
                            </div>
                            <p className="text-md text-gray-500" dangerouslySetInnerHTML={{__html: description}}>

                            </p>    
                        </div>
                    )
                }
                {
                    activeTab === 2 && (
                        <div className="p-3 text-gray-500">
                            <p  className="mt-3"><span className="text-md"><strong>1. Giới thiệu</strong></span></p>
                            <p><span className="text-md">Chào mừng quý khách hàng đến với website chúng tôi.</span></p>
                            <p><span className="text-md">Khi quý khách hàng truy cập vào trang website của chúng tôi có nghĩa là quý khách đồng ý với các điều khoản này. Trang web có quyền thay đổi, chỉnh sửa, thêm hoặc lược bỏ bất kỳ phần nào trong Điều khoản mua bán hàng hóa này, vào bất cứ lúc nào. Các thay đổi có hiệu lực ngay khi được đăng trên trang web mà không cần thông báo trước. Và khi quý khách tiếp tục sử dụng trang web, sau khi các thay đổi về Điều khoản này được đăng tải, có nghĩa là quý khách chấp nhận với những thay đổi đó.</span></p>
                            <p><span className="text-md">Quý khách hàng vui lòng kiểm tra thường xuyên để cập nhật những thay đổi của chúng tôi.</span></p>
                            <p className="mt-3"><span className="text-md"><strong>2. Hướng dẫn sử dụng website</strong></span></p>
                            <p><span className="text-md">Khi vào web của chúng tôi, khách hàng phải đảm bảo đủ 18 tuổi, hoặc truy cập dưới sự giám sát của cha mẹ hay người giám hộ hợp pháp. Khách hàng đảm bảo có đầy đủ hành vi dân sự để thực hiện các giao dịch mua bán hàng hóa theo quy định hiện hành của pháp luật Việt Nam.</span></p>
                            <p><span className="text-md">Trong suốt quá trình đăng ký, quý khách đồng ý nhận email quảng cáo từ website. Nếu không muốn tiếp tục nhận mail, quý khách có thể từ chối bằng cách nhấp vào đường link ở dưới cùng trong mọi email quảng cáo.</span><span className="text-md"><strong></strong></span><span className="text-md"></span><span className="text-md"><strong></strong></span><span className="text-md"></span><span className="text-md"><strong></strong></span><span className="text-md"></span></p>
                            <p><span className="text-md"></span><span className="text-md"></span><br /></p>
                            <p className="mt-3"><span className="text-md"><strong>3. Thanh toán an toàn và tiện lợi</strong></span></p>
                            <p><span className="text-md">Người mua có thể tham khảo các phương thức thanh toán sau đây và lựa chọn áp dụng phương thức phù hợp:</span></p>
                            <p>
                                <span className="text-md"><strong><u>Cách 1</u></strong>: Thanh toán trực tiếp (người mua nhận hàng tại địa chỉ người bán)<br /></span>
                                <span className="text-md"><strong><u>Cách 2</u></strong>: Thanh toán sau (COD – giao hàng và thu tiền tận nơi)<br /></span>
                                <span className="text-md"><strong><u>Cách 3</u></strong>: Thanh toán online qua thẻ tín dụng, chuyển khoản</span>
                            </p>
                        </div>
                    )
                }
                {
                    activeTab === 3 && (
                        <div className="p-3 text-gray-500 text-md" id="proTabs3">
                            <p><strong>1. Điều kiện đổi trả</strong></p>
                            <p>Quý Khách hàng cần kiểm tra tình trạng hàng hóa và có thể đổi hàng/ trả lại hàng ngay tại thời điểm giao/nhận hàng trong những trường hợp sau:</p>
                            <ul>
                                <li>Hàng không đúng chủng loại, mẫu mã trong đơn hàng đã đặt hoặc như trên website tại thời điểm đặt hàng.</li>
                                <li>Không đủ số lượng, không đủ bộ như trong đơn hàng.</li>
                                <li>Tình trạng bên ngoài bị ảnh hưởng như rách bao bì, bong tróc, bể vỡ…</li>
                            </ul>
                            <p>Khách hàng có trách nhiệm trình giấy tờ liên quan chứng minh sự thiếu sót trên để hoàn thành việc hoàn trả/đổi trả hàng hóa.</p>
                            <p><br/></p>
                            <p><strong>2. Quy định về thời gian thông báo và gửi sản phẩm đổi trả</strong></p>
                            <ul>
                                <li><strong>Thời gian thông báo đổi trả</strong>: trong vòng 48h kể từ khi nhận sản phẩm đối với trường hợp sản phẩm thiếu phụ kiện, quà tặng hoặc bể vỡ.</li>
                                <li><strong>Thời gian gửi chuyển trả sản phẩm</strong>: trong vòng 14 ngày kể từ khi nhận sản phẩm.</li>
                                <li><strong>Địa điểm đổi trả sản phẩm</strong>: Khách hàng có thể mang hàng trực tiếp đến văn phòng/ cửa hàng của chúng tôi hoặc chuyển qua đường bưu điện.</li>
                            </ul>
                            <p>Trong trường hợp Quý Khách hàng có ý kiến đóng góp/khiếu nại liên quan đến chất lượng sản phẩm, Quý Khách hàng vui lòng liên hệ đường dây chăm sóc khách hàng của chúng tôi.</p>
                        </div>
                    )
                }
            </div>
        </section>
    )
}