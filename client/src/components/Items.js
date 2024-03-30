import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from "react-router-dom";
import { getItemsByCategory } from '../services/dataServices';
import Item from './Item'
import Navtry from './navtry'
import sercice from '../services/dataServices'
import '../items.css'

export default function Boys_items(props) {
    const location = useLocation();
    const { state } = location;
    const { category } = useParams();
    const { classification } = useParams();
    const [data, set_data] = useState([]);
    const [dataShow, setDataShow] = useState([]);
    const [selcetedColors, setSelcetedColors] = useState([]);
    const [colors, setColors] = useState(null);
    const [showColors, setShowColors] = useState(false);
    // const [showPrices, setShowPrices] = useState(false);

    async function get_items() {
        try {
            const res = await getItemsByCategory(state.classification_id, state.category_id);
            set_data(res);
            setDataShow(res);

        }
        catch (err) {
            console.log(err.message)
        }
    }
    async function getColors() {
        try {
            let res = await sercice.get_colors();
            setColors(res);
            debugger

        }
        catch (err) {
            console.log(err)
        }
    }

    async function selected(event, color) {
        debugger
        let filter_colors = [...selcetedColors];
        if (event.target.checked) {
            filter_colors.push(color);
        }
        else {
            const index = filter_colors.indexOf(color);
            if (index > -1) {
                filter_colors.splice(index, 1);
            }
            if (filter_colors.length == 0)
                setDataShow(data)
        }
        await setSelcetedColors(filter_colors);
        console.log(selcetedColors)
    }
    function filter() {
        let selsctedData = []
        for (const item of data) {
            for (const color of selcetedColors) {
                if (item.item_color == color) {
                    selsctedData.push(item)
                }
            }
        }
        setDataShow(selsctedData)
    }
    // async function filterPrice(event){
    //     const up_to = event.target.value;
    //     let tmp = dataShow.filter(item => item.item_price <= up_to);
    //     setDataShow(tmp);
    // }
    function showcolors(){
        setDataShow(data)
        setSelcetedColors([]);
        setShowColors(!showColors)
    }
    useEffect(() => {
        get_items();
        getColors();
        setSelcetedColors([]);
        setShowColors(false)
    }, [state.category_id, state.classification_id])
    return (

        <>
            <Navtry></Navtry>
            <div className='items_show'>
                <div className='filter_color'>
                    <button type="button" class="btn btn-secondary" onClick={() =>showcolors() }>filter color</button>
                    <br></br>
                    {showColors && colors && colors.map((item) => {
                        return (
                            <>
                                <input className='colorCheckbox'  type="checkbox" onChange={(event) => selected(event, item.color_id)}></input>
                                <label>{item.color_description}</label>
                                <br></br>
                            </>
                        )
                    })
                    }
                    {showColors && <button onClick={() => { filter() }}>start</button>}
                    <br></br>
                    {/* <button type="button" class="btn btn-secondary" onClick={() => setShowPrices(!showPrices)}>filter price</button> */}
                    {/* {showPrices &&
                        <select onChange={(event) => filterPrice(event)}>
                            <option value="30">30</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="200">200</option>
                        </select>
                    } */}
                </div>

                <div className='items_wrapper'>
                    {
                        dataShow.length > 0 &&
                        dataShow.map(i => <Item get_items={get_items} item={i} category={category} classification={classification} category_id={state.category_id} classification_id={state.classification_id} ></Item>)
                    }
                </div>
            </div>
        </>
    )
}




// import React, { useEffect, useState } from 'react';
// import { useLocation, useParams } from "react-router-dom";
// import { getItemsByCategory } from '../services/dataServices';
// import Item from './Item'
// import Navtry from './navtry'
// import sercice from '../services/dataServices'
// import '../items.css'

// export default function Boys_items(props) {
//     const location = useLocation();
//     const { state } = location;
//     const { category } = useParams()
//     const { classification } = useParams()
//     const [data, set_data] = useState([]);
//     const [filterData, setFilterData] = useState([])
//     const [selcetedColors, setSelcetedColors] = useState([])
//     const [colors, setColors] = useState(null);
//     const [showColors, setShowColors] = useState(false);
//     const [showPrices, setShowPrices] = useState(false);

//     const [filters, setFilters] = useState(false);

//     async function get_items() {
//         try {
//             const res = await getItemsByCategory(state.classification_id, state.category_id);
//             set_data(res);
//         }
//         catch (err) {
//             console.log(err.message)
//         }
//     }
//     async function getColors() {
//         try {
//             let res = await sercice.get_colors();
//             setColors(res);
//             debugger

//         }
//         catch (err) {
//             console.log(err)
//         }
//     }

//     async function selected(event, color) {
//         debugger
//         let filter_colors = [...selcetedColors];
//         if (event.target.checked) {
//             setFilters(true)
//             filter_colors.push(color);
//         }
//         else {
//             const index = filter_colors.indexOf(color);
//             if (index > -1) {
//                 filter_colors.splice(index, 1);
//             }
//             if (filter_colors.length == 0)
//                 setFilters(false)
//         }
//         await setSelcetedColors(filter_colors);
//         console.log(selcetedColors)
//     }
//     function filter() {
//         let selsctedData = []
//         for (const item of data) {
//             for (const color of selcetedColors) {
//                 debugger
//                 if (item.item_color == color) {
//                     selsctedData.push(item)
//                 }
//             }
//         }
//         debugger
//         setFilterData(selsctedData)
//     }
//     async function getByPrice(event) {
//        const up_to=event.target.value
//         let tmp = data.filter(item => item.item_price  <= up_to);
//         set_data(tmp);
//     }
//     useEffect(() => {
//         get_items();
//         getColors();
//         setFilters(false);
//         setSelcetedColors([]);

//     }, [state.category_id, state.classification_id])
//     return (

//         <>
//             <Navtry></Navtry>
//             <div className='items_show'>

//                 <div className='filter_color'>
//                     <button type="button" class="btn btn-secondary" onClick={() => setShowColors(!showColors)}>filter color</button>
//                     <br></br>
//                     {showColors && colors && colors.map((item) => {
//                         return (
//                             <>
//                                 <label>{item.color_description}</label>
//                                 <input type="checkbox" onChange={(event) => selected(event, item.color_id)}></input>
//                                 <br></br>
//                             </>
//                         )
//                     })
//                     }
//                     {showColors && <button onClick={() => { filter() }}>start</button>}
//                     <br></br>
//                     <button type="button" class="btn btn-secondary" onClick={() => setShowPrices(!showPrices)}>filter price</button>
//                     {showPrices &&
//                         <select onChange={(event) => getByPrice(event)}>
//                             <option value="30">30</option>
//                             <option value="50">50</option>
//                             <option value="100">100</option>
//                             <option value="200">200</option>
//                         </select>
//                     }
//                 </div>

//                 <div className='items_wrapper'>
//                     {
//                         !filters && data.length > 0 &&
//                         data.map(i => <Item get_items={get_items} item={i} category={category} classification={classification} category_id={state.category_id} classification_id={state.classification_id} ></Item>)
//                     }
//                     {
//                         filters &&
//                         filterData.map(i => <Item get_items={get_items} item={i} category={category} classification={classification} category_id={state.category_id} classification_id={state.classification_id} ></Item>)
//                     }
//                 </div>
//             </div>
//         </>
//     )
// }