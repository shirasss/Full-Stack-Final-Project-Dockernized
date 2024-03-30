
import React, { useState } from 'react';
import { useEffect } from 'react'
import '../App.css';
import { NavLink } from 'react-router-dom'
import { get_girls_category } from '../services/dataServices'
import { get_boys_category } from '../services/dataServices'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
    const navigate = useNavigate();
    const [BoysCategory, setBoysCategory] = useState(null)
    const [GirlsCategory, setGirlsCategory] = useState(null)
    let current_user = JSON.parse(sessionStorage.getItem('currentUser'));

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
    function bag(){
        if(!current_user){
            alert("you have to log in in order to watch your bag");
        }
        else{
            navigate('/bag');
        }
    }
    useEffect(() => {
        getGirlsCategory()
        getBoysCategory();
    }, [])
    return (
        <div className='nav_bar_all'>
            <div className='Navbar'>
                
                {current_user && current_user.user_status != "customer" && <NavLink activeClassName="active" className="navlink home_navlink up" exact to="/additem">add item</NavLink>}
                { current_user&& current_user.user_status !="customer" && <NavLink activeClassName="active" className="navlink home_navlink up" exact to="/allitems">all items</NavLink>}
                <NavLink activeClassName="active" className="navlink up" exact to="/signup">sign up </NavLink>
                <NavLink activeClassName="active" className="navlink up" exact to="/login">login </NavLink>
                {/* <NavLink activeClassName="active" className="navlink up" exact to="/bag">🛍️</NavLink> */}
                <split className="bag" onClick={()=>bag()}>🛍️</split>
                <br></br>
                <br></br>
                <nav className='nav_options'>
                <DropdownButton className='dropbtn' id="dropdown-variants-Secondary" title="  BOYS  ">
                        {
                            BoysCategory && BoysCategory.map(item => {
                                return (
                                    <Dropdown.Item > 
                                         <NavLink state={{ category_id: item.category_id, classification_id: 1 }} 
                                          className="navlink description" 
                                          exact to={"/boys/" + item.category_description}>
                                            {item.category_description}
                                         </NavLink>  
                                    </Dropdown.Item>
                                )
                            })
                        }
                </DropdownButton>
                    <DropdownButton className='dropbtn' id="dropdown-variants-Secondary" title="  GIRLS          ">
                        {
                            GirlsCategory && GirlsCategory.map(item => {
                                return (
                                    <Dropdown.Item >  <NavLink state={{ category_id: item.category_id, classification_id: 2 }}  className="navlink description" exact to={"/girls/" + item.category_description}>{item.category_description}</NavLink>  </Dropdown.Item>
                                )
                            })
                        }
                    </DropdownButton>
                   
                    <h1> <NavLink activeClassName="active" className="navlink home_navlink barlink" exact to="/Home">HOME</NavLink></h1>
                </nav>
            </div>
        </div>
    )
}



