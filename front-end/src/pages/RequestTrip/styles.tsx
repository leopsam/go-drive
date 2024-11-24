import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 0 30px;
  color: white;
  font-family: sans-serif;
  gap: 50px;
`;
const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40vw; 
  height: 100vh; 
  background-color: #00000086;
  padding: 0 30px;
`;
const TitleContainer = styled.h1`
  font-size: 28px;
  margin-bottom: 5px;
  font-weight: bold;
`;
const InputItem = styled.div`
  display: flex; 
  width: 100%;
  flex-direction: column;
  gap: 5px;
  margin: 10px 0;
  label {
    font-size: 14px;
    margin-left: 10px;
  }
  input {
    background-color: white;
    border-radius: 50px;
    padding: 12px;
    font-size: 12px;
    border-color: #d3d3d3;
}
`;
const ButtonForm = styled.button`
  background-color: #26ac84;
  margin: 17px 0;
  border: none;
  border-radius: 50px;
  padding: 10px 20px;
  width: 100%;
  font-size: 16px;
  line-height: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #007552;
  }
  &:active {
    background-color: #5c947d;
  }
`;
const ButtonHistory = styled.button`
  background-color: #26ac84;
  margin: 17px 0;
  border: none;
  border-radius: 50px;
  padding: 10px 20px;
  font-size: 16px;
  line-height: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #007552;
  }
  &:active {
    background-color: #5c947d;
  }
`;
const Info = styled.div`
  text-align: left;
  width: 30vw;
  border-radius: 8px;
  color: white;
  p{
    margin: 10px 0;
    line-height: 20px;
    font-size: 16px;
  }
`;


export {
    Container,
    Form,
    Info,
    InputItem,
    ButtonForm,
    TitleContainer,ButtonHistory
}