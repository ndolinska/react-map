import { BrowserRouter, Link } from 'react-router-dom';
import AppRouter from './router/AppRouter';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import UserSidebar from './components/UserSideBar'; 

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.scss'

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <DataProvider>
            <div className="app-layout">
              <nav>
                <div className="logo">MyMap
                </div>
                <div className="navigation">
                  <Link to="/map">Mapa</Link>
                  <Link to="/favorites">Ulubione</Link>
                  <Link to="/admin">Admin</Link>
                  <Link to="/">Login</Link>
                </div>
              </nav>
              <main>
                <AppRouter />
              </main>
                <UserSidebar />
            </div>
          </DataProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
    );
}
export default App;