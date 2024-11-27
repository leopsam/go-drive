import styled from 'styled-components'

const StyledButton = styled.button`
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

export { StyledButton }
