import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Spin, message } from 'antd';
import { 
  DollarOutlined, 
  ShoppingCartOutlined, 
  RiseOutlined, 
  UserOutlined 
} from '@ant-design/icons';
// import { Line, Pie } from '@ant-design/plots';
import { dashboardAPI } from '../services/api';
import { DashboardData } from '../types';

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const data = await dashboardAPI.getDashboardData();
      setDashboardData(data);
    } catch (error: any) {
      message.error('获取数据失败：' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: 50 }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!dashboardData) {
    return <div>暂无数据</div>;
  }

  // 销售趋势图配置 - 暂时禁用
  // const salesTrendConfig = {
  //   data: dashboardData.salesTrends,
  //   xField: 'date',
  //   yField: 'amount',
  //   smooth: true,
  //   animation: {
  //     appear: {
  //       animation: 'path-in',
  //       duration: 1000,
  //     },
  //   },
  //   color: '#1890ff',
  //   point: {
  //     size: 5,
  //     shape: 'diamond',
  //   },
  //   label: {
  //     style: {
  //       fill: '#aaa',
  //     },
  //   },
  // };

  // 品类占比图配置 - 暂时禁用
  // const categoryPieConfig = {
  //   data: dashboardData.categoryData,
  //   angleField: 'count',
  //   colorField: 'category',
  //   radius: 0.8,
  //   label: {
  //     type: 'outer',
  //     content: '{name} {percentage}',
  //   },
  //   interactions: [
  //     {
  //       type: 'element-active',
  //     },
  //   ],
  // };

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ marginBottom: 24 }}>数据看板</h1>
      
      {/* 关键指标 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="总销售额"
              value={dashboardData.totalSales}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<DollarOutlined />}
              suffix="元"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="订单总数"
              value={dashboardData.totalOrders}
              valueStyle={{ color: '#1890ff' }}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="同比增长"
              value={dashboardData.growthRate}
              precision={1}
              valueStyle={{ color: '#cf1322' }}
              prefix={<RiseOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="转化率"
              value={dashboardData.conversionRate}
              precision={1}
              valueStyle={{ color: '#722ed1' }}
              prefix={<UserOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>

      {/* 数据展示区域 */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="销售趋势数据">
            <div style={{ maxHeight: 300, overflowY: 'auto' }}>
              {dashboardData.salesTrends.map((trend, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  padding: '8px 0',
                  borderBottom: index < dashboardData.salesTrends.length - 1 ? '1px solid #f0f0f0' : 'none'
                }}>
                  <span>{trend.date}</span>
                  <span style={{ fontWeight: 'bold', color: '#1890ff' }}>
                    ¥{trend.amount.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="品类占比数据">
            <div>
              {dashboardData.categoryData.map((category, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  padding: '8px 0',
                  borderBottom: index < dashboardData.categoryData.length - 1 ? '1px solid #f0f0f0' : 'none'
                }}>
                  <span>{category.category}</span>
                  <span style={{ fontWeight: 'bold', color: '#52c41a' }}>
                    {category.count} ({category.percentage.toFixed(1)}%)
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      {/* 订单状态统计 */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24}>
          <Card title="订单状态统计">
            <Row gutter={[16, 16]}>
              {dashboardData.orderStatusData.map((item, index) => (
                <Col xs={12} sm={6} md={4} key={index}>
                  <Card size="small">
                    <Statistic
                      title={item.status}
                      value={item.count}
                      valueStyle={{ color: '#1890ff' }}
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard; 