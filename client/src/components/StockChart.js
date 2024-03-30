import Navbar from './Navbar';
import service from '../services/dataServices';
import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react';


export default function StockChart(props) {
    const [sizes, setSizes] = useState([]);
    async function get_sizes() {
        try {
            let result = await service.get_sizes_by_category(props.item.item_category);
            setSizes(result)
        }
        catch (err) {
            console.log(err);
        }
    }
    async function addTheItem(event) {
        let stock = []
        let index = 0;
        sizes.map(s => {
            stock[index++] = { size: s.size_value, quantity: event.target["size" + s.size_value].value }
        })
        let item = props.item;
        item.stock = stock;
        try {
            let res = await service.add_Item(item);
            console.log(item)
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        get_sizes();
    },[])
    return (
        <center>
            {sizes &&
                <form onSubmit={event => addTheItem(event)}>
                    <table >
                        <tr>
                            <td>size:</td>
                            <td>quantity:</td>
                        </tr>
                        {
                            sizes.map(size =>
                                <tr>
                                    <td>{size.size_value}</td>
                                    <td><input required name={"size" + size.size_value}></input></td>
                                </tr>
                            )
                        }
                        <Button type="submit">add the item!</Button>
                    </table>
                </form>
            }
        </center>
    )

}
