import React from 'react';
import { useState, useCallback } from 'react';
import firebase from 'firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, FormGroup, Label, Input, Button, Modal, FormFeedback } from 'reactstrap';
import { ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';

import '../css/login.css'

import { db, storage } from '../utils/Firebase.js';

function Icon(props) {
  const [loaded, setLoaded] = useState(false);
  const onload = () => {
    setLoaded(true)
  }
  return (
      <img
        onLoad={onload}
        src={props.url}
        className="select-icon"
        onClick={props.func.bind(this, props.url)}
        {...props}
      />
  )
}
class Login extends React.Component {
  constructor(props) {
    super (props);
    this.state = {
      modalOpen: false,
      iconSrc: "",
      iconTag: []
    };

    this.openModal = this.openModal.bind(this);
    this.selectIcon = this.selectIcon.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }
  openModal = () => {
    this.setState(
      { modalOpen: true }
    );
  }
  selectIcon = (src) => {
    this.setState(
      { modalOpen: false,
      iconSrc: src}
    );

  }

  componentDidMount() {
    console.log("did mount");

    let iconList = [];
    let initialIcon = "";
    let list = [];
    let counter = 0;
    storage.ref("img/icons/").listAll()
    .then((result) => {
      result.items.forEach((image) => {
        image.getDownloadURL()
        .then((uri) => {
          initialIcon = uri;
          list.push(<img key={uri} src={uri} className="select-icon" onClick={this.selectIcon.bind(this, uri)} />);
        })
        .then(() => {
          this.setState({
            iconSrc: initialIcon
          });
        })


        })
      }).then(() => {

        this.setState({
          iconTag : list
        });
      });
    }

  handleOnSubmit = (values) => {
    let iconSrc = this.state.iconSrc;
    let docRef = db.collection("roomID").doc(values.roomId);
    docRef.get().then( (doc) => {
      if (doc.exists) {
        docRef.update({
          users : firebase.firestore.FieldValue.arrayUnion({
            username : values.username,
            cur_hands_up: -1,
            hands : 2,
            iconSrc : iconSrc
          })
        })
        .then(() => {
          console.log('users successfully added to the database');
          this.props.history.push({
            pathname: "/waiting",
            state: {
              icon: this.state.iconSrc,
              username: values.username,
              roomId: values.roomId
            }
          });

        }).catch((error) => {
          console.log(error);

          console.log('users were not successfully added to the database');
        });

      }
      else {
        docRef.set({
          lead : {
            index : 0,
            thumbs : 2,　
            win_lose : 0
          },
          total_hands : 2,
          host : values.username,
          round : 0,
          table_state : "waiting",
          users : [{
            username : values.username,
            cur_hands_up: -1,
            hands : 2,
            iconSrc : iconSrc
          }]
        })
        .then(() => {
          console.log("Host Successfully ");
          this.props.history.push({
            pathname: "/waiting",
            state: {
              icon: this.state.iconSrc,
              username: values.username,
              roomId: values.roomId
            }
          });

        }).catch((error) => {
          console.log(error);

          console.log('host could not be added to db');
        });

      }
    }).catch(function (error) {
      console.log(error);

    })


  }


    render() {

        return (
          <div className="container">
            <Formik
              initialValues={{username: "toru", roomId: "fasd"}}
              onSubmit={values => this.handleOnSubmit(values)}
              validationSchema={Yup.object().shape({
                username: Yup.string().required("ユーザ名を入力してください。"),
                roomId: Yup.string().required("ルーム名を入力してください。"),
              })}
            >
              {
                ({ handleSubmit, handleChange, handleBlur, values, errors, touched}) => (
                  <Form onSubmit={handleSubmit}>
                  <h1><span>Lifes</span> Game</h1>
                  <div id="icon" data-toggle="modal" data-target="#modal1">
                    <Icon url={this.state.iconSrc} func={this.openModal} />
                  </div>
                  <Modal
                  isOpen={this.state.modalOpen}
                  >
                <ModalHeader>アイコンを選んでください</ModalHeader>
                <ModalBody>
                  {this.state.iconTag}
                </ModalBody>
                <ModalFooter></ModalFooter>
                </Modal>
                    <FormGroup>
                      <Label for="username">ユーザ名</Label>
                      <Input
                        type="text"
                        name="username"
                        id="username"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        invalid={Boolean(touched.username && errors.username)}
                      />
                      <FormFeedback>
                        {errors.username}
                      </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label for="roomId">ルーム名</Label>
                      <Input
                        type="text"
                        name="roomId"
                        id="roomId"
                        value={values.roomId}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        invalid={Boolean(touched.roomId && errors.roomId)}
                      />
                      <FormFeedback>
                        {errors.roomId}
                      </FormFeedback>
                    </FormGroup>
                    <Button type="submit" className="btn">参加</Button>
                  </Form>
                )
            }
          </Formik>


        </div>
        );
    }
}

export default Login;
