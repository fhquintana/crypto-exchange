import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Exchange from '../pages/Exchange';
import NotFound from '../pages/NotFound';
import SystemLayout from '../layouts/SystemLayout';

function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/'>
                    <Redirect from='/' to='/login' />
                    <Route exact path='/login' component={Login} />
                </Route>
                <SystemLayout>
                    <Route exact path='/home' component={Home} />
                    <Route exact path='/exchange' component={Exchange} />
                </SystemLayout>
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;