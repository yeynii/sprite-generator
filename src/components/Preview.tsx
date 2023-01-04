import html2canvas from "html2canvas";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Config, Image } from "../App";
import Button from "./Button";

interface PreviewProps {
  images: Image[];
  config: Config;
}

const Preview = ({ images, config }: PreviewProps) => {
  const imageRef = useRef<HTMLDivElement>(null);
  const [sprite, setSprite] = useState<string | null>(null);
  const col = images.length;
  // const col = Math.ceil(
  //   Math.sqrt(config.width * config.height * images.length) / config.width
  // );

  useEffect(() => {
    if (images.length === 0) {
      setSprite(null);
      return;
    }
    if (!imageRef.current) return;

    html2canvas(imageRef.current, {
      scale: 1,
      width: imageRef.current.scrollWidth,
      height: imageRef.current.scrollHeight,
      backgroundColor: null
    }).then((canvas) => {
      setSprite(canvas.toDataURL("image/webp"));
    });
  }, [images, config]);

  const onDownload = () => {
    var link = document.createElement("a");
    link.download = "sprite.webp";
    link.href = sprite as string;
    document.body.appendChild(link);
    link.click();
  };

  return (
    <Container>
      <Sprite>
        <Grid col={col} config={config} ref={imageRef}>
          {images.map((image) => (
            <img
              width={config.width}
              height={config.height}
              key={image.src}
              src={image.src}
              alt={image.name}
            />
          ))}
        </Grid>
      </Sprite>
      <DownloadButton disabled={!sprite} onClick={onDownload} type="button">
        webp다운로드
      </DownloadButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
`;

const Sprite = styled.div`
  width: 400px;
  height: 400px;
  overflow: auto;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAACVJREFUKFNjPH78+H8GNGBpacmILsY4FBSiOxrEx+ZuDN8NQoUAvcgkr9zJV0kAAAAASUVORK5CYII=)
    repeat;
  border: 1px solid black;
`;

const Grid = styled.div<{ col: number; config: Config }>`
  width: fit-content;
  display: grid;
  grid-template-columns: repeat(
    ${({ col, config }) => `${col}, ${config.width}px`}
  );
  grid-gap: ${({ config }) => config.gap}px;
`;

const DownloadButton = styled(Button)`
  width: 100%;
`;

export default Preview;
