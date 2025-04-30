import clsx from "clsx";
import Link from 'next/link'
import { useEffect, useState } from "react";

export default function ClientSideNav({toggleNav,isNavOpen}) {
 const [delayOpenState,setDelayOpenState] = useState(isNavOpen)
 useEffect(()=>{
    setTimeout(()=>{
        setDelayOpenState(isNavOpen)
    },250)
 },[isNavOpen])
  return (
    <nav
      className={clsx("relative",
        "bg-slate-500 hidden lg:block p-2 text-white top-0 left-0 transition-transform duration-1000 ease-in-out delay-100 shadow-md",
        isNavOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <figure
        className="absolute right-[-1.55rem] top-0 rounded-e-full bg-slate-300 shadow-md w-[25px] flex justify-center cursor-pointer"
        onClick={toggleNav}
      >
        <span className={clsx("text-xl text-slate-500 pr-1 transition-transform duration-500", !isNavOpen  && "rotate-180" )}>
          &#129048;
        </span>
      </figure>
      <ul className={clsx(delayOpenState?"space-y-4 p-4":"hidden")}>
        <li>
          <Link href="/graphql">Home</Link>
       </li>
        <li>
          <Link href="/toaster">Toasters</Link>
        </li>
        <li>
          <Link href="/calander">Calander</Link>
        </li>
        <li>
          <Link href="/timepicker">Time picker</Link>
        </li>
      </ul>
    </nav>
  );
}