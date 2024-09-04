import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import ProducerForm from "../../components/ProducerForm";
import '../../styles.css'
import {RootState} from "../../redux/store";
import {Producer} from "../../redux/types";
import {updateProducer} from "../../redux/slices/producerSlice";

const EditProducer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const producer = useSelector((state: RootState) =>
    state.producer.producers.find((p) => p.id === Number(id))
  );

  const handleUpdateProducer = (updatedProducer: Producer) => {
    dispatch(updateProducer(updatedProducer));
    navigate('/');
  };

  if (!producer) return <p>Produtor não encontrado</p>;

  return (
    <ProducerForm
      producer={producer}
      isEditMode={true}
      title="Editar Produtor"
      buttonText="Atualizar Produtor"
      onUpdateProducer={handleUpdateProducer}
    />
  );
};

export default EditProducer;
