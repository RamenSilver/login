import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { db, storage } from '../../Firebase';
import '../css/main.css'
import { Form, FormGroup, Label, Input, Button, Modal, FormFeedback } from 'reactstrap';
import WaitingSvg from "../Component/WaitingSvg";

function Player(props) {
  const [left, setLeft] = useState(true);
  const [right, setRight] = useState(true);
  const [icon, setIcon] = useState(false);
  const [hands, setHands] = useState(2);

  const onloadLeft = () => {
    setLeft(false);
  }
  const onloadRight= () => {
    setRight(false);
  }
  const onloadIcon = () => {
    setIcon(true);
  }

  return (
    <div className="player" name="player1">{props.username}
      <div className="face">
        <img key={props.iconSrc + props.username} src="{props.url}" alt="" onload={onloadIcon}/>
      </div>
      <div className="fingers">
      {
      ( () => {
        if (hands > 1) {
          return (
            <>
              <div className="left">
                <img key={props.left + props.username} src={props.left} alt="" onload={onloadLeft}/>
              </div>
              <div className="right">
                <img key={props.right + props.username} src={props.right} alt="" onload={onloadRight}/>
              </div>
            </>
          );
        }
        else if (hands > 0) {
          return (
            <div className="right">
              <img key={props.right + props.username} src={props.right} alt="" onload={onloadRight}/>
            </div>
          );
        }
        else {
          return (
            <div className="clear close">
              <h2>CLEAR!!</h2>
            </div>
          );
        }
      })
    }
      </div>
    </div>
  )
}

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      players : [],
      fingers : {
        enemy : {
        left : "",
        right : ""
      },
      my : {
        left : "",
        right : ""
      }
      },
      roomInfo : {}
    }
  }

  render() {
    return(
      <>
      <div className="title">
    <h1>指スマゲーム</h1>
  </div>
  <div className="content-wrapper">
    <div className="content">
      <div className="players-area">
        <Player username={this.state.username} url={this.state.iconSrc} left={this.state.fingers.enemy.left} right={this.state.fingers.enemy.right} />

      </div>
      <div className="my-area">
        <div className="rhythem-area">
          <div className="rhythem">
            <div className="out-text">
              <h4 className="text-one"></h4>
              <h3 className="text-two"></h3>
            </div>
          </div>
        </div>
        <div className="my-fingers-area" name="my">
          <div className="my-fingers">
            <div className="my-left" id="left">
              <img src="./img/myLeftDown.png" alt="" />
            </div>
            <div className="my-right" id="right">
              <img src="./img/myRightDown.png" alt="" />
            </div>
          </div>
        </div>
        <div className="my-numbers">
          <div className="my-number">
            <div className="">
              <div className="my-number1">指の総数(<span></span>)</div>
              <div className="fingersUpSum">上げてる指の総数(<span></span>)</div>
            </div>

          </div>
        </div>
      </div>


      <Button id="select" type="Button" data-toggle="modal" data-target="#modal1">
        いくつで勝負？
      </Button>

      <div className="modal fade" id="modal1" tabindex="-1" role="dialog" aria-labelledby="label1" aria-hidden="true" data-backdrop='static'>
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="label1">いくつで勝負？</h5>
            </div>
            <div className="modal-body" id="modal-body">
            </div>
          </div>
        </div>
      </div>

      <Button id="judge" type="Button" data-toggle="modal" data-target="#modal2">
        いっせーのっせ
      </Button>

      <div className="modal fade" id="modal2" tabindex="-1" role="dialog" aria-labelledby="label1" aria-hidden="true" data-backdrop='true'>
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="label1">いっせーのっせ！</h4>
            </div>
            <div className="modal-body" id="modal-body2">
              <h2></h2>
            </div>
          </div>
        </div>
      </div>



      <Button id="judge" type="Button" name="Button">ジャッジ</Button>


    </div>
  </div>
  </>
    )
  }
}
export default Main;
