import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import { Menu } from 'antd';
import '../../styles.css'

const NavBar: React.FC = () => {
  const location = useLocation(); // Obtém a localização atual da rota

  const selectedKey = location.pathname.includes('dashboard')
    ? 'dashboard'
    : location.pathname.includes('produtores')
      ? 'producer-list'
      : '';

  return (
    <Menu mode="horizontal" className="container" selectedKeys={[selectedKey]}>
      <Menu.Item key="dashboard">
        <Link to="/dashboard">Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="producer-list">
        <Link to="/produtores">Lista de Produtores</Link>
      </Menu.Item>
    </Menu>
  );
};

export default NavBar;
