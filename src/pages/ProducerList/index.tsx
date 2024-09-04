import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table, Space } from 'antd';
import { RootState, AppDispatch } from '../../redux/store';
import { deleteProducer } from '../../redux/slices/producerSlice';
import { useNavigate } from 'react-router-dom';
import '../../styles.css'

const ProducerList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const producers = useSelector((state: RootState) => state.producer.producers);

  const handleDelete = (id: number) => {
    dispatch(deleteProducer(id));
  };

  const handleEdit = (id: number) => {
    navigate(`/editar-produtor/${id}`);
  };

  const columns = [
    { title: 'CPF/CNPJ', dataIndex: 'cpfCnpj', key: 'cpfCnpj' },
    { title: 'Nome do Produtor', dataIndex: 'producerName', key: 'producerName' },
    { title: 'Nome da Fazenda', dataIndex: 'farmName', key: 'farmName' },
    { title: 'Cidade', dataIndex: 'city', key: 'city' },
    { title: 'Estado', dataIndex: 'state', key: 'state' },
    { title: 'Área Total (ha)', dataIndex: 'totalArea', key: 'totalArea' },
    { title: 'Área Arável (ha)', dataIndex: 'arableArea', key: 'arableArea' },
    { title: 'Área de vegetação (ha)', dataIndex: 'vegetationArea', key: 'vegetationArea' },
    {
      title: 'Ações',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record.id)}>Editar</Button>
          <Button danger onClick={() => handleDelete(record.id)}>Deletar</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="container">
      <h2>Lista de Produtores</h2>
      <Button type="primary" onClick={() => navigate('/adicionar-produtor')}>
        Adicionar Produtor
      </Button>
      <Table dataSource={producers} columns={columns} rowKey="id" />
    </div>
  );
};

export default ProducerList;
