
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import AddImg from './AddImg';
import Navbar from './Navbar';
import { React, Router, useEffect } from 'react';
import { get_All_category } from '../services/dataServices'
import { get_classification } from '../services/dataServices'
import service from '../services/dataServices'
import Navtry from './navtry'
import StockChart from './StockChart'
export default function AddItem() {
    const [url, setUrl] = useState("")
    const [classification, setClassification] = useState(null)
    const [category, setCategory] = useState(null)
    const [colors, setColors] = useState(null);
    const [item, setItem] = useState(null)
    async function getClassification() {
        try {
            let res = await get_classification();
            setClassification(res);
        }
        catch (err) {
            console.log(err)
        }
    }
    async function getColors() {
        debugger
        try {
            let res = await service.get_colors();
            setColors(res);
            debugger

        }
        catch (err) {
            console.log(err)
        }
    }
    async function getCategory() {
        try {
            let res = await get_All_category()
            setCategory(res)
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getClassification();
        getCategory();
        getColors()
    }, [])
    function submit(e) {
        let item = {
            item_classification: e.target.classification.value,
            item_category: e.target.category.value,
            item_description: e.target.description.value,
            item_price: e.target.price.value,
            item_url: url,
            item_color:e.target.color.value
        }
        setItem(item)
    }
    return (
        <>
            {/* <Navbar></Navbar> */}
            <Navtry></Navtry>

            <center>
                {!item &&
                    <form onSubmit={(e) => submit(e)}>
                        <label>choose classification</label>
                        {classification && <select name="classification"> {
                            classification.map(item => <option value={item.classification_id}>{item.classification_description}</option>)
                        }
                        </select>}
                        <br></br>
                        <label>choose category</label>
                        {category && <select name="category"> {
                            category.map(item => <option value={item.category_id}>{item.category_description}</option>)}
                        </select>}
                        <br></br>
                        <label>choose color</label>
                        {colors && <select name="color"> {
                            colors.map(item => <option style={{backgroundColor:item.color_description}} value={item.color_id}>{item.color_description}</option>)}
                        </select>}
                        <br></br>
                        <label>add a short description on the item:</label>
                        <input required name="description" type="text" />
                        <br></br>
                        <label>enter the item price:</label>
                        <input required name="price" type="number" />
                        <br></br>
                        <label>add the item image</label>
                        <div>
                            <AddImg add={(u) => { setUrl(u) }}></AddImg>
                        </div>
                        <div>
                            <button  type="submit">next➡️</button>
                        </div>
                    </form>
                }
                {item && <StockChart item={item}></StockChart>}
            </center>
        </>
    )
}

