import '../App.css';
import { React, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import service from '../services/dataServices';
import Modal from 'react-bootstrap/Modal'
export default function Item(props) {
    const navigate = useNavigate();
    const location = useLocation();
    // const { state } = location;
    const [show, setShow] = useState(false);
    let current_user = JSON.parse(sessionStorage.getItem('currentUser'));

    async function remove_item() {
        try {

            let result = await service.delete_item_from_store(props.item);
            setShow(false)
            await props.get_items()
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <div className='item'>
                <Modal show={show} onHide={() => setShow(false)}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>are you sure you want to remove "{props.item.item_description}"?</Modal.Body>
                    <Modal.Footer>
                        <Button className="btn btn-success" onClick={() => remove_item()}>
                            Yes
                        </Button>
                        <Button className="btn btn-primary" onClick={() => setShow(false)}>
                            No
                        </Button>
                    </Modal.Footer>
                </Modal>
                <NavLink state={{ classification_id: props.item.item_classification, category_id: props.item.item_category, item_id: props.item.item_id }} exact to={"/" + props.classification + "/" + props.category + "/" + props.item.item_id} > <img className='item_img' src={props.item.item_url} />  </NavLink>
                <div className='botton_item'>
                    {current_user && current_user.user_status != "customer" && <button onClick={() => setShow(true)}>❌</button>}
                    {current_user && current_user.user_status != "customer" && <button class="btn btn-success btn-lg edit " onClick={() => navigate('/items/edit_item', { state: { item: props.item }})}> edit item </button>}
                </div>
                <div className='botton_item'>
                    <h4 texteditable="true" className='item_description'>{props.item.item_description}</h4>
                    <h4 className='price'>{props.item.item_price}nis</h4>
                </div >


            </div>
        </>
    )
}