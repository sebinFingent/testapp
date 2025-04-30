'use client'
import React, { createContext, useContext} from "react";
import styled from 'styled-components';
import {withToaster} from './withToaster'

const ToastContainer = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1000;
`;

const Toast = styled.div`
  background-color: #333;
  color: #fff;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: translateX(100%);
  animation: slideIn 0.3s forwards, fadeOut 0.5s forwards ${props => props.duration || 3000}ms;

  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes fadeOut {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(200%);
    }
  }
  // @keyframes fadeOut {
  //   from {
  //     opacity: 1;
  //   }
  //   to {
  //     opacity: 0;
  //   }
  // }
`;

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

const ToastProvider = ({ children,addToast,toastData }) => {
  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {toastData  &&     
        <ToastContainer>
            <Toast key={toastData?.id} duration={toastData?.duration}>
            {toastData?.message}
            </Toast>
        </ToastContainer>
      }
    </ToastContext.Provider>
  );
};

export default withToaster(ToastProvider);