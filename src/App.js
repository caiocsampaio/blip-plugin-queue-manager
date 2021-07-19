import { Home } from 'pages/Home';
import { PageHeader } from 'components/PageHeader';
import { PageTemplate } from 'components/PageTemplate';
import { CommonProvider } from 'contexts/CommonContext';
import { ConfigProvider } from 'contexts/ConfigContext';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { EditWorkingHours } from 'pages/EditWorkingHours';
import { EditAutoMessage } from 'pages/EditAutoMessage';

function App() {
  return (
    <div id="main" className="App">
      <ConfigProvider>
        <PageHeader />
        <PageTemplate>
          <CommonProvider>
            <BrowserRouter>
              <Switch>
                <Route path="/" exact={true} component={Home} />
                <Route path="/editWorkingHours/:id" exact={true} component={EditWorkingHours} />
                <Route path="/editAutoMessage/:id" exact={true} component={EditAutoMessage} />
              </Switch>
            </BrowserRouter>
          </CommonProvider>
        </PageTemplate>
      </ConfigProvider>
    </div>
  );
}

export default App;
