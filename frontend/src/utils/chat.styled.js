import styled from "styled-components";
export const Page = styled.div`
  display: flex;
  height: 90vh;
  width: 100%;
  align-items: center;
  // background-color: #46516e;
  flex-direction: column;
`;
export const MyRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  position: relative;
  // background-color: grey;
  // flex-direction: column; dia dekha lagbe kaj hoy naki pore diye
`;

export const MyMessage = styled.div`
  width: 45%;
  background-color: grey;
  color: white;
  padding: 10px;
  margin-right: 5px;
  text-align: center;
  border-radius: 10px 1px;
  position: relative;
`;
export const PartnerRow = styled(MyRow)`
  justify-content: flex-start;
`;

export const PartnerMessage = styled.div`
  width: 45%;
  background-color: grey;
  color: white;
  padding: 10px;
  margin-left: 5px;
  text-align: center;
  border-radius: 10px 1px;
  position: relative;
`;

export const MyName = styled.div`
  font-size: 12px;
  display: inline-flex;
  color: black;
  position: absolute;
  top: 50px;
  margin-right: 10px;
`;
export const PartnerName = styled.div`
  font-size: 12px;
  display: inline-flex;
  color: black;
  position: absolute;
  top: 50px;
  margin-left: 10px;
`;
export const FName = styled.div`
  font-size: 12px;
  display: inline-flex;
  color: black;
  position: absolute;
  top: 25.5rem;
  margin-right: 10px;
`;
export const PartnerFName = styled.div`
  font-size: 12px;
  display: inline-flex;
  color: black;
  position: absolute;
  top: 25.5rem;
  margin-left: 10px;
`;
export const Input = styled.input`
  margin-top: 10px;
  padding-top: 10px;
  display: block;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 700px;
  max-height: 700px;
  overflow: auto;
  width: 800px;
  border: 1px solid lightgray;
  border-radius: 10px;
  padding-bottom: 10px;
`;

export const TextArea = styled.textarea`
  width: 800px;
  height: 60px;
  border-radius: 10px;
  margin-top: 10px;
  padding-top: 10px;
  font-size: 17px;
  background-color: transparent;
  border: 1px solid lightgray;
  outline: none;
  overflow: hidden;
  color: black;
  letter-spacing: 1px;
  ::placeholder {
    color: lightgray;
  }
`;

export const Button = styled.button`
  background-color: #04aa6d;
  border: none;
  color: white;
  padding: 16px 32px;
  text-decoration: none;
  margin: 4px 2px;
  cursor: pointer;
`;

export const Form = styled.form`
  width: 800px;
  display: grid;
`;

export const Item = styled.div`
  display: flex,
  justify-content: center,
  align-items: center,
  height: 250px,
  width: 100%,
  color: #fff,
  margin: 0 15px,
  font-size: 4em,
`;
