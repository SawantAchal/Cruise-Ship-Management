import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import MenuPage from './MenuPage'
import CruisePhoto from '../components/CruisePhoto'
import CruiseLayout from '../components/CruiseLayout'
import ProfilePage from './ProfilePage'
import StationeryPage from './StationeryPage'

import Header from '../components/Header'
import ExploreMenu from '../components/ExploreMenu'
import MenuDisplay from '../components/MenuDisplay'
import StationeryDisplay from '../components/StationeryDisplay'

const HomePage = () => {
  const [category , setCategory] = useState("All")
  const [stationeryCategory, setStationeryCategory] = useState('All');

  return (
    <>
        <Navbar />
        <Header/>
        <CruisePhoto/>
        <ExploreMenu category={category} setCategory={setCategory}/>
        <MenuDisplay category={category}/>

        {/* <StationeryDisplay category={category} setCategory={setCategory} /> */}
        <StationeryDisplay category={stationeryCategory} setCategory={setStationeryCategory} />
        <ProfilePage/>
    </>
  )
}

export default HomePage