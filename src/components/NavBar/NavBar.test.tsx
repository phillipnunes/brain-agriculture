import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './index';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

describe('NavBar Component', () => {
  it('deve renderizar todos os itens do menu corretamente', () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Lista de Produtores')).toBeInTheDocument();
  });

  it('deve selecionar o item de menu "Dashboard" quando na rota "/dashboard"', () => {
    const history = createMemoryHistory();
    history.push('/dashboard');

    render(
      <Router location={history.location} navigator={history}>
        <NavBar />
      </Router>
    );

    expect(screen.getByText('Dashboard').closest('li')).toHaveClass('ant-menu-item-selected');
  });

  it('deve selecionar o item de menu "Lista de Produtores" quando na rota "/produtores"', () => {
    const history = createMemoryHistory();
    history.push('/produtores');

    render(
      <Router location={history.location} navigator={history}>
        <NavBar />
      </Router>
    );

    expect(screen.getByText('Lista de Produtores').closest('li')).toHaveClass('ant-menu-item-selected');
  });

  it('não deve selecionar nenhum item de menu para outras rotas', () => {
    const history = createMemoryHistory();
    history.push('/outra-rota');

    render(
      <Router location={history.location} navigator={history}>
        <NavBar />
      </Router>
    );

    // @ts-ignore
    expect(screen.queryByText('Dashboard').closest('li')).not.toHaveClass('ant-menu-item-selected');
    // @ts-ignore
    expect(screen.queryByText('Lista de Produtores').closest('li')).not.toHaveClass('ant-menu-item-selected');
  });
});
