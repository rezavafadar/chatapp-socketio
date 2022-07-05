import { Form, Input, Row, Col, message, Typography, Button } from 'antd';
import { useState } from 'react';
import OtpInput from 'react-otp-input';

import styled from 'styled-components';
const { Title } = Typography;
const Img = styled.img`
  width: 100%;
`;
const TitleStyled = styled(Title)`
  margin-left: 9rem;
  padding-bottom: 1rem;
  font-weight: bold;
  font-size: 38px;
  line-height: 0.23;
`;
const FormStyled = styled(Form)`
  margin: 9rem;
  padding: 40px 73px 22px 0px;
  box-shadow: 8px 8px 17px 5px #ddd;
  width: 66%;
`;
const ButtonStyled = styled(Button)`
  padding: 0px 26px;
  height: 39px;
  border: none;
  border-radius: 3px;
  margin-top: 12px;
  margin-left: 3rem;
`;
const OtpStyled = styled(OtpInput)`
  input {
    width: 3rem !important;
    height: 3rem;
    margin: 1rem 1rem;
    font-size: 2rem;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.3);
  }
`;
const LoginPage = () => {
  const [isSubmited, setIsSumbited] = useState(false);
  const [otpInput, setOtpInput] = useState(null);
  const onFinish = (values) => {
    console.log('Success:', values);
    message.success('The verification code has been sent to you successfully');
    setIsSumbited(true);
  };

  return (
    <>
      <Row>
        <Col span={12}>
          <FormStyled
            onFinish={onFinish}
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
          >
            {!isSubmited ? (
              <>
                <TitleStyled>Sing in</TitleStyled>
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your username!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      type: 'email',
                      required: true,
                      message: 'Please insert your email',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </>
            ) : (
              <>
                <Title
                  type="secondary"
                  style={{
                    textAlign: 'right',
                    fontSize: '17px',
                  }}
                >
                  Please check your email and enter the code
                </Title>
                <OtpStyled
                  value={otpInput}
                  onChange={(otp) => setOtpInput(otp)}
                  numInputs={6}
                  separator={<span>-</span>}
                />
              </>
            )}

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <ButtonStyled type="danger" htmlType="submit">
                Sing in
              </ButtonStyled>
            </Form.Item>
          </FormStyled>
        </Col>
        <Col span={12}>
          <Img src="https://later.com/images/img--waved__gradient.svg" />
        </Col>
      </Row>
    </>
  );
};

export default LoginPage;
