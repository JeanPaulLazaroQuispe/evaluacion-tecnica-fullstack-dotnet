import React, { useEffect, useState, useCallback } from 'react';
import {
    Table, Button, Space, Modal, Form, Input, DatePicker, Select,
    Popconfirm, Typography, App, Tag
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined } from '@ant-design/icons';
import { useForm, Controller } from 'react-hook-form';
import dayjs from 'dayjs';
import { getAllUsers, createUser, updateUser, deleteUser } from '../services/userService';
import type { User, CreateUserDto, UpdateUserDto } from '../types';

const { Title, Text } = Typography;

const Users: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [submitLoading, setSubmitLoading] = useState(false);

    const { message } = App.useApp();

    const currentUserJson = localStorage.getItem('user');
    const currentUser = currentUserJson ? JSON.parse(currentUserJson) : { role: 'User' };
    const isAdmin = currentUser.role === 'Admin';
    const isEditor = currentUser.role === 'Editor';
    const canWrite = isAdmin || isEditor;
    const canDelete = isAdmin;

    const { control, handleSubmit, reset } = useForm<CreateUserDto>({
        defaultValues: {
            username: '',
            email: '',
            password: '',
            role: 'User',
            birthDate: undefined
        }
    });

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getAllUsers();
            setUsers(data);
        } catch (error: any) {
            console.error(error);
            message.error('Error al cargar la lista de usuarios');
        } finally {
            setLoading(false);
        }
    }, [message]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const showModal = (user?: User) => {
        if (user) {
            setEditingUser(user);
            reset({
                username: user.username,
                email: user.email,
                role: user.role,
                birthDate: user.birthDate ? user.birthDate : undefined,
                password: ''
            });
        } else {
            setEditingUser(null);
            reset({
                username: '',
                email: '',
                password: '',
                role: 'User',
                birthDate: undefined
            });
        }
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setEditingUser(null);
        reset();
    };

    const onFinish = async (data: any) => {
        setSubmitLoading(true);
        try {
            const normalizedUsername = data.username?.trim().toLowerCase().replace(/\s+/g, '');
            const normalizedEmail = data.email?.trim().toLowerCase();

            const formattedData = {
                ...data,
                username: normalizedUsername,
                email: normalizedEmail,
                birthDate: data.birthDate ? data.birthDate : null
            };

            if (editingUser) {
                const updateData: UpdateUserDto = {
                    email: formattedData.email,
                    role: formattedData.role,
                    birthDate: formattedData.birthDate,
                    password: formattedData.password || undefined
                };
                await updateUser(editingUser.id, updateData);
                message.success('Usuario actualizado con éxito');
            } else {
                await createUser(formattedData);
                message.success('Usuario creado con éxito');
            }

            fetchUsers();
            handleCancel();
        } catch (error: any) {
            console.error(error);
            const errorMsg = error.response?.data?.message || 'Error al procesar la solicitud';
            message.error(errorMsg);
        } finally {
            setSubmitLoading(false);
        }
    };

    const disabledDate = (current: any) => {
        return current && current > dayjs().endOf('day');
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteUser(id);
            message.success('Usuario eliminado correctamente');
            fetchUsers();
        } catch (error: any) {
            message.error('Error al intentar eliminar el usuario');
        }
    };

    const columns = [
        {
            title: 'Usuario',
            dataIndex: 'username',
            key: 'username',
            render: (text: string) => <span style={{ fontWeight: 500 }}>{text}</span>
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Rol',
            dataIndex: 'role',
            key: 'role',
            render: (role: string) => {
                let color = role === 'Admin' ? 'volcano' : role === 'Editor' ? 'geekblue' : 'green';
                return <Tag color={color}>{role.toUpperCase()}</Tag>;
            }
        },
        {
            title: 'F. Nacimiento',
            dataIndex: 'birthDate',
            key: 'birthDate',
            render: (date: string) => date ? dayjs(date).format('DD/MM/YYYY') : <Tag>N/A</Tag>
        },
        {
            title: 'Estado',
            dataIndex: 'isActive',
            key: 'isActive',
            render: (active: boolean) => (
                <Tag color={active ? 'success' : 'default'}>
                    {active ? 'ACTIVO' : 'INACTIVO'}
                </Tag>
            )
        },
        {
            title: 'Acciones',
            key: 'action',
            width: 150,
            hidden: !canWrite,
            render: (_: any, record: User) => (
                <Space size="small">
                    {canWrite && (
                        <Button
                            type="text"
                            icon={<EditOutlined />}
                            onClick={() => showModal(record)}
                            style={{ color: '#1677ff' }}
                        />
                    )}
                    {canDelete && (
                        <Popconfirm
                            title="¿Eliminar usuario?"
                            description={`¿Estás seguro de eliminar a ${record.username}?`}
                            onConfirm={() => handleDelete(record.id)}
                            okText="Sí, eliminar"
                            cancelText="Cancelar"
                            okButtonProps={{ danger: true }}
                        >
                            <Button
                                type="text"
                                danger
                                icon={<DeleteOutlined />}
                            />
                        </Popconfirm>
                    )}
                </Space>
            ),
        },
    ].filter(col => !col.hidden);

    return (
        <div style={{ maxWidth: '100%', overflow: 'hidden' }}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 24,
                    flexWrap: 'wrap',
                    gap: '16px'
                }}
            >
                <Title level={3} style={{ margin: 0, minWidth: '200px' }}>Listado de Usuarios</Title>
                <Space wrap>
                    <Button
                        icon={<ReloadOutlined />}
                        onClick={fetchUsers}
                        className="mobile-full-width"
                    >
                        Refrescar
                    </Button>
                    {isAdmin && (
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => showModal()}
                            className="mobile-full-width"
                        >
                            Nuevo Usuario
                        </Button>
                    )}
                </Space>
            </div>

            <div className="table-container">
                <Table
                    columns={columns}
                    dataSource={users}
                    rowKey="id"
                    loading={loading}
                    pagination={{ pageSize: 8, responsive: true }}
                    bordered
                    scroll={{ x: 800 }}
                />
            </div>

            <Modal
                title={editingUser ? "Modificar Datos de Usuario" : "Registro de Nuevo Usuario"}
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
                destroyOnClose
                centered
            >
                <Form
                    layout="vertical"
                    onFinish={handleSubmit(onFinish)}
                    style={{ marginTop: 20 }}
                >
                    {!editingUser && (
                        <Form.Item label="Nombre de Usuario" required>
                            <Controller
                                name="username"
                                control={control}
                                rules={{ required: 'Este campo es obligatorio' }}
                                render={({ field, fieldState }) => (
                                    <Input {...field} status={fieldState.error ? 'error' : ''} placeholder="Ej: jlazaro" />
                                )}
                            />
                        </Form.Item>
                    )}

                    <Form.Item label="Correo Electrónico" required>
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: 'Este campo es obligatorio',
                                pattern: { value: /^\S+@\S+$/i, message: 'Dirección de correo inválida' }
                            }}
                            render={({ field, fieldState }) => (
                                <Input {...field} status={fieldState.error ? 'error' : ''} placeholder="usuario@ejemplo.com" />
                            )}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Contraseña"
                        required={!editingUser}
                        help={editingUser ? "Solo completa si deseas cambiar la contraseña actual" : ""}
                    >
                        <Controller
                            name="password"
                            control={control}
                            rules={{
                                required: !editingUser ? 'La contraseña es obligatoria' : false,
                                minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                            }}
                            render={({ field, fieldState }) => (
                                <>
                                    <Input.Password {...field} status={fieldState.error ? 'error' : ''} placeholder="********" />
                                    {fieldState.error && <Text type="danger" style={{ fontSize: 12 }}>{fieldState.error.message}</Text>}
                                </>
                            )}
                        />
                    </Form.Item>

                    <Form.Item label="Fecha de Nacimiento">
                        <Controller
                            name="birthDate"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <DatePicker
                                    style={{ width: '100%' }}
                                    value={value ? dayjs(value) : null}
                                    onChange={(date) => onChange(date ? date.format('YYYY-MM-DD') : null)}
                                    format="DD/MM/YYYY"
                                    placeholder="Seleccionar fecha"
                                    disabledDate={disabledDate}
                                />
                            )}
                        />
                    </Form.Item>

                    <Form.Item label="Rol del Sistema">
                        <Controller
                            name="role"
                            control={control}
                            render={({ field }) => (
                                <Select {...field} style={{ width: '100%' }}>
                                    <Select.Option value="Admin" disabled={!isAdmin}>Administrador</Select.Option>
                                    <Select.Option value="Editor">Editor</Select.Option>
                                    <Select.Option value="User">Usuario Estándar</Select.Option>
                                </Select>
                            )}
                        />
                    </Form.Item>

                    <div style={{ display: 'flex', justifyContent: 'end', gap: 12, marginTop: 32 }}>
                        <Button onClick={handleCancel}>Cancelar</Button>
                        <Button type="primary" htmlType="submit" loading={submitLoading}>
                            {editingUser ? "Guardar Cambios" : "Crear Usuario"}
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default Users;
