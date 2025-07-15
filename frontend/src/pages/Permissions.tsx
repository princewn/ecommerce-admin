import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Tree,
  message,
  Popconfirm,
  Card,
  Row,
  Col,
  Tag,
  Select,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SafetyOutlined,
} from '@ant-design/icons';
import { roleAPI } from '../services/api';
import { Role, Permission } from '../types';

const { Option } = Select;
const { TextArea } = Input;

const Permissions: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchRoles();
    fetchPermissions();
  }, []);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const data = await roleAPI.getRoles();
      setRoles(data);
    } catch (error: any) {
      message.error('获取角色列表失败：' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const fetchPermissions = async () => {
    try {
      const data = await roleAPI.getPermissions();
      setPermissions(data);
    } catch (error: any) {
      message.error('获取权限列表失败：' + (error.response?.data?.message || error.message));
    }
  };

  const handleAdd = () => {
    setEditingRole(null);
    setSelectedPermissions([]);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record: Role) => {
    setEditingRole(record);
    const permissionIds = record.permissions.map(p => p.id.toString());
    setSelectedPermissions(permissionIds);
    form.setFieldsValue({
      name: record.name,
      description: record.description,
    });
    setModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await roleAPI.deleteRole(id);
      message.success('删除成功');
      fetchRoles();
    } catch (error: any) {
      message.error('删除失败：' + (error.response?.data?.message || error.message));
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      // 过滤出权限ID（排除资源分组节点）
      const permissionIds = selectedPermissions
        .filter(key => permissions.some(p => p.id.toString() === key))
        .map(id => parseInt(id));

      if (permissionIds.length === 0) {
        message.error('请至少选择一个权限');
        return;
      }

      const submitData = {
        ...values,
        permissionIds,
      };

      if (editingRole) {
        await roleAPI.updateRole(editingRole.id, submitData);
        message.success('更新成功');
      } else {
        await roleAPI.createRole(submitData);
        message.success('创建成功');
      }
      setModalVisible(false);
      fetchRoles();
    } catch (error: any) {
      message.error('操作失败：' + (error.response?.data?.message || error.message));
    }
  };

  const handleTreeCheck = (checkedKeys: any) => {
    setSelectedPermissions(checkedKeys);
  };

  // 构建权限树数据
  const buildPermissionTree = () => {
    const permissionMap = new Map<string, Permission[]>();
    
    permissions.forEach(permission => {
      const resource = permission.resource || 'other';
      if (!permissionMap.has(resource)) {
        permissionMap.set(resource, []);
      }
      permissionMap.get(resource)!.push(permission);
    });

    return Array.from(permissionMap.entries()).map(([resource, perms]) => ({
      title: getResourceDisplayName(resource),
      key: resource,
      children: perms.map(perm => ({
        title: perm.description || perm.name,
        key: perm.id.toString(),
        permission: perm,
      })),
    }));
  };

  const getResourceDisplayName = (resource: string) => {
    const resourceMap: Record<string, string> = {
      USER: '用户管理',
      PRODUCT: '商品管理',
      ORDER: '订单管理',
      other: '其他',
    };
    return resourceMap[resource] || resource;
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: '权限数量',
      key: 'permissionCount',
      render: (_: any, record: Role) => record.permissions.length,
    },
    {
      title: '权限列表',
      dataIndex: 'permissions',
      key: 'permissions',
      render: (permissions: Permission[]) => (
        <Space wrap>
          {permissions.map(perm => (
            <Tag key={perm.id} color="blue">
              {perm.description || perm.name}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString('zh-CN'),
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (_: any, record: Role) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这个角色吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Card>
        <div style={{ marginBottom: 16 }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAdd}
          >
            添加角色
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={roles}
          rowKey="id"
          loading={loading}
        />
      </Card>

      <Modal
        title={editingRole ? '编辑角色' : '添加角色'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="name"
            label="角色名称"
            rules={[{ required: true, message: '请输入角色名称' }]}
          >
            <Input placeholder="请输入角色名称" />
          </Form.Item>

          <Form.Item
            name="description"
            label="角色描述"
          >
            <TextArea rows={3} placeholder="请输入角色描述" />
          </Form.Item>

          <Form.Item
            label="权限分配"
            required
          >
            <Tree
              checkable
              treeData={buildPermissionTree()}
              defaultExpandAll
              checkedKeys={selectedPermissions}
              onCheck={handleTreeCheck}
            />
            {selectedPermissions.length === 0 && (
              <div style={{ color: '#ff4d4f', fontSize: '12px', marginTop: '4px' }}>
                请选择权限
              </div>
            )}
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {editingRole ? '更新' : '创建'}
              </Button>
              <Button onClick={() => setModalVisible(false)}>
                取消
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Permissions; 