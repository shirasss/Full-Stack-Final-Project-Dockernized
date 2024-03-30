
import Navbar from './Navbar';
import '../home.css'
import React, { useEffect, useState } from 'react';
import service from '../services/dataServices';

export default function ItemBag(props) {
    let item = props.item;
    const [stock, setStock] = useState([]);
    async function get_stock() {
        try {
            let result = await service.get_item_stock(item.item_id);
            setStock(result);
        }
        catch (err) {
            console.log(err);
        }
    }

    async function changeQuantity(item, event) {
        // console.log(event.target.value);
        try {
            let i = {
                user_id: props.current_user.user_id,
                item_id: item.item_id,
                item_quantity: event.target.value,
                item_size:item.item_size,
                bag_item_id:item.bag_item_id
            }
            let result = await service.change_item_bag(i,"item_quantity");
            await props.getbag();
        }
        catch (err) {
            alert(err);
        }
    }
    async function changeSize(item, event) {
debugger
        try {
            let i = {
                user_id: props.current_user.user_id,
                item_id: item.item_id,
                item_size: event.target.value,
                bag_item_id:item.bag_item_id
            }
            let result = await service.change_item_bag(i, "item_size");
           await props.getbag();
        }
        catch (err) {
            alert(err);
        }
    }
    useEffect(() => {
        get_stock();
    }, [])
    return (
        <>
            <tr className='bag_tr'>
                <td>
                    <button onClick={() => props.delete(item)}>❌</button>
                    <h4>{item.item_description}</h4>
                    <img className="img_bag" src={item.item_url}></img>
                </td>
                <td><select onChange={(event) => changeQuantity(item, event)}>
                    <option>{item.item_quantity}</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                </select></td>
                <td>
                    <select onChange={(event) => changeSize(item, event)}>
                        <option>{item.item_size} </option>
                        {stock && stock.map(size => size.item_size != item.item_size && <option value={size.item_size}>{size.item_size} {size.item_quantity_in_stock > 0 ? <h1 className="instock">in stock</h1> : <split className="outofstock">out of stock</split>}</option>)}
                    </select>
                </td>
                <td> {item.item_quantity_in_stock >= item.item_quantity ? <h5 className='instock'>in stock</h5> : <h5 className='outofstock'>out of stock</h5>}</td>
                <td>{item.item_quantity * item.item_price}$</td>
            </tr>
        </>
    )
}