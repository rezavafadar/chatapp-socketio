import { Avatar, Card, Divider, Space, Tabs, Typography } from 'antd';
import {
  MessageOutlined,
  TeamOutlined,
  BellOutlined,
  SettingOutlined,
  LogoutOutlined,
  SmileTwoTone,
  HeartTwoTone,
  UserOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import SearchInput from './SearchInput';
import AllChat from './AllChat';
const { TabPane } = Tabs;

const TabsSyled = styled(Tabs)`
  .ant-tabs-nav {
    height: 92vh;
    background: rgb(43, 45, 58);
    color: #fff;
    border: none;
    position: relative;
  }
  .ant-tabs-tabpane {
    padding-left: 1px !important;
  }
  .ant-tabs-tab:hover {
    color: #b6b6b6;
  }
  .ant-tabs-tab {
    margin-top: 5rem;
  }
  .ant-tabs-ink-bar {
    background: #e44849;
  }
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #ea4b4b;
  }
`;
const CardStyled = styled(Card)`
  height: 10vh;
  background: #21232f;
  color: #fff;
  border: none;
  width: 164px;
  position: absolute;
  top: 43rem;
  border-radius: 0;
  .ant-card-body {
    padding-bottom: 0;
  }
`;
const Profile = styled(Card)`
  height: 9vh;
  background: rgb(43, 45, 58);
  color: #fff;

  border: none;
  width: 164px;
  position: absolute;
  top: 0rem;
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
          <AllChat />
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
      <Profile>
        <Space size="middle">
          <Avatar
            style={{ backgroundColor: '#87d068', marginLeft: -3 }}
            icon={<UserOutlined />}
          />
          <Typography style={{ fontSize: 12, width: '118%', color: '#fff' }}>
            User Name
          </Typography>
        </Space>
        <Divider style={{ background: 'rgb(255 255 255 / 37%)' }} />
      </Profile>
    </>
  );
};

export default SideBar;
