import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { SERVER_URL } from "../config";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedInActions } from "../reducers/is-logged-in";
function LoginForm() {
  const [loginId, setLoginId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const dispatch = useDispatch();

  const handleLoginUser = async (event) => {
    event.preventDefault();
    const userData = {
      id: loginId,
      password: loginPassword,
    };
    await axios
      .post(`${SERVER_URL}/user/login`, userData, { withCredentials: true })
      .then((response) => {
        alert(response.data.message);
        dispatch(isLoggedInActions.true());
        window.location.reload();
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };
  return (
    <Form onSubmit={(event) => handleLoginUser(event)}>
      <Form.Group className="mb-3" controlId="loginId">
        <Form.Label>ID</Form.Label>
        <Form.Control type="id" placeholder="Enter id" onChange={(e) => setLoginId(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="loginPw">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter password" onChange={(e) => setLoginPassword(e.target.value)} />
      </Form.Group>
      <Button variant="primary" type="submit">
        로그인
      </Button>
    </Form>
  );
}
function JoinForm() {
  const [joinEmail, setJoinEmail] = useState("");
  const [joinId, setJoinId] = useState("");
  const [joinPassword, setJoinPassword] = useState("");

  const handleJoinUser = async (event) => {
    event.preventDefault();
    const validateInput = (input) => {
      const regex = /^[a-zA-Z0-9!@#$%^&*()\-=_+{}[\]|;:'",.<>/?]+$/;
      if (input.length < 5 || input.length > 16) {
        return false;
      }
      if (!regex.test(input)) {
        return false;
      }
      return true;
    };
    if (!(validateInput(joinId) && validateInput(joinPassword))) {
      alert("5~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.");
      return;
    }
    const userData = {
      id: joinId,
      password: joinPassword,
      email: joinEmail,
    };
    await axios
      .post(`${SERVER_URL}/user/join`, userData)
      .then((response) => {
        alert(response.data.message);
        window.location.reload();
      })
      .catch((error) => {
        if (error.response.data) alert(error.response.data.message);
        else alert(error);
      });
  };
  return (
    <Form onSubmit={(event) => handleJoinUser(event)}>
      <Form.Group className="mb-3" controlId="joinEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={joinEmail} onChange={(e) => setJoinEmail(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="joinId">
        <Form.Label>ID</Form.Label>
        <Form.Control type="id" placeholder="Enter id" value={joinId} onChange={(e) => setJoinId(e.target.value)} />
        <Form.Text className="text-muted">5~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.</Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="joinPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter password" value={joinPassword} onChange={(e) => setJoinPassword(e.target.value)} />
        <Form.Text className="text-muted">5~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.</Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit">
        회원가입
      </Button>
    </Form>
  );
}
function LoginModal(props) {
  const [isLoginForm, setIsLoginForm] = React.useState(true);
  const handleJoinClick = () => {
    setIsLoginForm(false);
  };
  const handleLoginClick = () => {
    setIsLoginForm(true);
  };
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>{isLoginForm ? <h1>로그인</h1> : <h1>회원가입</h1>}</Modal.Header>
      <Modal.Body>
        {isLoginForm ? (
          <p>
            <LoginForm></LoginForm>
          </p>
        ) : (
          <p>
            <JoinForm></JoinForm>
          </p>
        )}
      </Modal.Body>
      <Modal.Footer>
        {isLoginForm ? <Button onClick={handleJoinClick}>회원가입 하러 가기</Button> : <Button onClick={handleLoginClick}>로그인 하러 가기</Button>}
        {/* <Button onClick={props.onHide}>Close</Button> */}
      </Modal.Footer>
    </Modal>
  );
}
function NavBar() {
  const [modalShow, setModalShow] = React.useState(false);
  const isLoggedIn = useSelector((state)=>state.isLoggedIn.data);
  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Cherb</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <>
              {isLoggedIn ? (
                <div>로그인확인</div>
              ) : (
                <Button variant="primary" onClick={() => setModalShow(true)}>
                  Login
                </Button>
              )}
              <LoginModal show={modalShow} onHide={() => setModalShow(false)} />
            </>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
