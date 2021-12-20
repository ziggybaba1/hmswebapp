import React from "react";
import {
  BrowserRouter as Router,
  Link,
  useLocation
} from "react-router-dom";

const _deleteData = async (key) => {
  try {
    await localStorage.removeItem('@HMS:'+key);
  } catch (error) {
    // Error saving data
  }
};

const _storeData = async (item,key) => {
    try {
      await localStorage.setItem(
        '@HMS:'+key,
        JSON.stringify(item)
      );
    } catch (error) {
      // Error saving data
    }
  };
  const _retrieveData = async (key) => {
    try {
      const value = await localStorage.getItem('@HMS:'+key);
      if (value !== null) {
        return JSON.parse(value); 
      }
          } catch (error) {
      return false;
      }
  };

  const _retrieveToken = async () => {
    try {
      const value = localStorage.getItem('@HMS:token');
      if (value !== null) {
        return JSON.parse(value);
      }
    } catch (error) {
      return null;
    }
  };

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const addComma=(num)=>{
    return '₦'+num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}



function errorMessage(toast,message){
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
}
function successMessage(toast,message){
  toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
}

function warningMessage(toast,message){
  toast.warn(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
}


  export {
      _storeData,
      _retrieveData,
      _retrieveToken,
      useQuery,
      addComma,
      errorMessage,
      warningMessage,
      successMessage,
      _deleteData
  }