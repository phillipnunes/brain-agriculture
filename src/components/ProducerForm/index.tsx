import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {Form, Input, InputNumber, Button, Select, Col, Row} from 'antd';
import { cpf, cnpj } from 'cpf-cnpj-validator';
import '../../styles.css';
import { Producer } from "../../redux/types";

const { Option } = Select;

interface ProducerFormProps {
  producer?: Producer;
  isEditMode: boolean;
  title: string;
  buttonText: string;
  onAddProducer?: (producer: Producer) => void;
  onUpdateProducer?: (producer: Producer) => void;
}

const ProducerForm: React.FC<ProducerFormProps> = ({ producer, isEditMode, title, buttonText, onAddProducer, onUpdateProducer }) => {
  const validationSchema = Yup.object({
    cpfCnpj: Yup.string()
      .required('CPF/CNPJ é obrigatório')
      .test('cpf-cnpj-valid', 'CPF ou CNPJ inválido', function (value) {
        if (!value) return false;
        return cpf.isValid(value) || cnpj.isValid(value);
      }),
    producerName: Yup.string().required('O nome do produtor é obrigatório'),
    farmName: Yup.string().required('O nome da fazenda é obrigatório'),
    city: Yup.string().required('A cidade é obrigatória'),
    state: Yup.string().required('O estado é obrigatório'),
    totalArea: Yup.number().required('A área total é obrigatória').min(0, 'A área deve ser positiva'),
    arableArea: Yup.number()
      .required('A área agricultável é obrigatória')
      .min(0, 'A área deve ser positiva')
      .test('arable-check', 'A soma das áreas agricultável e de vegetação não pode exceder a área total', function (value) {
        return value + this.parent.vegetationArea <= this.parent.totalArea;
      }),
    vegetationArea: Yup.number()
      .required('A área de vegetação é obrigatória')
      .min(0, 'A área deve ser positiva')
      .test('vegetation-check', 'A soma das áreas agricultável e de vegetação não pode exceder a área total', function (value) {
        return value + this.parent.arableArea <= this.parent.totalArea;
      }),
    cultures: Yup.array().min(1, 'Pelo menos uma cultura deve ser selecionada'),
  });

  const formik = useFormik({
    initialValues: producer || {
      cpfCnpj: '',
      producerName: '',
      farmName: '',
      city: '',
      state: '',
      totalArea: 0,
      arableArea: 0,
      vegetationArea: 0,
      cultures: [] as string[],
    },
    validationSchema,
    onSubmit: (values) => {
      if (isEditMode && producer && onUpdateProducer) {
        console.log('ON UPDATE', { ...producer, ...values })
        onUpdateProducer({ ...producer, ...values });
      } else {
        const newProducer = { ...values, id: Math.random() };
        onAddProducer && onAddProducer(newProducer);
      }
    },
  });

  if (isEditMode && !producer) return <p>Produtor não encontrado</p>;

  return (
    <div className="container">
      <h2>{title}</h2>
      <Form layout="vertical" onFinish={formik.handleSubmit}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="CPF/CNPJ" validateStatus={formik.errors.cpfCnpj ? 'error' : ''} help={formik.errors.cpfCnpj}>
              <Input name="cpfCnpj" value={formik.values.cpfCnpj} onChange={formik.handleChange} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Nome do Produtor" validateStatus={formik.errors.producerName ? 'error' : ''} help={formik.errors.producerName}>
              <Input name="producerName" value={formik.values.producerName} onChange={formik.handleChange} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Nome da Fazenda" validateStatus={formik.errors.farmName ? 'error' : ''} help={formik.errors.farmName}>
              <Input name="farmName" value={formik.values.farmName} onChange={formik.handleChange} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Cidade" validateStatus={formik.errors.city ? 'error' : ''} help={formik.errors.city}>
              <Input name="city" value={formik.values.city} onChange={formik.handleChange} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Estado" validateStatus={formik.errors.state ? 'error' : ''} help={formik.errors.state}>
              <Input name="state" value={formik.values.state} onChange={formik.handleChange} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Área Total (hectares)" validateStatus={formik.errors.totalArea ? 'error' : ''} help={formik.errors.totalArea}>
              <InputNumber name="totalArea" value={formik.values.totalArea} onChange={(value) => formik.setFieldValue('totalArea', value)} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Área Arável (hectares)" validateStatus={formik.errors.arableArea ? 'error' : ''} help={formik.errors.arableArea}>
              <InputNumber name="arableArea" value={formik.values.arableArea} onChange={(value) => formik.setFieldValue('arableArea', value)} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Área de Vegetação (hectares)" validateStatus={formik.errors.vegetationArea ? 'error' : ''} help={formik.errors.vegetationArea}>
              <InputNumber name="vegetationArea" value={formik.values.vegetationArea} onChange={(value) => formik.setFieldValue('vegetationArea', value)} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Culturas" validateStatus={formik.errors.cultures ? 'error' : ''} help={formik.errors.cultures}>
              <Select
                mode="multiple"
                value={formik.values.cultures}
                onChange={(value) => formik.setFieldValue('cultures', value)}
              >
                <Option value="Soja">Soja</Option>
                <Option value="Milho">Milho</Option>
                <Option value="Algodao">Algodão</Option>
                <Option value="Cafe">Café</Option>
                <Option value="Cana-de-acucar">Cana-de-açúcar</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">{buttonText}</Button>
      </Form>
    </div>
  );
};

export default ProducerForm;
