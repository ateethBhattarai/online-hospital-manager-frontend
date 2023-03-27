import React from 'react'
import { Navigate } from 'react-router-dom';
import { useStateContext } from '../Context/ContextProvider';
import { PatientSideBar } from '../Utility/PatientSideBar'

export const PatientChat = () => {
    const { token } = useStateContext();

    if (!token) {
        return <Navigate to='/login' />
    }
    return (
        <>
            <PatientSideBar />
            <div className="container text-center box-shadow p-2">
                <div className="d-flex text-center align-items-center justify-content-center">
                    <div>
                        <h4>Chat System</h4>
                    </div>
                    <div className='m-3'>
                        <button className='btn btn-primary'>Chat request</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <div className="search mb-3 box-shadow">
                            <input type="text" placeholder='Search...' />
                        </div>
                        <div className='chat-req-box'>
                            <div className="row box-shadow p-2">
                                <div className="col-sm-4">
                                    <div className='chat-img border'>
                                        <img className='rounded' src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80" alt="pic" />
                                    </div>
                                </div>
                                <div className="col-sm-8">
                                    <div className='p-1 chat-name-div'>
                                        <span className='chat-name'>Ateeth Bhattarai</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-8">
                        <div className="d-flex box-shadow text-center justify-content-center">
                            <div className='m-2 chat-img'>
                                <img className='rounded' src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80" alt="pic" />
                            </div>
                            <div className='m-2'>
                                <b>Name</b>
                            </div>
                        </div>
                        <div className='chat-box my-2 box-shadow'>
                            <p>Hello</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
