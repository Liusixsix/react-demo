import styled from 'styled-components'


export const Top = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 20px;
  background: rgb(212, 68, 57); 
  & > span {
    line-height: 70px;
    color: #f1f1f1;
    font-size: 40px;
    &.iconfont {
      font-size: 45px;
    }
  }
`;

export const Tab = styled.div`
  height: 88px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background: rgb(212, 68, 57); 
  a {
    flex: 1;
    padding: 4px 0;
    font-size: 28px;
    color: #e4e4e4;
    text-decoration: none;
    &.selected {
      span {
        padding: 3px 0;
        font-weight: 700;
        color: #f1f1f1;
        border-bottom: 2px solid #f1f1f1;
      }
    }
  }
  `


export const TabItem = styled.div`
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;
