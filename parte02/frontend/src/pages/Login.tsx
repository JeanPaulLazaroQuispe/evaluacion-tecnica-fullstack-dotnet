import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Typography, App, Flex } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

const { Title, Text } = Typography;

const Login: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const { control, handleSubmit } = useForm({
        defaultValues: {
            username: '',
            password: '',
        },
    });
    const navigate = useNavigate();
    const { message: antdMessage } = App.useApp();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/users');
        }
    }, [navigate]);

    const onSubmit = async (data: any) => {
        setLoading(true);
        try {
            const response = await login(data.username, data.password);

            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify({
                username: response.username,
                role: response.role
            }));

            antdMessage.success('¡Bienvenido al sistema!');
            navigate('/users');
        } catch (error: any) {
            console.error(error);
            const errorMsg = error.response?.data?.message || 'Error al iniciar sesión. Verifique sus credenciales.';
            antdMessage.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Flex
            justify="center"
            align="center"
            style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #1677ff 0%, #003a8c 100%)',
                padding: '20px'
            }}
        >
            <Card
                style={{
                    width: '100%',
                    maxWidth: 400,
                    borderRadius: 16,
                    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                    border: 'none'
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                    <div style={{
                        background: '#e6f4ff',
                        width: 64,
                        height: 64,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 16px'
                    }}>
                        <UserOutlined style={{ fontSize: 24, color: '#1677ff' }} />
                    </div>
                    <Title level={2} style={{ margin: 0 }}>Bienvenido</Title>
                    <Text type="secondary">Inicia sesión para continuar</Text>
                </div>

                <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
                    <Form.Item label="Usuario">
                        <Controller
                            name="username"
                            control={control}
                            rules={{ required: 'El usuario es requerido' }}
                            render={({ field, fieldState }) => (
                                <>
                                    <Input
                                        {...field}
                                        prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Tu usuario"
                                        size="large"
                                        status={fieldState.error ? 'error' : ''}
                                    />
                                    {fieldState.error && <Text type="danger" style={{ fontSize: 12 }}>{fieldState.error.message}</Text>}
                                </>
                            )}
                        />
                    </Form.Item>

                    <Form.Item label="Contraseña">
                        <Controller
                            name="password"
                            control={control}
                            rules={{ required: 'La contraseña es requerida' }}
                            render={({ field, fieldState }) => (
                                <>
                                    <Input.Password
                                        {...field}
                                        prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Tu contraseña"
                                        size="large"
                                        status={fieldState.error ? 'error' : ''}
                                    />
                                    {fieldState.error && <Text type="danger" style={{ fontSize: 12 }}>{fieldState.error.message}</Text>}
                                </>
                            )}
                        />
                    </Form.Item>

                    <Form.Item style={{ marginTop: 40 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            size="large"
                            loading={loading}
                            style={{ height: 48, borderRadius: 8, fontSize: 16, fontWeight: 600 }}
                        >
                            Entrar al Sistema
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Flex>
    );
};

export default Login;
