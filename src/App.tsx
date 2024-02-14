import { useState } from "react";
import styled from "styled-components";
import ConfigManager from "./components/ConfigManager";
import Preview from "./components/Preview";

export interface Image {
  name: string;
  size: number;
  type: string;
  src: string;
}

export interface Config {
  width: number;
  height: number;
  gap: number;
}

function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [config, setConfig] = useState<Config>({
    width: 50,
    height: 50,
    gap: 0
  });

  const addImages = (newImages: Image[]) => {
    setImages(newImages);
  };

  return (
    <Container>
      <Preview images={images} config={config} />
      <ConfigManager
        images={images}
        addImages={addImages}
        onReset={() => setImages([])}
        config={config}
        setConfig={setConfig}
      />
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
