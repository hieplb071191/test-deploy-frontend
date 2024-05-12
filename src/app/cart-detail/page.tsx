'use client'

import { get } from "@/api/api-service"
import { setToken } from "@/redux/slices/token.slice"
import { RootState } from "@/redux/store"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function CartPage () {
    
    
    const token = useSelector((state: RootState) => state.token.token)
    const dispatch = useDispatch()
    const [currentCart, setCurrentCart] = useState<any>(null)
    const router = useRouter()
    const cart = useSelector((state: RootState) => state.cart.cart)
    const createData = (
      name: string,
      quantity: number,
      price: number,
    ) => {
      const totalOnePrice = quantity * price
      return {
        name, quantity, price, totalOnePrice
      }
    }

    const rows: any[] = useMemo(() => {
      if (cart?.items?.length) {
        const datas = cart?.items.map((item: any) => {
          return createData(item.productName, item.quantity, item.price)
        })
        return datas
      } else {
        return []
      }
    }, [cart])

    const totalPrice = useMemo(() => {
      if (cart?.items) {
          return cart.items.reduce((acc: number,cur: any) => {
              return acc += (cur.price * cur.quantity)
          }, 0)
      } else {
          return 0
      }
  }, [cart])

    const getCurrenCart = (token: string) => {
        get('/user-cart/cart', {}, token).then(res => {
            console.log(res.data)
            if (res.data) {
                setCurrentCart(res.data)
            }
        }).catch(e => {
            if (e.response?.status === 401) {
                toast.error('xin đăng nhập')
                dispatch(setToken(''))
                router.replace('login')
            } else {
                toast.error(e.message)
                toast.error('Đã có lỗi xảy ra')
            }
           
        })
    }

    useEffect(() => {
        if (!token) {
            router.replace('/login')
        }
        getCurrenCart(token)
    }, [token])


    return(
        <section>
            <div className="sx:w-full xl:container m-auto flex flex-col justify-center items-center gap-3">
                <span className="text-3xl font-sans font-semibold">
                    Giỏ hàng của bạn
                </span>
                <span>
                    Có {currentCart?.items?.length} sản phẩm trong giỏ hàng của bạn
                </span>
            </div>
            <div className="sx:w-full xl:container m-auto">
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 450 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Tên sản phẩm</TableCell>
                      <TableCell align="right">Số lượng</TableCell>
                      <TableCell align="right">Giá</TableCell>
                      <TableCell align="right">Thành tiền</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      rows && rows.length ? (
                          rows.map((row, index) => (
                            <TableRow
                              key={index}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell component="th" scope="row">
                                {row.name}
                              </TableCell>
                              <TableCell align="right">{row.quantity}</TableCell>
                              <TableCell align="right">{row.price.toLocaleString()} đ</TableCell>
                              <TableCell align="right">{row.totalOnePrice.toLocaleString()} đ</TableCell>
                            </TableRow>
                          ))  
                      ) : (
                        <div className="w-full h-96 flex justify-center items-center">
                            Không có sản phẩm nào được chọn
                        </div>
                      )
                    }
                  </TableBody>
                </Table>
              </TableContainer>
              <div className="flex justify-between my-4 mx-3 text-lg font-bold">
                    <span>
                      Tổng tiền
                    </span>
                    <span className="text-red-600">
                      {totalPrice.toLocaleString()} đ
                    </span>
              </div>
            </div>
        </section>
    )
}