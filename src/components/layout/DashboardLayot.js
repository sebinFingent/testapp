'use client'
import { ApolloProvider } from '@apollo/client';
import client from '../../lib/apolloClient';

import { useState } from "react";
import ClientSideNav from "./nav/NavVertical";
import clsx from 'clsx';
import ToastProvider from "@/lib/context/toasterContext";

export default function  DashboardLayot ({children}) {
    const [isNavOpen, setIsNavOpen] = useState(true);

    const toggleNav = () => {
      setIsNavOpen(!isNavOpen);
    };

    return (
        <section className={clsx(" h-screen col-span-12 row-span-12 grid","transition-all duration-1000 delay-100 ease-in-out", isNavOpen?"lg:grid-cols-[200px,1fr] ":"lg:grid-cols-[0px,1fr]")}>
            
            <ClientSideNav toggleNav={toggleNav} isNavOpen={isNavOpen}/>
            
            <aside className="grid grid-rows-[1fr,40px] overflow-y-auto" style={{ scrollbarWidth: "thin"}}>
                <section className="container mx-auto p-6 shadow-lg">
                    <ToastProvider>
                        <ApolloProvider client={client}>
                            {children}
                        </ApolloProvider>
                    </ToastProvider> 
                </section>
                <footer className="bg-blue-500"></footer>
            </aside>
        </section>
    )
}