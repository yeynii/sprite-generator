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

export interface Size {
  width: number;
  height: number;
}

function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });

  const addImages = (newImages: Image[]) => {
    console.log(newImages);
    setImages(newImages);
  };

  return (
    <Container>
      <Preview />
      <ConfigManager
        images={images}
        addImages={addImages}
        onReset={() => setImages([])}
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
