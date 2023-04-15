import React from 'react'
import { Card, Image } from 'antd'
import { FaBirthdayCake } from 'react-icons/fa'
import { FiMapPin } from 'react-icons/fi'
import { BsFillTelephoneFill } from 'react-icons/bs'

const Welcome = () => {
    return (
        <>
            <div className="container-md mt-3">
                <Card>
                    <div className="row">
                        <div className="d-flex justify-content-around align-items-center flex-wrap ">
                            <div className='col-sm-4 text-center p-2'>
                                <Image
                                    className='rounded-circle'
                                    width={200}
                                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                />
                            </div>
                            <div className='col-sm-6 border-start px-3'>
                                {/* <h3 className='text-secondary'>Welcome,</h3> */}
                                <p className='text-center fs-1 my-2'>Ateeth Bhattarai</p>
                                <p className='text-center fs-5 my-4'> ateeth.myname@gmail.com</p>
                                <div className="fs-5 d-lg-flex text-center justify-content-around my-4">
                                    <p><FaBirthdayCake className='fs-3 mx-2' /> 2021/10/12</p>
                                    <p><FiMapPin className='fs-3 mx-2' /> Itahari-08, Sunsari, Nepal</p>
                                </div>
                                <p className='text-center fs-5'><BsFillTelephoneFill className='fs-3 mx-2' /> 98121213</p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </>
    )
}

export default Welcome