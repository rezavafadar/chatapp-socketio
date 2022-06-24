import { Card, Input } from 'antd';
import styled from 'styled-components';

const CardStyled = styled(Card)`
  background: #e2eef7;
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
  const onSearch = (value) => console.log(value);
  return (
    <>
      <CardStyled>
        <Searchinput
          placeholder="Find your friend"
          onSearch={onSearch}
          allowClear
        />
      </CardStyled>
    </>
  );
};

export default SearchInput;
