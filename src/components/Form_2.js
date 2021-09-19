import React, { Component } from "react";

import { Container, Row, Col, Form, Button } from "react-bootstrap";

export default class Form_2 extends Component {
  initialState = {
    email: "",
    password: "",
    confirmPassword: "",
    graduation: "",
    gender: "",
    languages: [],
    inputData: {
      graduations: ["Ön Lisans", "Lisans", "Yüksek Lisans"],
      genders: ["Erkek", "Kadın"],
      languages: ["Türkçe", "İngilizce", "Almanca", "Japonca"],
    },
    formSending: false,
    isLogin: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.initialState,
    };
  }

  inputChange = (e) => {
    if (e.target.type === "checkbox") {
      if (e.target.checked) {
        this.setState({
          [e.target.name]: this.state[e.target.name].concat([e.target.value]),
        });
      } else {
        this.setState({
          [e.target.name]: this.state[e.target.name].filter(
            (val) => val !== e.target.value
          ),
        });
      }
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  };

  formSubmit = (e) => {
    e.preventDefault();
    this.setState({
      formSending: true,
    });
    setTimeout(() => {
      this.setState({
        formSending: false,
        isLogin: true,
      });
    }, 1000);
  };

  clearForm = () => {
    this.setState({
      ...this.initialState,
    });
    this.userCreateForm.reset();
  };

  render() {
    let { isLogin, formSending } = this.state;
    return isLogin ? (
      <div>Hoş geldiniz</div>
    ) : formSending ? (
      <div>Giriş yapılıyor...</div>
    ) : (
      <Container>
        <Row>
          <Col></Col>
          <Col>
            <Form ref={(el) => (this.userCreateForm = el)}>
              <Form.Group>
                <Form.Label>Eposta Adresi</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.inputChange}
                  placeholder="E-posta giriniz..."
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Parola</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.inputChange}
                  placeholder="8-16 karakter parola giriniz..."
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Parola Tekrar</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={this.state.confirmPassword}
                  onChange={this.inputChange}
                  placeholder="Parolayı parola giriniz..."
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Mezuniyet</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue="DEFAULT"
                  onChange={this.inputChange}
                >
                  <option disabled value="DEFAULT">
                    Seçim yapınız...
                  </option>
                  {this.state.inputData.graduations.map((graduation) => (
                    <option
                      key={graduation}
                      name="graduation"
                      value={graduation}
                    >
                      {graduation}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Cinsiyet</Form.Label>
                {this.state.inputData.genders.map((gender) => (
                  <Form.Check
                    key={gender}
                    type="radio"
                    label={gender}
                    value={gender}
                    name="gender"
                    onChange={this.inputChange}
                  />
                ))}
              </Form.Group>

              <Form.Group>
                <Form.Label>Dil</Form.Label>
                {this.state.inputData.languages.map((language) => (
                  <Form.Check
                    key={language}
                    type="checkbox"
                    label={language}
                    value={language}
                    name="languages"
                    onChange={this.inputChange}
                  />
                ))}
              </Form.Group>

              <Button
                variant="secondary"
                className="mr-2"
                onClick={this.clearForm}
              >
                Temizle
              </Button>
              <Button variant="primary" type="submit">
                Kayıt Ol
              </Button>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    );
  }
}
