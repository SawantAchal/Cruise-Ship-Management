import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import CruisePhoto from '../components/CruisePhoto'
import Header from '../components/Header'
import ExploreMenu from '../components/ExploreMenu'
import MenuDisplay from '../components/MenuDisplay'
import StationeryDisplay from '../components/StationeryDisplay'
import MovieBookingPage from './MovieBookingPage'

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
        <StationeryDisplay category={stationeryCategory} setCategory={setStationeryCategory} />
        <MovieBookingPage/>
    </>
  )
}

export default HomePage