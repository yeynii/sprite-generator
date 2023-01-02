import { ChangeEvent, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { Config, Image } from "../App";

interface ConfigManagerProps {
  images: Image[];
  addImages: (newImages: Image[]) => void;
  onReset: () => void;
  config: Config;
  setConfig: Dispatch<SetStateAction<Config>>;
}

const ConfigManager = ({
  images,
  addImages,
  onReset,
  config,
  setConfig
}: ConfigManagerProps) => {
  const handleFileAddButtonClick = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as FileList;
    const images = [];
    for (const file of files) {
      images.push({
        name: file.name,
        size: file.size,
        type: file.type,
        src: URL.createObjectURL(file)
      });
    }
    addImages(images);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    type: keyof Config
  ) => {
    const { value } = e.target;
    setConfig((prev) => {
      const updated = { ...prev, [type]: value };
      return updated;
    });
  };

  return (
    <Container>
      <ConfigInputs>
        <label>가로</label>
        <input
          value={config.width}
          onChange={(e) => handleInputChange(e, "width")}
        />
        px
        <label> 세로</label>
        <input
          value={config.height}
          onChange={(e) => handleInputChange(e, "height")}
        />
        px
        <label> 간격</label>
        <input
          value={config.gap}
          onChange={(e) => handleInputChange(e, "gap")}
        />
        px
      </ConfigInputs>
      <ImageList>
        {images.map((image) => (
          <li key={image.src}>
            <img src={image.src} width="30" height="30" alt={image.name} />
            <span>{image.name}</span>
          </li>
        ))}
      </ImageList>
      <Count>{images.length}개</Count>
      <FileAddButton>
        <label htmlFor="image_uploads">업로드할 이미지 선택</label>
        <input
          id="image_uploads"
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleFileAddButtonClick(e)}
        />
      </FileAddButton>
      <button onClick={onReset}>초기화</button>
    </Container>
  );
};
const Container = styled.div`
  background-color: #dddddd;
  display: flex;
  flex-direction: column;
  width: fit-content;
  max-width: 400px;
  height: fit-content;
  padding: 10px;
  border: 1px solid black;
  gap: 10px;
`;

const ConfigInputs = styled.div`
  display: flex;
  flex-direction: row;
  > input {
    width: 3rem;
    text-align: right;
  }
`;

const Count = styled.span`
  text-align: right;
`;

const ImageList = styled.ul`
  background-color: white;
  height: 300px;
  overflow-y: scroll;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  > li {
    display: flex;
    align-items: center;
    gap: 10px;
    border-bottom: 1px solid gray;
    :last-child {
      border-bottom: none;
    }
  }
`;

const FileAddButton = styled.button`
  > input {
    opacity: 0;
    height: 0;
    width: 0;
  }
`;

export default ConfigManager;
