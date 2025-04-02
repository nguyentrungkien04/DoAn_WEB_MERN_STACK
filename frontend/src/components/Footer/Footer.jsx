import React from 'react'
import "./Footer.css"
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id="footer">
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>Lựa chọn từ thực đơn đa dạng với nhiều món ăn hấp dẫn được chế biến từ những nguyên liệu hảo hạng nhất và chuyên môn ẩm thực Sứ mệnh của chúng tôi là thỏa mãn cơn thèm ăn của bạn và nâng cao trải nghiệm ăn uống của bạn, từng bữa ăn ngon một</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy police</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+84-01234567</li>
                    <li>contactus@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">Copyright 2025 Tomato.com - All Right Reserved</p>
    </div>
  )
}

export default Footer
