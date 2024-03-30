
import React from 'react';
import { useNavigate } from 'react-router-dom'
import { Log_in } from '../services/dataServices'
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navtry from './navtry'

export default function Login() {
    const navigate = useNavigate();
    async function checkUser(event) {
        event.preventDefault();
        let user = {
            user_name: event.target.name.value,
            user_password: event.target.password.value,
        }
        try {
            let result = await Log_in(user);
            if (result.length > 0) {
                let LocalUser = {
                    user_name: event.target.name.value,
                    user_id: result[0].user_id,
                    user_status: result[0].user_status,
                    user_email: result[0].user_email
                }
                sessionStorage.setItem("currentUser", JSON.stringify(LocalUser))
                navigate('/Home')
            }
            else {
                alert("user does not exist")
            }
        }
        catch (err) {
            console.log(err);

        }
    }

    return (
        <>
            <Navtry></Navtry>
            <center className="log_in_form">
                <form onSubmit={(event) => checkUser(event)}>
                    <div>
                        <label>name:</label>
                        <input required name="name"></input>
                    </div>
                    <br></br>
                    <div>
                        <label>password:</label>
                        <input required name="password" type="password"></input>
                    </div>
                    <br></br>
                    <button type="submit" className="btn btn-primary">Log in</button>
                </form>
            </center>
        </>
    )
}



