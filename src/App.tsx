import styled from "styled-components";
import ConfigManager from "./components/ConfigManager";
import Preview from "./components/Preview";

function App() {
  return (
    <Container>
      <Preview />
      <ConfigManager />
    </Container>
  );
}

const Container = styled.main`
  height: 100%;
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
`;

export default App;
