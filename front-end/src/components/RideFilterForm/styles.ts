import styled from 'styled-components'

const Form = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    @media (max-width: 980px) {
        flex-direction: column;
        height: 100%;
        width: 100%;
    }
`
const InputItem = styled.div`
    display: flex;
    align-items: center;
    margin: 0 25px;
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
    @media (max-width: 980px) {
        margin: 10px;
    }
`
const ButtonSubmit = styled.button`
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

export { Form, InputItem, ButtonSubmit }
