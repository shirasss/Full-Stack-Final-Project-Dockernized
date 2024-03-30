
import Navbar from './Navbar';
import '../home.css'
import React, { useEffect, useState } from 'react';
import service from '../services/dataServices';
import { useNavigate } from 'react-router-dom'
import ItemBag from './ItemBag';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Navtry from './navtry'

export default function Bag() {
    const [pay, setPay] = useState(false);
    const [showErr, setShowErr] = useState(false);
    const [bagInStock, setBagInStock] = useState([])
    // const navigate = useNavigate();
    let current_user = JSON.parse(sessionStorage.getItem('currentUser'));
    const [bag, setBag] = useState([]);
    const [totalSum, setTotalSum] = useState(0);
    // const [text, setText] = useState("")
    async function get_bag() {
        try {
            let result = await service.get_bag(current_user.user_id);
            const bagStock = result.filter(item => item.item_quantity <= item.item_quantity_in_stock);
            setBagInStock(bagStock)
            let sum = 0;
            bagStock.forEach((Element) => {
                sum += Element.item_price * Element.item_quantity
            });
            setTotalSum(sum);
            setBag(result);

        }
        catch (err) {
            console.log(err)
        }
    }
    async function remove_item(item) {
        try {
            let result = await service.delete_item_from_bag(item);
            get_bag();
        }
        catch (err) {
            console.log(err);
        }
    }
    async function checkout() {
        let order = {
            user_id: current_user.user_id,
            user: current_user,
            user_name: current_user.user_name,
            bagInStock: bagInStock,
            bag: bagInStock
        }
        try {
            let result = await service.check_out(order)
            await get_bag()
            setPay(false)
        }
        catch (err) {
            console.log(err);
        }
    }
    function showModal() {
        if (bagInStock.length == 0) {
            setShowErr(true)
        }
        else {
            setPay(true)
        }
    }

    useEffect(() => {
        get_bag();
    }, [])
    return (
        <>
            {/* <Navbar></Navbar> */}
            <Navtry></Navtry>

            <Modal show={pay} onHide={() => setPay(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>payment by paypal </Modal.Title>
                </Modal.Header>
                <Modal.Body>enter your password:</Modal.Body>
                <input required></input>
                <Modal.Footer>
                    <Button className="btn btn-success" onClick={() => checkout()}>
                        ok
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showErr} onHide={() => setShowErr(false)}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body className='errModal'>your bag contains only out of stock items!</Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
            <center>
                <form>
                    {current_user && bag.length == 0 && <center> <h1>your bag is empty</h1></center>}
                    <div className='up_bag'>
                        <h5 className='bag_table'>Shopping Bag  <split className='bag_details'>Your bag contains {bagInStock.length} items and comes to a total of {totalSum} nis</split></h5>
                        {bag.length > 0 && <Button onClick={() => showModal()} variant="primary" size="lg" active> go to  checkout </Button>}
                    </div>
                    < table className="bag_table">
                        <tbody>
                            {current_user && bag.length > 0 &&
                                <>
                                    <tr className='bag_tr'>
                                        <th className='bag_th'>details</th>
                                        <th className='bag_th'>quantity</th>
                                        <th className='bag_th'>size</th>
                                        <th className='bag_th'>availability</th>
                                        <th className='bag_th'> price</th>
                                    </tr>
                                </>
                            }
                            {bag.length > 0 && bag.map(item =>
                                <ItemBag getbag={get_bag} delete={remove_item} current_user={current_user} item={item}></ItemBag>
                            )}
                        </tbody>
                    </table>
                </form>
            </center>
        </>

    )
}