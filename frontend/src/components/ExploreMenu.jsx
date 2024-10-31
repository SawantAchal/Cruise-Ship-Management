import React from 'react'
import { exploreMenu } from '../assets/menuData.js'

const ExploreMenu = ({category , setCategory}) => {
  return (
    <>
        <div>
            <h1 className='text-center text-5xl'>Explore menu</h1>
            <div className='flex bg-pink-400 gap-4'>
                {
                    exploreMenu.map((item , index) => (
                        <div onClick={() => setCategory((prev) => (prev === item.menu_name?"All" : item.menu_name))} key={index}>
                            <p className={category===item.menu_name?"active" :''}>{item.menu_name}</p>
                            <p></p>
                        </div>
                    ))
                }
            </div>
        </div>
    </>
  )
}

export default ExploreMenu