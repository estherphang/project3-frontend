import styled from "styled-components";

// Define a styled component for the container
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export default function Chat() {
  return (
    <>
      <Container>
        <img
          src="chat.png"
          style={{
            width: "70%",
            height: "auto",
          }}
        />
        <p>COMING SOON...</p>
      </Container>
    </>
  );
}
