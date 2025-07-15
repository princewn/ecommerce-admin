import React from 'react';
import { Card, Row, Col, Typography, Space } from 'antd';
import { 
  DashboardOutlined, 
  ShoppingOutlined, 
  SafetyOutlined,
  UserOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const Home: React.FC = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: '数据看板',
      description: '查看销售数据、趋势分析和关键指标',
      icon: <DashboardOutlined style={{ fontSize: 48, color: '#1890ff' }} />,
      path: '/dashboard',
      color: '#1890ff',
    },
    {
      title: '商品管理',
      description: '管理商品信息、库存和分类',
      icon: <ShoppingOutlined style={{ fontSize: 48, color: '#52c41a' }} />,
      path: '/products',
      color: '#52c41a',
    },
    {
      title: '权限管理',
      description: '管理用户角色和权限分配',
      icon: <SafetyOutlined style={{ fontSize: 48, color: '#fa8c16' }} />,
      path: '/permissions',
      color: '#fa8c16',
    },
  ];

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  return (
    <div style={{ padding: 24 }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <Title level={1} style={{ color: '#1890ff', marginBottom: 16 }}>
          欢迎使用电商管理后台
        </Title>
        <Paragraph style={{ fontSize: 16, color: '#666' }}>
          高效管理您的电商业务，提供完整的数据分析和商品管理功能
        </Paragraph>
      </div>

      <Row gutter={[24, 24]} justify="center">
        {menuItems.map((item, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <Card
              hoverable
              style={{
                height: 200,
                textAlign: 'center',
                cursor: 'pointer',
                border: `2px solid ${item.color}`,
                borderRadius: 12,
              }}
              onClick={() => handleCardClick(item.path)}
            >
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                {item.icon}
                <div>
                  <Title level={3} style={{ color: item.color, marginBottom: 8 }}>
                    {item.title}
                  </Title>
                  <Paragraph style={{ color: '#666', margin: 0 }}>
                    {item.description}
                  </Paragraph>
                </div>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      <div style={{ marginTop: 48, textAlign: 'center' }}>
        <Title level={3} style={{ color: '#666', marginBottom: 16 }}>
          系统功能特点
        </Title>
        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} sm={12} md={8}>
            <Card size="small">
              <Space>
                <UserOutlined style={{ color: '#1890ff' }} />
                <span>用户友好的界面设计</span>
              </Space>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card size="small">
              <Space>
                <DashboardOutlined style={{ color: '#52c41a' }} />
                <span>实时数据监控</span>
              </Space>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card size="small">
              <Space>
                <SettingOutlined style={{ color: '#fa8c16' }} />
                <span>灵活的权限管理</span>
              </Space>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home; 