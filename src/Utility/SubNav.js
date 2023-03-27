import React from 'react';
import { Link } from 'react-router-dom';

const SubNav = (props) => {
    return (
        <div className='mx-4 p-1 d-flex sub_nav'>
            <div className='m-2'>
                <Link to={props.first_link} className='text-decoration-none'>{props.name}</Link >
            </div>
            <div className='border'></div>
            <div className='m-2'>
                <Link to={props.second_link} className='text-decoration-none'>Add {props.name}</Link>
            </div>
            <div className='border'></div>
        </div >
    )
}

export default SubNav