import { Form, Input, Row, Col, Typography, Button } from 'antd';
import styled from 'styled-components';
const { Title } = Typography;
const Img = styled.img`
  width: 100%;
`;
const TitleStyled = styled(Title)`
  margin-left: 10rem;
  padding-bottom: 2rem;
`;
const LoginPage = () => {
  return (
    <>
      <Row>
        <Col span={12}>
          <Form
            style={{
              margin: '9rem',
            }}
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
            <TitleStyled level={2}>Log in</TitleStyled>
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
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            ></Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={12}>
          <Img src="https://later.com/images/img--waved__gradient.svg" />
        </Col>
      </Row>
    </>
  );
};

export default LoginPage;
