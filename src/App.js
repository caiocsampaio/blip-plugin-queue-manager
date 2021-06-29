import { PageHeader } from 'components/PageHeader';
import { PageTemplate } from 'components/PageTemplate';
import { CommonProvider } from 'contexts/CommonContext';
import { ConfigProvider } from 'contexts/ConfigContext';
import React from 'react';

function App() {
  return (
    <div id="main" className="App">
      <ConfigProvider>
        <PageHeader />
        <PageTemplate>
          <CommonProvider>
            
          </CommonProvider>
        </PageTemplate>
      </ConfigProvider>
    </div>
  );
}

export default App;
