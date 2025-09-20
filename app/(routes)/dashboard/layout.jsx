"use client";
import React, { useEffect } from 'react'
import SideNav from './_components/SideNav'
import DashboardHeader from './_components/DashboardHeader'
import { useUser } from '@clerk/nextjs';
import {useRouter} from 'next/navigation';

function Dashlayout({children}) {
  let user = null;
  let isLoaded = false;
  
  try {
    const userHook = useUser();
    user = userHook.user;
    isLoaded = userHook.isLoaded;
  } catch (error) {
    // Clerk not available (build time or missing keys)
    console.warn('Clerk not available:', error.message);
    isLoaded = true; // Assume loaded to prevent infinite loading
  }
  
  const router = useRouter();
  
  useEffect(() =>{
    user && checkUserBudgets();
  },[user])

  const checkUserBudgets = async () =>{ 
    try {
      const response = await fetch(`/api/user/budgets/check?email=${user?.primaryEmailAddress?.emailAddress}`);
      const data = await response.json();
      
      if (!data.hasBudgets) {
        router.replace('/dashboard/budgets');
      }
    } catch (error) {
      console.error('Error checking user budgets:', error);
    }
  }
  return (
    <>
    <div className='fixed md:w-64 hidden md:block'>
        <SideNav/>
    </div>

<div className='md:ml-64'>
<DashboardHeader/>
{children}</div>

    </>
    

  )
}

export default Dashlayout