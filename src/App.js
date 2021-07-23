import { PageHeader } from 'components/PageHeader';
import { PageTemplate } from 'components/PageTemplate';
import { CommonProvider } from 'contexts/CommonContext';
import { ConfigProvider } from 'contexts/ConfigContext';
import { CreateQueuePage } from 'pages/CreateQueue/CreateQueue';
import { EditAutoMessagePage } from 'pages/EditAutoMessage/EditAutoMessage';
import { EditWorkingHoursPage } from 'pages/EditWorkingHours/EditWorkingHoursPage';
import { HomePage } from 'pages/Home/HomePage';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div id="main" className="App">
      <ConfigProvider>
        <CommonProvider>
          <PageHeader />
          <PageTemplate>
            <BrowserRouter>
              <Switch>
                <Route path="/" exact={true} component={HomePage} />
                <Route path="/editWorkingHours/:id" exact={true} component={EditWorkingHoursPage} />
                <Route path="/editAutoMessage/:id" exact={true} component={EditAutoMessagePage} />
                <Route path="/createQueue" exact={true} component={CreateQueuePage} />
              </Switch>
            </BrowserRouter>
          </PageTemplate>
        </CommonProvider>
      </ConfigProvider>
    </div>
  );
}

export default App;
