import React, { useState, useEffect } from 'react'
import "./List.css"
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets'

const List = ({ url }) => {

  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error")
    }
  }

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message)
    } else {
      toast.error("Error");
    }
  }

  // ✅ Hàm format tiền tệ: VND 50.000
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      currencyDisplay: 'code'
    }).format(amount);
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className="list add flex-col">
      <p>DANH SÁCH MÓN ĂN</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>ẢNH</b>
          <b>TÊN MÓN</b>
          <b>DANH MỤC</b>
          <b>GIÁ</b>
          <b>XÓA</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{formatCurrency(item.price)}</p> {/* ✅ Áp dụng định dạng */}
              <p><img className="delete_icon" onClick={() => removeFood(item._id)} src={assets.delete_icon} alt="dddd"/></p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List
