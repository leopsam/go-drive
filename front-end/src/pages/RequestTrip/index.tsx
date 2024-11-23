import styled from "styled-components";

export default function Home() { 
  return (
      <ContainerBody>
        <div>          
          <Container>
            <p>BEM VINDO</p>
            <h1>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur interdum, nisl nunc feugiat ligula, vitae pulvinar turpis magna vel lacus. Sed non urna id libero ultrices faucibus. Aenean convallis sapien ac tortor consequat, in mollis lacus aliquet. Donec at erat a enim luctus vehicula. Vivamus quis eros sit amet mi suscipit cursus. Fusce viverra feugiat turpis, at convallis lacus rhoncus vel. Nulla facilisi. Praesent eget sollicitudin elit, non laoreet purus.
                Suspendisse potenti. Integer venenatis, orci a laoreet tristique, libero urna venenatis nunc, nec rhoncus erat nisl nec lorem. Sed vel orci quis enim suscipit scelerisque. Maecenas ut lacinia justo, ac aliquet risus. Nulla facilisi. Etiam id sem a libero tincidunt vehicula. Nam faucibus ex vel velit tempor, sed pretium nunc posuere. Ut fringilla risus sed massa tristique, sit amet efficitur libero fringilla. Mauris tincidunt libero sed ultricies accumsan. Aliquam nec sapien nec odio accumsan volutpat non nec est. Cras feugiat leo sit amet velit vehicula, a consectetur enim rhoncus.
            </h1>
            <button>
              ENVIAR
            </button>
          </Container>
        </div>
      </ContainerBody>  
  );
}
const ContainerBody = styled.div`
  width: 100vw;
`;
const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  background-color: #00000086;
  padding: 20px;
  @media (max-width: 768px) {
    width: 80%;
  }

  h1 {
    font-family: "Montserrat", sans-serif;
    font-size: 16px;
    color: #ffffff;
    @media (max-width: 768px) {
      font-size: 20px;
      line-height: 20px;
    }
  }
  p {
    font-family: "Montserrat", sans-serif;
    font-size: 16px;
    color: #ffffff;   
  }
  button {
    background-color: #d6a233;
    color: #dadada;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    margin: 0 30px;
    font-family: "Montserrat", sans-serif;
    font-size: 14px;
    line-height: 20px;
    color: #ffffff;
    cursor: pointer;
    @media (max-width: 768px) {
      font-size: 12px;
      line-height: 20px;
    }
  }
`;