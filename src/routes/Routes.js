import { BrowserRouter, Switch, Route, Redirect, useHistory } from 'react-router-dom';
import pages from '../configs/PagesRouting';

function Routes() {

    const rootPath = '/';
    let history = useHistory();

    return(
        <BrowserRouter history={history}>
            <Switch>
                {pages.map((page, index) => (
                    <Route key={index} exact={page.exact} path={page.path} render={(props) => (
                        page.path === rootPath ?
                        <Redirect to={pages[0].path} /> :
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