import React from 'react';
import { useSelector } from 'react-redux';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Card, Row, Col } from 'antd';
import { selectCalculatedData } from '../../redux/slices/producerSlice';
import '../../styles.css'

const Dashboard: React.FC = () => {
  const { totalArea, farmsByState, farmsByCulture, landUseDistribution, totalFarms } = useSelector(selectCalculatedData);

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <>
        <Row gutter={16} style={{ marginBottom: 8 }} >
          <Col span={4}>
            <Card title="Total de fazendas" bordered={false}>
              {totalFarms}
            </Card>
          </Col>
          <Col span={4}>
            <Card title="Área Total (ha)" bordered={false}>
              {totalArea}
            </Card>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Fazendas por estado" bordered={false}>
              <PieChart width={400} height={300}>
                <Pie data={farmsByState} dataKey="value" nameKey="state" cx="50%" cy="50%" outerRadius={100} fill="#82ca9d">
                  {farmsByState.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Fazendas por cultura" bordered={false}>
              <PieChart width={400} height={300}>
                <Pie data={farmsByCulture} dataKey="value" nameKey="culture" cx="50%" cy="50%" outerRadius={100} fill="#8884d8">
                  {farmsByCulture.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Distribuição do Uso do Solo" bordered={false}>
              <PieChart width={400} height={300}>
                <Pie data={landUseDistribution} dataKey="value" nameKey="type" cx="50%" cy="50%" outerRadius={100} fill="#ffc658">
                  {landUseDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </Card>
          </Col>
        </Row>
      </>
    </div>
  );
};

export default Dashboard;
