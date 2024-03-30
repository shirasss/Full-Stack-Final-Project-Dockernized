import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import '../home.css'
import image1 from '../home_images/הורדה.jpg';
import image2 from '../home_images/הורדה2.jpg'
import image3 from '../home_images/הורדה3.jpg';
import image4 from '../home_images/הורדה4.jpg';

import Navtry from './navtry'
export default function Home() {
    const [url, setUrl] = useState([])
    const [index, setIndex] = useState(0)
    function getImages() {
        let i = [];
        i[3] = image4
        i[2] = image1;
        i[1] = image2;
        i[0] = image3;
        setUrl(i);
    }
    function back() {
        if (index != 0) {
            setIndex(index - 1)
        }
    }
    function next() {
        if (index == 3) {
            setIndex(0)
        }
        if (index < 3) {
            setIndex(index + 1)
        }
    }
    // setInterval(function () {
    //     next()
    // }, 4000);
    useEffect(() => {
        getImages();
        setIndex(0)
    }, [])
    return (
        <div className='home_body'>
            <Navtry></Navtry>
            <center className="img_holder">
                <h2 onClick={() => back()}>⬅️</h2>
                <img className='image ' src={url[index]}></img>
                <h2 onClick={() => next()}>➡️</h2>
            </center>
            <center>
                <h5 className='animate-charcter'>Free shipping on orders over 30$</h5>
            </center>
        </div>

    )
}