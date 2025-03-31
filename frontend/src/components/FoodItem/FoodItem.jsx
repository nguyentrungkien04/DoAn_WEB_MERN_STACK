import React, { useContext} from 'react'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import "./FoodItem.css"

const FoodItem = ({id,name,price,description,image})=> {

    const {cartItem,addToCart,removeFromCart,url} = useContext(StoreContext);
    const formatPrice = (price) => {
      return price.toLocaleString('vi-VN'); // hoặc dùng 'de-DE'
    };
  return (
    <div className="food-item">
        <div className="fodd-item-img-container">
            <img src={url+"/images/"+image} alt="" className="food-item-image" />
            {!cartItem[id]
                ?<img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white} alt=""/>
                :<div className ="food-item-counter">
                  <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                  <p>{cartItem[id]}</p>
                  <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
                </div>
            }
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className="food-item-desc">{description}</p>
            <p className="food-item-price">{formatPrice(price)} VND</p>
        </div>
    </div>
  )
}

export default FoodItem
