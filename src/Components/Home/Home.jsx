import React, { useEffect, useState } from 'react'
import Child from '../Child/Child';
import style from './Home.module.css'
import axios from 'axios'


export default function Home() {

    let [myFilter, setmyFilter] = useState('name');

    let [candidates, setCandidates] = useState([]);

    let [filteredcan, setfilteredcan] = useState([]);

    let [myInput, setmyInput] = useState('');

    let [isClicked1, setisClicked1] = useState(false);

    let [isClicked2, setisClicked2] = useState(false);

    let [coloumns, setColoumns] = useState(['Name', 'Email', 'Company Name', 'City'])

    let [asasyString, setAsasyString] = useState([0, 0, 0, 0])

    let [updatedString, setUpdatedString] = useState([0, 0, 0, 0])

    let [isDisabled, setIsDisabled] = useState(true)

    let [searchedArray, setSearchedArray] = useState(['', '', '', ''])

    let [searchOnFilter, setsearchOnFilter] = useState('')

    let [checkStatus, setcheckStatus] = useState([false, false, false, false])




    function toggleClassPersonalDetails() {
        setisClicked1(!isClicked1);
    }

    function toggleClassAddress() {
        setisClicked2(!isClicked2);
    }




    useEffect(() => {
        getApi();

    }, [])



    async function getApi() {
        let response = await axios.get('https://jsonplaceholder.typicode.com/users')



        setCandidates(response.data)
        setfilteredcan(response.data)
    }





    function search(input) {
        let candidatesNow;


        candidatesNow = candidates.filter((x) => {
            return x.name.toLowerCase().startsWith(input[0].toLowerCase()) &&
                x.email.toLowerCase().startsWith(input[1].toLowerCase()) &&
                x.company.name.toLowerCase().startsWith(input[2].toLowerCase()) &&
                x.address.city.toLowerCase().startsWith(input[3].toLowerCase())
        })

        setfilteredcan(candidatesNow);

        setmyInput(input);
    }


    function areArraysEqual(arr1, arr2) {

        if (arr1.length !== arr2.length) {
            return false;
        }


        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) {
                return false;
            }
        }

        return true;
    };



    return <>


        <div className='row'>

            {/* Filteer boooooooooox............... */}

            <div className="col-md-3">


                {/* Filter buttonn.................... */}

                <div className={`${style.mainColor} rounded-5 d-flex justify-content-center align-items-center my-4`}>
                    <i className="fa-solid fa-filter ms-4 me-2 py-3 " style={{ color: "#ffffff" }}></i>
                </div>





                {/* Filter div.................... */}

                <div id='filterBox' className={`${style.mainColor} overflow-y-auto  vh-100 rounded-3 d-flex flex-wrap justify-content-center align-content-start`}>

                    <input className='rounded-1 bg-light border-0 p-1 my-3 w-75' type="text" placeholder='Filter...' onInput={(e) => {
                        let x = e.target.value;
                        setsearchOnFilter(x);
                    }} />



                    <div className='w-75'>


                        <div className="item">


                            <div className=' d-flex justify-content-between align-items-center'>

                                <p className='text-white fs-6 fw-bold m-0'>Personal Details</p>


                                {isClicked1 ? '' : <button onClick={toggleClassPersonalDetails} className=' btn bg-transparent text-light border-0'><i className="fa-solid fa-caret-down"></i></button>}

                                {isClicked1 ? <button onClick={toggleClassPersonalDetails} className='btn bg-transparent text-light border-0'><i className="fa-solid fa-caret-up"></i></button> : ''}

                            </div>

                            <div className={`w-75 my-1 ${style.dropdowndiv2} ${isClicked1 ? style.show2 : ''}`}>

                                {coloumns.map((x, i) => x.toLowerCase().startsWith(searchOnFilter.toLowerCase()) && (i == 0 || i == 1) ?



                                    <div className="form-check" key={i}>

                                        <input checked={checkStatus[i]} className="form-check-input" type="checkbox" onChange={(e) => {


                                            let newarr = [...updatedString];

                                            let status = [...checkStatus]
                                            status[i] = e.target.checked
                                            setcheckStatus(status)

                                            e.target.checked ? newarr[i] = 1 : newarr[i] = 0;

                                            areArraysEqual(newarr, asasyString) ? setIsDisabled(true) : setIsDisabled(false);


                                            setUpdatedString(newarr);

                                        }} />

                                        <label className="text-light form-check-label">
                                            {x}
                                        </label>


                                        {checkStatus[i] ? <input type="text" className=' w-100 bg-light border-0 p-1 rounded-4 mb-3' placeholder='Search......' onInput={(e) => {

                                            let newarr = [...searchedArray];

                                            newarr[i] = e.target.value;

                                            setSearchedArray(newarr);

                                            search(newarr);

                                        }} /> : ''}

                                    </div> : '')}

                            </div>

                        </div>


                        <div className="item">


                            <div className=' d-flex justify-content-between align-items-center'>

                                <p className='text-white fs-6 fw-bold m-0'>Address</p>


                                {isClicked2 ? '' : <button onClick={toggleClassAddress} className='  btn bg-transparent text-light border-0'><i className="fa-solid fa-caret-down"></i></button>}

                                {isClicked2 ? <button onClick={toggleClassAddress} className='  btn bg-transparent text-light border-0'><i className="fa-solid fa-caret-up"></i></button> : ''}

                            </div>

                            <div className={`w-75 my-1 ${style.dropdowndiv2} ${isClicked2 ? style.show2 : ''}`}>

                                {coloumns.map((x, i) => x.toLowerCase().startsWith(searchOnFilter.toLowerCase()) && (i == 2 || i == 3) ?



                                    <div className="form-check" key={i}>

                                        <input checked={checkStatus[i]} className="form-check-input" type="checkbox" onChange={(e) => {


                                            let newarr = [...updatedString];

                                            let status = [...checkStatus]
                                            status[i] = e.target.checked
                                            setcheckStatus(status)

                                            e.target.checked ? newarr[i] = 1 : newarr[i] = 0;

                                            areArraysEqual(newarr, asasyString) ? setIsDisabled(true) : setIsDisabled(false);


                                            setUpdatedString(newarr);

                                        }} />

                                        <label className="text-light form-check-label">
                                            {x}
                                        </label>


                                        {checkStatus[i] ? <input type="text" className=' w-100 bg-light border-0 p-1 rounded-4 mb-3' placeholder='Search......' onInput={(e) => {

                                            let newarr = [...searchedArray];

                                            newarr[i] = e.target.value;

                                            setSearchedArray(newarr);

                                            search(newarr);

                                        }} /> : ''}


                                    </div> : '')}

                            </div>

                        </div>



                    </div>




                    {asasyString.map((x, i) => x == 1 ? <div key={i} className={`d-flex flex-wrap justify-content-center w-75`}>

                        <label className='text-white w-100' htmlFor="">{coloumns[i]} : </label>


                        <input type="text" className=' w-100 bg-light border-0 p-1 rounded-4 mb-3' placeholder='Search......' onInput={(e) => {

                            let newarr = [...searchedArray];

                            newarr[i] = e.target.value;

                            setSearchedArray(newarr);

                            search(newarr);

                        }} />



                    </div> : ''
                    )}





                </div>
            </div>



            {/*Table and search box............... */}

            <div className="col-md-9 ">


                <div className='w-75 mx-auto my-3'>

                    <table className={`table border border-primary table-bordered text-center table-dark ${style.mytable}`}>

                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Company Name</th>
                                <th>City</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredcan.map((x) => <Child key={x.id} candidate={x} searched={myInput} filtered={myFilter} />)}
                        </tbody>

                    </table>

                </div>
            </div>
        </div>



    </>
}
