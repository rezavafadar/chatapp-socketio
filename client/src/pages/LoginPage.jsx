import { Form, Input, Row, Col, Typography, Button } from 'antd';
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
`;
const LoginPage = () => {
  return (
    <>
      <Row>
        <Col span={12}>
          <FormStyled
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
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

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
