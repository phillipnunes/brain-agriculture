import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProducerForm from './index';
import { Producer } from "../../redux/types";

describe('ProducerForm', () => {
  const mockAddProducer = jest.fn();
  const mockUpdateProducer = jest.fn();

  const existingProducer: Producer = {
    id: 1,
    cpfCnpj: '587.342.040-83',
    producerName: 'John Doe',
    farmName: 'Colheita Feliz',
    city: 'Sorocaba',
    state: 'SP',
    totalArea: 150,
    arableArea: 100,
    vegetationArea: 50,
    cultures: ['Soja', 'Milho'],
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar o formulário corretamente no modo de adição', () => {
    render(
      <ProducerForm
        isEditMode={false}
        title="Adicionar Produtor"
        buttonText="Adicionar"
        onAddProducer={mockAddProducer}
        onUpdateProducer={mockUpdateProducer}
      />
    );

    expect(screen.getByText('Adicionar Produtor')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Adicionar' })).toBeInTheDocument();
  });

  it('deve renderizar o formulário corretamente no modo de edição', () => {
    render(
      <ProducerForm
        producer={existingProducer}
        isEditMode={true}
        title="Editar Produtor"
        buttonText="Atualizar"
        onAddProducer={mockAddProducer}
        onUpdateProducer={mockUpdateProducer}
      />
    );

    expect(screen.getByText('Editar Produtor')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Atualizar' })).toBeInTheDocument();
  });

  it('deve mostrar mensagens de erro para campos obrigatórios não preenchidos', async () => {
    render(
      <ProducerForm
        isEditMode={false}
        title="Adicionar Produtor"
        buttonText="Adicionar"
        onAddProducer={mockAddProducer}
        onUpdateProducer={mockUpdateProducer}
      />
    );

    fireEvent.click(screen.getByText('Adicionar'));

    expect(await screen.findByText('CPF/CNPJ é obrigatório')).toBeInTheDocument();
    expect(await screen.findByText('O nome do produtor é obrigatório')).toBeInTheDocument();
    expect(await screen.findByText('O nome da fazenda é obrigatório')).toBeInTheDocument();
  });
});
