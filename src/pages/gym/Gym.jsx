import { useEffect, useState } from 'react'
import supabase from '../../utils/supabase'
import { AttendanceGraph, Overview, RevenueOverview } from '../../components'
import { Link, useParams, useNavigate, Outlet } from 'react-router-dom'

const Gym = () => {
  return (
    <>
      <Overview />
      <AttendanceGraph />
    </>
  )
}

export default Gym
