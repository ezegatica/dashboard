import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

const AuthContext = createContext();

function AuthContextProvider(props) {
    const [loggedIn, setLoggedIn ] = useState(undefined);
    const [at, setAt] = useState(localStorage.getItem('at') || '');
    function set(accessToken){
        setAt(accessToken);
        localStorage.setItem('at', accessToken)
    }
    async function getLoggedIn(){
        const loggedInRes = await axios.post(process.env.REACT_APP_API_URL + "auth/check", {
            token: at
        });
        setLoggedIn(loggedInRes.data)
    }

    useEffect(()=> {
        getLoggedIn();
        // eslint-disable-next-line
    }, []);

    return <AuthContext.Provider value={{loggedIn, getLoggedIn, set}}>
        {props.children}
    </AuthContext.Provider>
}
export default AuthContext;
export {AuthContextProvider};

