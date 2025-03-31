import React from "react";
import "./PlaceOrder.css";
import { useContext, useState } from "react";
import { StoreContext } from "/src/context/StoreContext";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItem, url } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    ward: "",
    district: "",
    province: "",
    country: "",
    phone: "",
  });

  const onChangeHanddler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];

    food_list?.forEach((item) => {
      const quantity = cartItem[item._id];
      if (quantity > 0) {
        let itemInfo = { ...item, quantity };
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 20000,
    };
    let response = await axios.post(url + "/api/order/place", orderData, {
      headers: { token },
    });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert("Error");
    }
  };

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Thông tin giao hàng</p>
        <div className="multi-fields">
          <input
            required
            onChange={onChangeHanddler}
            value={data.firstName}
            type="text"
            placeholder="Họ"
            name="firstName"
          />
          <input
            required
            onChange={onChangeHanddler}
            value={data.lastName}
            type="text"
            placeholder="Tên"
            name="lastName"
          />
        </div>
        <input
          required
          onChange={onChangeHanddler}
          value={data.email}
          type="email"
          placeholder="Địa chỉ Email"
          name="email"
        />
        <input
          required
          onChange={onChangeHanddler}
          value={data.street}
          type="text"
          placeholder="Số nhà, tên đường"
          name="street"
        />
        <div className="multi-fields">
          <input
            required
            onChange={onChangeHanddler}
            value={data.ward}
            type="text"
            placeholder="Phường/Xã"
            name="ward"
          />
          <input
            required
            onChange={onChangeHanddler}
            value={data.district}
            type="text"
            placeholder="Quận/Huyện"
            name="district"
          />
        </div>
        <div className="multi-fields">
          <input
            required
            onChange={onChangeHanddler}
            value={data.province}
            type="text"
            placeholder="Tỉnh/Thành phố"
            name="province"
          />
          <input
            required
            onChange={onChangeHanddler}
            value={data.country}
            type="text"
            placeholder="Quốc gia"
            name="country"
          />
        </div>
        <input
          required
          onChange={onChangeHanddler}
          value={data.phone}
          type="text"
          placeholder="Số điện thoại"
          name="phone"
        />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Tổng đơn hàng</h2>
          <div>
            <div className="cart-total-details">
              <p>Tạm tính</p>
              <p>{getTotalCartAmount().toLocaleString()} ₫</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Phí giao hàng</p>
              <p>{getTotalCartAmount() === 0 ? 0 : 20000} ₫</p>
            </div>
            <hr />
            <div className="cart-total-details-bottom">
              <p className="ptag">Tổng cộng</p>
              <p>
                {(getTotalCartAmount() === 0
                  ? 0
                  : getTotalCartAmount() + 20000
                ).toLocaleString()}{" "}
                ₫
              </p>
            </div>
          </div>
          <button type="submit">Tiến hành thanh toán</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
