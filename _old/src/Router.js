import React, { useContext } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Auth from './Components/Auth';
import Dashboard from './Components/Dashboard';
import AuthContext from './Context/AuthContext'


export default function Router() {
    const { loggedIn } = useContext(AuthContext);

    return (
        <BrowserRouter>
            <Switch>

                {loggedIn === false && (
                    <>
                        <Route exact path="/">
                            <Auth />
                        </Route>
                    </>
                )}
                {loggedIn === true && (
                    <>
                        <Route exact path="/">
                            <Dashboard />
                        </Route>
                    </>
                )}

            </Switch>
        </BrowserRouter>
    )
}
