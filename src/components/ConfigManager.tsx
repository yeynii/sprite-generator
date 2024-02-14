import { ChangeEvent, Dispatch, SetStateAction, useRef } from "react";
import styled from "styled-components";
import { Config, Image } from "../App";
import Button from "./Button";

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
  const formRef = useRef<HTMLFormElement>(null);
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

  const handleResetButtonClick = () => {
    if (!formRef.current) return;
    formRef.current.reset();
    onReset();
  };

  return (
    <Container ref={formRef}>
      <ConfigInputs>
        <label>
          가로
          <input
            value={config.width}
            onChange={(e) => handleInputChange(e, "width")}
          />
          px
        </label>
        <label>
          세로
          <input
            value={config.height}
            onChange={(e) => handleInputChange(e, "height")}
          />
          px
        </label>
        <label>
          간격
          <input
            value={config.gap}
            onChange={(e) => handleInputChange(e, "gap")}
          />
          px
        </label>
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
        업로드할 이미지 선택
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileAddButtonClick}
        />
      </FileAddButton>
      <Button
        onClick={handleResetButtonClick}
        type="button"
        disabled={images.length === 0}
      >
        목록 초기화
      </Button>
    </Container>
  );
};
const Container = styled.form`
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
  gap: 5px;
  input {
    width: 2rem;
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

const FileAddButton = styled.label`
  background-color: #eeeeee;
  border: 1px solid gray;
  text-align: center;
  font-size: 1em;
  cursor: pointer;
  :hover {
    filter: brightness(0.9);
  }
  > input {
    opacity: 0;
    height: 0;
    width: 0;
  }
`;

export default ConfigManager;
