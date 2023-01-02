import styled from "styled-components";

const Preview = () => {
  return <Container>Preview</Container>;
};

const Container = styled.div`
  width: fit-content;
  min-width: 300px;
  height: fit-content;
  min-height: 300px;
  padding: 10px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAACVJREFUKFNjPH78+H8GNGBpacmILsY4FBSiOxrEx+ZuDN8NQoUAvcgkr9zJV0kAAAAASUVORK5CYII=)
    repeat;
`;

export default Preview;
