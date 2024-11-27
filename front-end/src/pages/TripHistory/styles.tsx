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
const Msg = styled.h2`
    font-size: 18px;
    text-align: center;
    width: 70vw;
`
const ContainerRide = styled.form`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 85vw;
    height: 100%;
    padding: 10px;
    overflow: auto;
    @media (max-width: 980px) {
        flex-direction: column;
        align-items: center;
    }
`
const CardRide = styled.div`
    box-sizing: border-box;
    background-color: white;
    margin: 10px;
    padding: 15px;
    width: 330px;
    height: 100%;
    border-radius: 8px;
    h1 {
        font-weight: bold;
        font-size: 14px;
        color: #2e2e2e;
    }
    span {
        color: #27428d;
        font-weight: bold;
        font-size: 14px;
    }
    p {
        font-size: 14px;
        color: #494949;
    }
    @media (max-width: 980px) {
        width: 85%;
    }
`

export { Container, ContainerRide, Msg, CardRide }
