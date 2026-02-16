import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider, App as AntdApp } from 'antd';
import esES from 'antd/locale/es_ES';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import MainLayout from './components/MainLayout';
import Users from './pages/Users';
import './App.css';

function App() {
  return (
    <ConfigProvider
      locale={esES}
      theme={{
        token: {
          colorPrimary: '#1677ff',
          borderRadius: 6,
        },
      }}
    >
      <AntdApp>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route element={<PrivateRoute />}>
              <Route element={<MainLayout />}>
                <Route path="/users" element={<Users />} />
                <Route path="/" element={<Navigate to="/users" replace />} />
              </Route>
            </Route>

            <Route path="*" element={<Navigate to="/users" replace />} />
          </Routes>
        </BrowserRouter>
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;
