import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100vh;
    padding: 0 30px;
    color: white;
    font-family: sans-serif;
    gap: 50px;
    @media (max-width: 980px) {
        flex-direction: column-reverse;
        height: 100%;
        width: 100%;
        justify-content: center;
        padding: 0;
    }
`
const ContainerDrivers = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 40vw;
    min-height: 100vh;
    height: 100%;
    background-color: #00000086;
    padding: 0 30px;
    max-height: 100%;
    max-height: 100%; /* Garante que o conteúdo não ultrapasse a altura */
    overflow: auto;
    @media (max-width: 980px) {
        width: 75vw;
        padding: 15px;
        height: 100%;
    }
`
const TitleContainer = styled.h1`
    font-size: 28px;
    margin-bottom: 5px;
    font-weight: bold;
    text-align: center;
`
const CardDrive = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    gap: 10px;
    margin: 10px 0;
    background-color: white;
    border-radius: 5px;
    color: black;
    padding: 15px;
    overflow: hidden;

    h1 {
        font-weight: bold;
        font-size: 18px;
        color: #2e2e2e;
    }
    h2 {
        font-size: 16px;
        margin-top: 2px;
    }
    span {
        color: #27428d;
        font-weight: bold;
    }
    p {
        font-size: 12px;
        color: #494949;
        margin-top: 5px;
    }
    @media (max-width: 980px) {
        flex-direction: column;
        padding: 10px;
    }
`
const InfoDrive = styled.div`
    display: flex;
    flex-direction: column;
`
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
    @media (max-width: 980px) {
        font-size: 11px;
    }
`
const Info = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 400px;
    overflow: hidden;
    color: white;
    p {
        margin: 10px 0;

        font-size: 16px;
    }
    @media (max-width: 980px) {
        align-items: center;
        width: 100%;
    }
`
const SmallDynamicSize = styled.div`
    display: none;
    @media (max-width: 980px) {
        display: inline;
    }
`
const LargeDynamicSize = styled.div`
    display: inline;
    @media (max-width: 980px) {
        display: none;
    }
`

export { Container, ContainerDrivers, Info, LargeDynamicSize, SmallDynamicSize, CardDrive, InfoDrive, TitleContainer, ButtonHistory }
