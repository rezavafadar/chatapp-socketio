import { Avatar, Card, Divider } from 'antd';
import styled from 'styled-components';
const { Meta } = Card;
const Time = styled.p`
  font-size: 12px;
  padding: 8px 6px;
`;
const CardStyled = styled(Card)`
  width: 100%;
  margin-top: 0;
  height: 13vh;
  background: #ebf4fb;
  cursor: pointer;
  border: none;
  border-radius: 0;
  transition: all 0.2s ease-in-out;
  &:hover {
    transition: all 0.5s ease-in-out;
    background: linear-gradient(279deg, #fff, #cce9ffb0);
  }
  .ant-card-meta {
    align-items: center;
  }
  .ant-card-meta-title {
    font-weight: 900;
    font-size: 18px;
  }
  .ant-card-meta-description {
    line-height: 13px;
    font-size: 12px;
    font-weight: bold;
  }
`;

const ChatList = () => {
  return (
    <>
      <CardStyled>
        <Meta
          avatar={
            <Avatar size="large" src="https://joeschmoe.io/api/v1/random" />
          }
          title="Elmar Johnsoon"
          description="This is the description"
        />
        <Time>
          {new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          })}
        </Time>

        <Divider
          style={{
            margin: '-14px 0',
          }}
        />
      </CardStyled>
    </>
  );
};

export default ChatList;
