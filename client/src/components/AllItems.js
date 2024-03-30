import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useLocation, useParams } from "react-router-dom";
//  import img from "../boys_images/shirts/boy_shirt3.webp";
import { getItemsByCategory, getAllItems } from '../services/dataServices';
import Item from './Item'
import '../items.css'
import { useRef } from "react";
import Navtry from './navtry';
export default function AllItems(props) {
    const [data, set_data] = useState([]);
    const [first_item, setFirst] = useState(18);
    const [last_item, setLast] = useState(30);
    const listInnerRef = useRef();

    const onScroll = () => {
        debugger
        if (listInnerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
            // if (scrollTop + clientHeight === scrollHeight) {
                setFirst(first_item + 10);
                setLast(last_item + 10);
            // }
        }
    }

    async function allItems() {
        try {
            const res = await getAllItems(first_item, last_item);
            set_data([...data, ...res]);
        }
        catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        allItems()
    }, [first_item, last_item])

    return (
        <div onScroll={onScroll} ref={listInnerRef}  style={{ height: "965px", overflowY: "auto" }}>
           <Navtry></Navtry>
            <div className='items_wrapper'>             
                {
                    data.length > 0 &&
                    data.map(i => <Item item={i} category={i.item_category} classification={i.item_classification}
                        category_id={i.item_category} classification_id={i.item_classification}></Item>)
                }
            </div>
        </div>
    )
}