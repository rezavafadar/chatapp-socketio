import { Card, Input } from 'antd';
import styled from 'styled-components';

const CardStyled = styled(Card)`
  background: #d1e3f0;
  border: none;
  border-radius: 0;
`;
const Searchinput = styled(Input)`
  border-radius: 5px;
  border-color: #cbcbcb;
  .ant-input {
    font-size: 13px;
    color: #000;
  }
`;

const SearchInput = () => {
  return (
    <>
      <CardStyled>
        <Searchinput placeholder="Find your friend" allowClear />
      </CardStyled>
    </>
  );
};

export default SearchInput;
