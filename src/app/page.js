// import { useEffect } from 'react'
import { redirect } from 'next/navigation'

export default async function Home() {
  try{

    // for any POST request you should use use client 
    //  const data = await fetch('http://localhost:3000/api/set-cookies', { method: 'POST' })

    // as this is static server side rendering only get request will work
     const data = await fetch('https://api.vercel.app/blog')
     const posts = await data.json()
     console.log("api resp",posts)
  }catch(err){
    console.log("error",err)
  }

  return (
    <div className="bg-cyan-300 w-5 h-36">
     hai
    </div>
  );
}


