import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/2740956/pexels-photo-2740956.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const NavLink = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Message = styled.div`
  margin: 5px 0px;
  font-size: 12px;
`;

const DeliveryLogin = () => {
  const [fullname, setfullname] = useState("");
  const [phone, setphone] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://inventory-tracking.onrender.com/api/v1/delivery/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullname: fullname,
            phone: phone,
          }),
        }
      );
      const resJson = await res.json();
      if (res.status === 200) {
        console.log("authorized");
        const token = resJson.access_token;
        localStorage.setItem("access_token", token);
        history.push("/delivery/dashboard");
      } else {
        setMessage("PLEASE ENTER VALID CREDENTIALS.");
        console.log("not authorized");
        console.log(message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder="Name"
            type="text"
            value={fullname}
            onChange={(e) => setfullname(e.target.value)}
          />
          <Input
            placeholder="phone"
            type="phone"
            value={phone}
            onChange={(e) => setphone(e.target.value)}
          />
          <Button onClick={handleClick}>LOGIN</Button>
          <Link to="/register" style={{ textDecoration: "none" }}>
            <NavLink style={{ textDecoration: "none" }}>
              CREATE A NEW ACCOUNT
            </NavLink>
          </Link>
          <Message> {message} </Message>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default DeliveryLogin;
