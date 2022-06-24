import { Card, Space, Tabs } from 'antd';
import {
  MessageOutlined,
  TeamOutlined,
  BellOutlined,
  SettingOutlined,
  LogoutOutlined,
  SmileTwoTone,
  HeartTwoTone,
} from '@ant-design/icons';
import styled from 'styled-components';
import SearchInput from './SearchInput';
const { TabPane } = Tabs;

const TabsSyled = styled(Tabs)`
  .ant-tabs-nav {
    height: 92vh;
    background: rgb(43, 45, 58);
    color: #fff;
    border: none;
  }
  .ant-tabs-tabpane {
    padding-left: 1px !important;
  }
  .ant-tabs-tab:hover {
    color: #b6b6b6;
  }
  .ant-tabs-ink-bar {
    background: #e44849;
  }
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #ea4b4b;
  }
`;
const CardStyled = styled(Card)`
  height: 8vh;
  background: #21232f;
  color: #fff;
  border: none;
  width: 164px;
  border-radius: 0;
  .ant-card-body {
    padding-bottom: 0;
  }
`;
const SideBar = () => {
  return (
    <>
      <TabsSyled tabPosition="left">
        <TabPane
          tab={
            <>
              <MessageOutlined
                style={{
                  paddingLeft: 1,
                  fontSize: 17,
                  marginTop: 18,
                }}
              />
              Chat Room
            </>
          }
          key="1"
        >
          <SearchInput />
        </TabPane>
        <TabPane
          tab={
            <>
              <TeamOutlined
                style={{
                  paddingLeft: 1,
                  fontSize: 17,
                }}
              />
              Friends
            </>
          }
          key="2"
        >
          Friends
        </TabPane>
        <TabPane
          tab={
            <>
              <SettingOutlined
                style={{
                  paddingLeft: 1,
                  fontSize: 17,
                }}
              />
              Settings
            </>
          }
          key="3"
        >
          Settings
        </TabPane>
        <TabPane
          tab={
            <>
              <BellOutlined
                style={{
                  paddingLeft: 1,
                  fontSize: 17,
                }}
              />
              Notification
            </>
          }
          key="4"
        >
          Notification
        </TabPane>
        <TabPane
          tab={
            <>
              <LogoutOutlined
                style={{
                  paddingLeft: 1,
                  fontSize: 17,
                }}
              />
              Log Out
            </>
          }
          key="5"
        >
          Log Out
        </TabPane>
      </TabsSyled>
      <CardStyled>
        <Space
          style={{
            marginLeft: 19,
          }}
          size="large"
        >
          <SmileTwoTone />
          <HeartTwoTone twoToneColor="#eb2f96" />
        </Space>
      </CardStyled>
    </>
  );
};

export default SideBar;
