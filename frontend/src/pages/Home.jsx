import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Banner from '../components/Banner'
import TypeOfDevice from '../components/TypeOfDevice'
import FamousBranch from '../components/FamousBranch'
import PopularProducts from '../components/PopularProducts'
import BestSeller from '../components/BestSeller'
const Home = () => {

  return (
    <div className='z-10'>
      <Banner />
      <TypeOfDevice />
      <FamousBranch />
      <PopularProducts />
      <BestSeller />
    </div>
  )
}

export default Home