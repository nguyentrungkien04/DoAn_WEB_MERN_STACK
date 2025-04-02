import React from "react";
import "./Cart.css";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets"; 

const Cart = () => {
  const { cartItem, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate();

  // ✅ Thêm hàm định dạng tiền tệ Việt Nam
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      currencyDisplay: 'code'  // Hiển thị "VND" thay vì "₫"
    }).format(amount);
  };

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Mục</p>
          <p>Tên món</p>
          <p>Giá</p>
          <p>Số lượng</p>
          <p>Tổng</p>
          <p>Xóa</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItem[item.id] > 0) {
            return (
              <div key={item.id}>
                <div className="cart-items-title cart-items-item">
                  <img src={url + "/images/" + item.image} alt="" />
                  <p>{item.name}</p>
                  <p>{formatCurrency(item.price)}</p>
                  <p>{cartItem[item.id]}</p>
                  <p>{formatCurrency(item.price * cartItem[item.id])}</p>
                  <p onClick={() => removeFromCart(item.id)} className="cross"><img className="delete_icon" src={assets.delete_icon} alt="dddd"/></p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Tạm tính</p>
              <p>{formatCurrency(getTotalCartAmount())}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Phí vận chuyển</p>
              <p>{formatCurrency(getTotalCartAmount() === 0 ? 0 : 20000)}</p>
            </div>
            <hr />
            <div className="cart-total-details-bottom">
              <p className="ptag">Tổng</p>
              <p>{formatCurrency(getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 20000)}</p>
            </div>
          </div>
          <button onClick={() => navigate("/order")}>Tiến hành thanh toán</button>
        </div>
        <div className="cart-promocode">
          <div className="cart-promocode-title">
            <p>Nếu bạn có mã khuyến mại, hãy nhập vào đây</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Enter your code" />
              <button>Áp dụng</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
