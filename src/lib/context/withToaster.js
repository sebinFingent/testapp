import React, { useState, useCallback, useRef } from "react";

const toasterQueue = new ToasterQueue();

export const withToaster = (Component) => {

  const WithToaster = (props) => {
    const [toasts, setToasts] = useState(null);
    const timer = useRef(null);
  
    const showToaster = useCallback((message, duration, addToQueue = false) => {
      const id = Date.now();
  
      // Reset timer
      if (timer.current) {
        clearTimeout(timer.current);
      }
  
      if (message) {
        // Show toaster
        setToasts({ id, message, duration });
  
        timer.current = setTimeout(() => {
          if (addToQueue) {
            toasterQueue.next(showToaster);
          } else {
            // Reset toaster
            setToasts(null);
  
            // Continue with queue if not empty
            if (!toasterQueue.isEmpty()) {
              toasterQueue.next(showToaster);
            }
          }
        }, duration + 500); // +500 for animation
      } else {
        setToasts(null);
      }
    }, []);
  
    const addToast = useCallback((message, duration = 3000, addToQueue = false) => {
      if (addToQueue) {
        toasterQueue.add(message, showToaster, duration);
      } else {
        showToaster(message, duration, addToQueue);
      }
    }, [showToaster]);
  
  
    return <Component {...props} addToast={addToast} toastData={toasts}/>;
  };

  WithToaster.displayName = `WithToaster`;

  return WithToaster;
}


export default function ToasterQueue(){
    this.queue = [];

    // Add new item to queue, immediately toast item in queue
    this.add = (item,showToaster,duration) =>{
      // initiate duration on add
      this.duration = duration;
      this.queue.push(item);
      
      if(this.queue.length === 1)
        showToaster(item,this.duration)
    }

    // Show next item in queue
    this.next =  (showToaster)=>{
      this.queue.shift();
      
      showToaster(this.queue[0],this.duration);            
    };

    // Check if queue is empty
    this.isEmpty = () => {
      return this.queue.length ? false: true;
    }
  
}
