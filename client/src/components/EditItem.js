import React, { useEffect, useState } from 'react';
import '../home.css'
import service from '../services/dataServices'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Navtry from './navtry'

import { Navigate, useLocation } from 'react-router-dom';
export default function EditItem() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => { setShow(true); navigate('/Home') }
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const [stock, setStock] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState(null);

    async function get_stock() {
        try {

            let result = await service.get_item_stock(state.item.item_id)
            setStock(result)
            console.log(result)
        }
        catch (err) {
            console.log(err);
        }
    }
    async function get_sizes() {
        try {
            let result = await service.get_sizes_by_category(state.item.item_category);
            setSizes(result)
        }
        catch (err) {
            console.log(err);

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
    async function updateItem(event) {
        event.preventDefault();

        let item = {
            item_description: event.target.description.value,
            item_price: event.target.price.value,
            item_id: state.item.item_id,
            item_color: event.target.color.value
        }
        let stock = []
        let index = 0;
        sizes.map(s => {
            let n = "size" + s.size_value;
            // console.log(event.target[n].value)
            stock[index++] = { size: s.size_value, quantity: event.target[n].value }
        });
        item.stock = stock
        try {
            let result = await service.update_item(item);
            handleShow()
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        get_stock();
        get_sizes();
        getColors();
    }, [])
    return (
        <>
            {/* <Navbar></Navbar> */}
            <Navtry></Navtry>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    {/* <Modal.Title>Modal heading</Modal.Title> */}
                </Modal.Header>
                <Modal.Body>the changes are saved!</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <form onSubmit={(event) => updateItem(event)}>
                <center>
                    <h5 >edit item</h5>
                    <br></br>
                    <label>item description:     </label>
                    <input name='description' defaultValue={state.item.item_description}></input>
                    <br></br>
                    <br></br>

                    <label>item price:  </label>
                    <input type="number" name='price' defaultValue={state.item.item_price}></input>
                    <br></br>
                    <br></br>
                    <label>item color</label>
                    <select name="color">
                        {colors &&
                            colors.map(item => <option style={{ backgroundColor: item.color_description }} value={item.color_id}>{item.color_description}</option>)
                        }
                    </select>
                    <br></br>
                    <br></br>
                    <h3>stock: </h3>
                    <br></br>
                    <table>
                        <tr>
                            <th>item size</th>
                            <th>item quantity</th>
                        </tr>
                        {
                            stock.map(i => <tr>
                                <td>{i.item_size}</td>
                                <td><input type="number" required name={"size" + i.item_size} defaultValue={i.item_quantity_in_stock}></input></td>
                            </tr>)
                        }
                    </table>
                    <button type="submit" variant="primary" className="btn btn-primary">Submit</button>
                </center>
            </form>
        </>
    )
}