import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 50px 30px;
    color: white;
    font-family: sans-serif;
    gap: 50px;
`
const TitleContainer = styled.h1`
    font-size: 28px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 5px;
`
const Msg = styled.h2`
    font-size: 18px;
    text-align: center;
    width: 70vw;
`
const ButtonHistory = styled.button`
    background-color: #26ac84;
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
    @media (max-width: 980px) {
        font-size: 11px;
    }
`
const Form = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
    //background-color: red;
    padding: 10px;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
`
const InputItem = styled.div`
    display: flex;
    align-items: center;
    margin: 0 25px;
    //background-color: green;

    label {
        font-size: 16px;
    }
    input {
        background-color: white;
        border-radius: 50px;
        padding: 12px;
        font-size: 12px;
        border-color: white;
    }
    select {
        background-color: white;
        border-radius: 50px;
        padding: 12px;
        font-size: 12px;
        border-color: white;
    }
`
const ContainerRide = styled.form`
    display: flex;
    justify-content: center;
    width: 85vw;
    height: 100%;
    background-color: #00000086;
    padding: 10px;
    overflow: auto;
`
const CardRide = styled.div`
    background-color: white;
    margin: 10px;
    padding: 15px;
    width: 330px;
    height: 200px;
    border-radius: 8px;
    h1 {
        font-weight: bold;
        font-size: 16px;
        color: #2e2e2e;
    }
    span {
        color: #27428d;
        font-weight: bold;
        font-size: 16px;
    }
    p {
        font-size: 16px;
        color: #494949;
    }
    @media (max-width: 980px) {
        flex-direction: column;
        padding: 10px;
    }
`

export { Container, ContainerRide, InputItem, Form, Msg, CardRide, TitleContainer, ButtonHistory }
