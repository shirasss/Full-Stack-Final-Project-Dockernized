import '../App.css';
import { NavLink } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import service from '../services/dataServices'
import '../items.css'
import React, { useEffect, useState } from 'react';
// import Navbar from './Navbar';
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Navtry from './navtry'

export default function ShowSingleItem(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const [data, set_data] = useState([]);
    const [inStock, setInStock] = useState([]);
    const [text, setText] = useState("")
    let current_user = JSON.parse(sessionStorage.getItem('currentUser'));
    async function get_item() {

        try {
            let res = await service.getSingleItem(state.classification_id, state.category_id, state.item_id);
            set_data(res)
            console.log(state.classification_id, state.category_id, state.item_id);

            get_stock(res[0].item_id);
        }
        catch (err) {
            console.log(err)
        }
    }
    async function get_stock(item_id) {
        try {

            let result = await service.get_item_stock(item_id);
            setInStock(result)
        }
        catch (err) {
            console.log(err);

        }
    }
    async function addToBag(event) {

        event.preventDefault();
        if (!current_user) {
            setText("in order to add items to bag you have to log in!")
            handleShow()
        }
        else {
            let item = {
                item_id: data[0].item_id,
                user_id: current_user.user_id,
                item_size: event.target.size.value,
                // item_quantity: event.target.quantity.value
            }
            try {
                let result = await service.add_to_bag(item);
                setText("the product was added sucssesfully!")
                await handleShow();

            }
            catch (err) {
                console.log(err)
            }
        }
    }
    useEffect(() => {
        get_item();
    }, [])
    return (
        <>
            {/* <Navbar></Navbar> */}
            <Navtry></Navtry>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>{text}</Modal.Body>
                {current_user &&
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleClose}>
                            continue shopping
                        </Button>
                        <Button className="btn btn-success" onClick={() => { navigate('/bag') }}>
                            view/edit bag
                        </Button>
                    </Modal.Footer>
                }
            </Modal>

            <form onSubmit={(event) => addToBag(event)}>
                <div className='item_details'>
                    <div>
                        {data.length > 0 && <img className='single_img' src={data[0].item_url}></img>}
                    </div>
                    <div>
                        <label >select size: </label>
                        <select name='size' className="select">
                            {inStock && inStock.map(size => <option value={size.item_size}>{size.item_size} {size.item_quantity_in_stock > 0 ? <h1 className="instock">in stock</h1> : <split className="outofstock">out of stock</split>}</option>)}
                        </select>
                        <br></br>
                        {/* <label>quantity: </label>
                        <input required name="quantity"></input> */}
                        <br></br>
                        <button type='submit' className='add_to_cart'>add to bag</button>
                    </div>
                </div>
            </form>
        </>
    )
}