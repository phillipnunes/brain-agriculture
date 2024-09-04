import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Producer } from '../types';

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

interface ProducerState {
  producers: Producer[];
}

const initialState: ProducerState = {
  producers: [
    {
      id: 1,
      cpfCnpj: '676.368.100-34',
      producerName: 'John Doe',
      farmName: 'Colheita Feliz',
      city: 'Sorocaba',
      state: 'SP',
      totalArea: 150,
      arableArea: 100,
      vegetationArea: 50,
      cultures: ['Soja', 'Milho'],
    },
    {
      id: 2,
      cpfCnpj: '31.925.214/0001-00',
      producerName: 'Jane Smith',
      farmName: 'Acres do Sol',
      city: 'Minas Gerais',
      state: 'MG',
      totalArea: 200,
      arableArea: 150,
      vegetationArea: 50,
      cultures: ['Algodao', 'Cafe'],
    },
  ],
};

const producerSlice = createSlice({
  name: 'producer',
  initialState,
  reducers: {
    addProducer(state, action: PayloadAction<Producer>) {
      state.producers.push(action.payload);
    },
    updateProducer(state, action: PayloadAction<Producer>) {
      const index = state.producers.findIndex(producer => producer.id === action.payload.id);
      if (index !== -1) {
        state.producers[index] = action.payload;
      }
    },
    deleteProducer(state, action: PayloadAction<number>) {
      state.producers = state.producers.filter(producer => producer.id !== action.payload);
    },
  },
});

// Selectors para calcular os valores derivados
export const selectCalculatedData = (state: { producer: ProducerState }) => {
  const { producers } = state.producer;

  //Total de fazendas
  const totalFarms = producers.length;

  // Total da área
  const totalArea = producers.reduce((acc, currentValue) => {
    return acc + currentValue.totalArea;
  }, 0);

  // Fazendas por estado
  const farmsByState = producers
    .map(producer => ({
      color: getRandomColor(),
      value: 1,
      state: producer.state,
    }))
    .filter((item, index, self) => index === self.findIndex((t) => t.state === item.state));

  // Culturas únicas
  const onlyCultures = producers.map(producer => producer.cultures);
  const cultures = [...new Set(onlyCultures.flat())];

  // Fazendas por cultura
  const farmsByCulture = cultures.map(culture => ({
    color: getRandomColor(),
    value: 1,
    culture,
  }));

  // Distribuição de uso do solo
  const landUseDistribution = [
    {
      type: 'Arável',
      value: producers.reduce((acc, currentValue) => acc + currentValue.arableArea, 0),
      color: '#8884d8',
    },
    {
      type: 'Vegetação',
      value: producers.reduce((acc, currentValue) => acc + currentValue.vegetationArea, 0),
      color: '#82ca9d',
    },
  ];

  return {
    totalArea,
    farmsByState,
    farmsByCulture,
    landUseDistribution,
    totalFarms
  };
};

export const { addProducer, updateProducer, deleteProducer } = producerSlice.actions;
export default producerSlice.reducer;
