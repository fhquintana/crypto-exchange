import { BrowserRouter, Switch, Route, useHistory } from 'react-router-dom';
import pages from '../configs/Pages';

function Routes() {

    let history = useHistory();

    return(
        <BrowserRouter history={history}>
            <Switch>
                {pages.map((page, index) => (
                    <Route key={index} exact={page.exact} path={page.path} render={props => (
                        <page.layout history={props.history}>
                            <page.component {...props} />
                        </page.layout>
                    )} />
                ))}
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;