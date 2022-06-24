import { Col, Row } from 'antd';
import React from 'react';
import SideBar from '../componets/SideBar';

const HoemPage = () => {
  return (
    <>
      <Row>
        <Col span={8}>
          <SideBar />
        </Col>
        <Col span={16}>col-8</Col>
      </Row>
    </>
  );
};

export default HoemPage;
