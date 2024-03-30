import React, { useState } from 'react';
import { Router, useEffect } from 'react'
import '../App.css';
import { NavLink } from 'react-router-dom'
import { get_girls_category } from '../services/dataServices'
import { get_boys_category } from '../services/dataServices'
import { get_classification } from '../services/dataServices'
export default function Navbar() {
    const [girls_state, set_girls_state] = useState(false);
    const [boys_state, set_boys_state] = useState(false);
    const [classification, setClassification] = useState(null)
    const [BoysCategory, setBoysCategory] = useState(null)
    const [GirlsCategory, setGirlsCategory] = useState(null)
    let current_user = JSON.parse(sessionStorage.getItem('currentUser'));

    async function getClassification() {
        try {
            let res = await get_classification();
            setClassification(res);
        }
        catch (err) {
            console.log(err);

        }

    }
    async function getBoysCategory() {
        try {
            let res = await get_boys_category();
            setBoysCategory(res);
        }
        catch (err) {
            console.log(err);

        }
    }
    async function getGirlsCategory() {
        try {
            let res = await get_girls_category();
            setGirlsCategory(res);
        }
        catch (err) {
            alert(err)
        }
    }
    useEffect(() => {
        getGirlsCategory()
        getClassification();
        getBoysCategory();
    }, [])
    return (
        <div className='nav_bar_all'>
            <div className='Navbar'>
                { current_user&& current_user.status!="customer" && <NavLink activeClassName="active" className="navlink home_navlink up" exact to="/additem">add item</NavLink>}
                <NavLink activeClassName="active" className="navlink up" exact to="/signup">sign up </NavLink>
                <NavLink activeClassName="active" className="navlink up" exact to="/login">login </NavLink>
                <NavLink activeClassName="active" className="navlink up" exact to="/bag">🛍️</NavLink>

                <br></br>
                <br></br>
                <nav className='nav_options'>
                    <h1 className='barlink' onClick={() => { set_boys_state(!boys_state); set_girls_state(false) }}>BOYS {boys_state ? "🔺" : "🔻"} </h1>
                    <h1 className='barlink' onClick={() => { set_girls_state(!girls_state); set_boys_state(false) }}>GIRLS {girls_state ? "🔺" : "🔻"}</h1>

                    <h1> <NavLink activeClassName="active" className="navlink home_navlink barlink" exact to="/Home">HOME</NavLink></h1>
                </nav>
            </div>

            {
                girls_state &&
                <split className="girls_menu">
                    {GirlsCategory && GirlsCategory.map(item => { return <div><NavLink state={{category_id: item.category_id,classification_id:2}}  onClick={() => { set_girls_state(false) }} activeClassName="active" className="navlink description" exact to={"/girls/" + item.category_description}>{item.category_description}</NavLink></div> })
                    }
                </split>
            }
            {
                boys_state &&
                <split className="boys_menu">
                    {BoysCategory && BoysCategory.map(item => { return <div><NavLink state={{category_id: item.category_id,classification_id:1}}  onClick={() => { set_boys_state(false) }} activeClassName="active" className="navlink description" exact to={"/boys/" + item.category_description}>{item.category_description}</NavLink></div> })
                    }

                </split>
            }
        </div>
    )
}


