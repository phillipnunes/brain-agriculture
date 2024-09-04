import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store'
import Dashboard from './pages/Dashboard';
import ProducerList from './pages/ProducerList';
import AddProducer from './pages/AddProducer';
import EditProducer from './pages/EditProducer';
import NavBar from './components/NavBar';

const App: React.FC = () => {
  return (
    <Provider store={store}>
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/produtores" element={<ProducerList />} />
        <Route path="/adicionar-produtor" element={<AddProducer />} />
        <Route path="/editar-produtor/:id" element={<EditProducer />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
    </Provider>
  );
};

export default App;
