import React, { useState, useEffect } from 'react'
import "./Orders.css"
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets.js'

const Orders = ({ url }) => {

  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data);
    } else {
      toast.error("Error")
    }
  }

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(url + "/api/order/update", {
      orderId,
      status: event.target.value
    });
    if (response.data.success) {
      toast.success("Updated successfully")
      fetchAllOrders()
    } else {
      toast.error("Error")
    }
  }

  // ✅ Hàm định dạng tiền tệ: VND 50.000
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      currencyDisplay: 'code'
    }).format(amount);
  }

  useEffect(() => {
    fetchAllOrders()
  }, [])

  return (
    <div className='order add'>
      <h3>ORDER PAGE</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className='order-item'>
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x" + item.quantity
                  } else {
                    return item.name + " x" + item.quantity + ", "
                  }
                })}
              </p>
              <p className="order-item-name">{order.address.firstName + " " + order.address.lastName}</p>
              <div className="order-item-address">
                <p>{order.address.street + ", "}</p>
                <p>phường {order.address.ward + ", " + order.address.district + ", " + order.address.province + ", " + order.address.country + "."}</p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Số lượng món: {order.items.length}</p>

            {/* ✅ Đã cập nhật định dạng tiền */}
            <p className="order-item-price">{formatCurrency(order.amount)}</p>

            <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
              <option value="ĐANG CHUẨN BỊ MÓN ĂN">ĐANG CHUẨN BỊ MÓN ĂN</option>
              <option value="ĐANG GIAO HÀNG">ĐANG GIAO HÀNG</option>
              <option value="ĐÃ GIAO HÀNG THÀNH CÔNG">ĐÃ GIAO HÀNG THÀNH CÔNG</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
