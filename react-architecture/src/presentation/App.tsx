import React from 'react';
import { UserProfileContainer } from './containers/UserProfileContainer';
import { useAppStore } from '../application/store/useAppStore';

interface AppProps {
  initialConfig?: any;
}

const App: React.FC<AppProps> = ({ initialConfig }) => {
  const { theme, setTheme } = useAppStore();

  return (
    <div style={{ background: theme === 'dark' ? '#333' : '#fff', color: theme === 'dark' ? '#fff' : '#000', padding: '20px' }}>
      <h1>React Application</h1>
      <p>Config received from Host Application: {JSON.stringify(initialConfig)}</p>
      
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>

      <hr />
      
      <UserProfileContainer userId="123" />
    </div>
  );
};

export default App;
