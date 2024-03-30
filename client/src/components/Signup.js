
import React from 'react';
import { useNavigate } from 'react-router-dom'
import { Sign_up } from '../services/dataServices'
import Navbar from './Navbar';
import Navtry from './navtry'
import '../home.css'

export default function Signup() {
     
    // const [user_id,setUser_id]
    const navigate = useNavigate();
    async function AddUser(event) {
        debugger
        event.preventDefault();
        let user = {
            user_name: event.target.name.value,
            user_password: event.target.password.value,
            user_email: event.target.email.value
        }
        try {
            let result = await Sign_up(user);
            result = await result.json();
            let user_id = result[0].user_id
            if (result.status == 400) {
                alert("user already exist")
            }
            else {
                let LocalUser = {
                    user_name: event.target.name.value,
                    user_id: user_id,
                    user_status: result[0].user_status,
                    user_email:event.target.email.value
                }
                sessionStorage.setItem("currentUser", JSON.stringify(LocalUser))
                navigate('/Home');
            }

        }
        catch (err) {
            console.log(err);

        }
    }

    return (
        <>
            {/* <Navbar></Navbar> */}
            <Navtry></Navtry>

            <center>
                <form onSubmit={(event) => AddUser(event)}>
                    <div>
                        <label>name:</label>
                        <input className='connection_input' name="name"></input>
                    </div>
                    <br></br>
                    <div>
                        <label>password:</label>
                        <input className='connection_input' required name="password" type="password"></input>
                    </div>
                    <br></br>
                    <div>
                        <label>email:</label>
                        <input className='connection_input' type="email" required name="email" ></input>
                    </div>
                    <br></br>
                    <button type="submit" className="btn btn-primary">Sign up</button>


                </form>
            </center>
        </>
    )
}



