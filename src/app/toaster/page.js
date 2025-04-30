'use client'
import {  useState } from "react";
import { useToast } from "@/lib/context/toasterContext";


const ToasterManager = () => {
  const {addToast} = useToast();

    const [ind,add] = useState(0);
    const [indQ,addQ] = useState(0);
    const [indQTwo,addQTwo] = useState(0);

    const showToast = () => {
        addQ(indQ + 1);
        const message = "Item toaster 1: "+(indQ + 1);
        addToast(message,3000,true);
    };
    const showToastTwo = () => {
        addQTwo(indQTwo + 1);
        const message = "Item toaster 2: "+(indQTwo + 1);
        addToast(message,3000,true);
    };

    const showToastNoQueue = () => {
        add(ind + 1);
        const message = "Item toaster: "+(ind + 1);
        addToast(message,1000);
    };
      
    return (
      <div style={{ padding: "20px" }}>
        <button onClick={showToast}>Show Toast from Queue 1: ({ indQ })</button><br/>
        <button onClick={showToastTwo}>Show Toast from Queue 2: ({ indQTwo })</button>
        <br/>
        <button onClick={showToastNoQueue}>Show Normal Toast ({ ind })</button>
      </div>
    );
}

export default ToasterManager;