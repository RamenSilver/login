import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { db } from '../utils/Firebase.js';
import '../css/waiting.css'
import { Form, FormGroup, Label, Input, Button, Modal, FormFeedback } from 'reactstrap';
import WaitingSvg from "../Component/WaitingSvg";

class Waiting extends React.Component {
  constructor(props) {
    super (props);
    this.state = {
      roomInfo: "",
      username: this.props.location.state ? this.props.location.state.username : "",
      roomId: this.props.location.state ? this.props.location.state.roomId : "",
      icon: this.props.location.state ? this.props.location.state.icon : "",
      players: []
     }
     if (this.state.username === undefined || this.state.username === "") {
       this.props.history.push("/login");
     }
     else if (this.state.roomId === undefined || this.state.roomId === "") {
       this.props.history.push("/login");

     }

  }


  componentDidMount() {
    console.log("called now");
    let tempPlayer = [];
    let docRef = db.collection("roomID").doc(this.state.roomId);
    let unsubscribe = docRef.onSnapshot((querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
              console.log(change.doc.data());
            }
            if (change.type === "modified") {
                console.log("Modified city: ", change.doc.data());
            }
            if (change.type === "removed") {
                console.log("Removed city: ", change.doc.data());
            }
        });
    })
    docRef.get().then((doc) => {
      console.log(doc);
      doc.data().users.forEach((user) => {
        tempPlayer.push(<img key={user.iconSrc + user.username} src={user.iconSrc} className="icon"/>);
      })
      this.setState(
          { roomInfo: doc.data(),
            players: tempPlayer
           }
        )
    })
  }



  render(){

    if (this.state.username == this.state.roomInfo.host) {
      return (
        <div className="contaner">
          <div className="content">
            <h4>- 指スマゲーム -</h4>
            <img className="myIcon" src={this.state.icon} alt="icon" />
            <h5>こんにちは <span>{this.state.username}</span> さん</h5>
            <h6>あなたがこのルームのホストです。</h6>

            <div className="participant">
              <h6>現在の参加者…</h6>
              {this.state.players}
            </div>

            <div className="btn-wrap">
              <Button className="btn-out" type="button">開始する</Button>
            </div>
          </div>
          <WaitingSvg></WaitingSvg>
        </div>
      )
    }
    else {
      return (

      <div className="contaner">
        <div className="content">
          <h4>- 指スマゲーム -</h4>
          <img className="myIcon" src={this.state.icon} alt="icon" />
          <h5>こんにちは <span>{this.state.username}</span> さん</h5>
          <h6><span>{this.state.roomInfo.host}</span>が開始するまでしばらくお待ちください。</h6>

          <div className="participant">
            <h6>現在の参加者…</h6>
            {this.state.players}
          </div>

          <div className="btn-wrap">
            <Button className="btn-out" type="button">退室する？</Button>
          </div>

        </div>
        <WaitingSvg></WaitingSvg>
      </div>
      );
    }

  }

}

export default Waiting;
