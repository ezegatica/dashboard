import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

const AuthContext = createContext();

function AuthContextProvider(props) {
    const [loggedIn, setLoggedIn ] = useState(undefined);

    async function getLoggedIn(){
        const loggedInRes = await axios.get(process.env.REACT_APP_API_URL + "auth/check");
        setLoggedIn(loggedInRes.data)
    }

    useEffect(()=> {
        getLoggedIn();
    }, []);

    return <AuthContext.Provider value={{loggedIn, getLoggedIn}}>
        {props.children}
    </AuthContext.Provider>
}
export default AuthContext;
export {AuthContextProvider};

