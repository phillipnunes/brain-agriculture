import React from 'react';
import ProducerForm from "../../components/ProducerForm";
import {addProducer} from "../../redux/slices/producerSlice";
import {Producer} from "../../redux/types";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";


const AddProducer: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddProducer = (producer: Producer) => {
    dispatch(addProducer(producer));
    navigate('/');
  };

  return (
    <ProducerForm
      isEditMode={false}
      title="Adicionar Produtor"
      buttonText="Adicionar Produtor"
      onAddProducer={handleAddProducer}
    />
  );
};

export default AddProducer;
