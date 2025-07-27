import { PUBLIC } from '@models/routes/routes';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, logoutUser } from "@redux"

function Logout() {
  const dispatch = useDispatch<AppDispatch>();
  const navigator = useNavigate();

  useEffect(() => {
    dispatch(logoutUser())
    console.log('holla')
    navigator(`/${PUBLIC.LANDING_PAGE}`)
  }, [dispatch, navigator])
  
  return null
}

export default Logout