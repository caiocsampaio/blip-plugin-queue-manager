import { Home } from 'pages/Home';
import { PageHeader } from 'components/PageHeader';
import { PageTemplate } from 'components/PageTemplate';
import { CommonProvider } from 'contexts/CommonContext';
import { ConfigProvider } from 'contexts/ConfigContext';
import React from 'react';
import { EditQueuePage } from 'pages/EditQueue/EditQueuePage';

function App() {
  return (
    <div id="main" className="App">
      <ConfigProvider>
        <PageHeader />
        <PageTemplate>
          <CommonProvider>
            {/* <Home /> */}
            <EditQueuePage />
          </CommonProvider>
        </PageTemplate>
      </ConfigProvider>
    </div>
  );
}

export default App;
