import React from 'react';
import { Layout, Menu, Button, Typography, Space, theme } from 'antd';
import {
    TeamOutlined,
    LogoutOutlined,
    UserOutlined
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

const MainLayout: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const userJson = localStorage.getItem('user');
    const user = userJson ? JSON.parse(userJson) : { username: 'Usuario', role: 'N/A' };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider breakpoint="lg" collapsedWidth="0" theme="dark">
                <div style={{
                    height: 64,
                    margin: 16,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: 8
                }}>
                    <Title level={4} style={{ color: 'white', margin: 0 }}>Gestión App</Title>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    items={[
                        {
                            key: '/users',
                            icon: <TeamOutlined />,
                            label: 'Usuarios',
                            onClick: () => navigate('/users'),
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header style={{
                    padding: '0 16px',
                    background: colorBgContainer,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    height: 'auto',
                    minHeight: '64px',
                    flexWrap: 'wrap',
                    paddingTop: '8px',
                    paddingBottom: '8px'
                }}>
                    <Title level={5} style={{ margin: 0 }}>Mantenimiento</Title>

                    <Space size="middle" wrap>
                        <Space>
                            <UserOutlined />
                            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.2' }}>
                                <Text strong style={{ fontSize: '14px' }}>{user.username}</Text>
                                <Text type="secondary" style={{ fontSize: '11px' }}>{user.role}</Text>
                            </div>
                        </Space>
                        <Button
                            type="text"
                            icon={<LogoutOutlined />}
                            onClick={handleLogout}
                            danger
                            size="small"
                        >
                            Salir
                        </Button>
                    </Space>
                </Header>
                <Content style={{ margin: '24px 16px 0' }}>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
