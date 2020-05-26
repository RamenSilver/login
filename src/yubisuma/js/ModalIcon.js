import React, { useState } from 'react';
import { Button, Input, FormGroup, Form, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { db, storage } from '../utils/Firebase.js';

const icon1 = require("../img/icons/icon1.png");
const icon2 = require("../img/icons/icon2.png");
const icon3 = require("../img/icons/icon3.png");
const icon4 = require("../img/icons/icon4.png");
const icon5 = require("../img/icons/icon5.png");
const array = [icon1, icon2, icon3, icon4, icon5];


function Icon(props) {
  return <img src={props.url} className="select-icon" onClick={props.func.bind(this, props.url)}/>;
}
class ModalIcon extends React.Component {
  constructor(props) {
    super (props);
    this.state = {
      modalOpen: false,
      iconSrc: icon1,
      iconTag: []
    };

    this.getAllIcons();

    this.openModal = this.openModal.bind(this);
    this.selectIcon = this.selectIcon.bind(this);
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
  getAllIcons = () => {
    let iconList = [];
    storage.ref("img/icons/").listAll()
    .then((result) => {
      result.items.forEach((image) => {
        image.getDownloadURL()
        .then((uri) => {
          this.state.iconTag.push(<img key={uri} src={uri} className="select-icon" onClick={this.selectIcon.bind(this, uri)} />);
        });
      });

    });

  }

  render() {
    if (!this.state.modalOpen) {
      console.log(this.state.iconSrc);
      return (
        <div id="icon" data-toggle="modal" data-target="#modal1">
        <FormGroup>
        <Input
          type="hidden"
          name="icon"
          id="icon"
          value={this.state.iconSrc}
          />
          </FormGroup>
          <Icon url={this.state.iconSrc} func={this.openModal} />
        </div>
      )
    }
    else {
      return (
        <div>
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
      </div>
      );

    }
  }
}

export default ModalIcon;
