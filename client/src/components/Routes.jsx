import {Switch, Route, Redirect} from 'react-router-dom'
import Auth from './Auth'
import CreateLink from './CreateLink'
import Detail from './Detail'
import Links from './Links'

export const useRoutes = isAuth => {
    if(isAuth){
        return(
            <Switch>
                <Route path="/links" exact>
                    <Links />
                </Route>
                <Route path="/create" exact>
                    <CreateLink />
                </Route>
                <Route path="/detail/:id" >
                    <Detail />
                </Route>
                <Redirect to="/create" />
            </Switch>

        )
    }

    return(
        <Switch>
            <Route path="/" exact>
                <Auth />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}