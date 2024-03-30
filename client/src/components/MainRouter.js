import { React, Router, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import Items from '../components/Items'
import ShowSingleItem from './ShowSingleItem';
import Bag from './Bag'
import EditItem from './EditItem'
import AddItem from './AddItem';
import AllItems from './AllItems'
export default function MainRouter(props) {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/Home');
    },[])
    return (
        <Routes>
            <Route exact element={<Signup/>} path="/signup"/>
            <Route exact element={<Login/>} path="/login"/>
            <Route exact element={<Home/>} path="/Home"/>
            <Route exact element={<AllItems/>} path="/allitems"/>
            <Route exact element={<AddItem/>} path="/additem"/>
            <Route exact element={<Bag/>} path="/bag"/>
            <Route exact element={<Items/>} path="/:classification/:category"/>
            <Route exact element={<EditItem/>} path="/items/edit_item"/>
            <Route exact element={<ShowSingleItem/>} path="/:classification/:category/:id"/>
        </Routes>
    )
}