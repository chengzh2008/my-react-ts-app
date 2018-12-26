import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Confirm from "./Confirm"

interface IState {
  confirmOpen: boolean;
  confirmMessage: string;
  confirmVisible: boolean;
  countDown: number;
}


class App extends Component<{}, IState> {

  public static getDerivedStateFromProps(props: {}, state: IState) {
    console.log("getDerivedStateFromProps", props, state);
    return null;
  }
  

  private timer: number = 0;
  private renderCount = 0;


  constructor(props: {}) {
    super(props);
    this.state = {
      confirmOpen: false,
      confirmMessage: "Please it the confirm button",
      confirmVisible: true,
      countDown: 10
    };
  }
  

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React and TypeScript
          </a>
        </header>
        <p>{this.state.confirmMessage}</p>
        {this.state.confirmVisible && (
          <button onClick={this.handleConfirmClick}>
            Confirm
          </button>
        )}
          
        <Confirm 
          open={this.state.confirmOpen}
          title="React and TypeScript"
          content="Are your sure you want to learn React and TypeScript?"
          cancelCaption="No Way"
          onCancelClick={this.handleCancelConfirmClick}
          onOkClick={this.handleOkConfirmClick}
          okCaption="Yes please!"
        />
      </div>
    );
  }

  public componentDidMount() {
    this.timer = window.setInterval(() => this.handleTimerTick(), 1000);
  }

  public componentWillUnmount() {
    clearInterval(this.timer);
  }

  public getSnapshotBeforeUpdate(prevProps: {}, prevState: IState) {
    this.renderCount += 1;
    console.log("getSnapShotbefore update: ", prevProps, prevState, {
      renderCount: this.renderCount
    });
    return this.renderCount;
  }

  public componentDidUpdate(prevProps: {}, prevState: IState, snapshot: number) {
    console.log("componentDidUpdate", prevProps, prevState, 
  snapshot, {
    renderCount: this.renderCount
  });
  }

  public shouldComponentUpdate(nextProps: {}, nextState: IState) {
    console.log("shouldComponentUpdate", nextProps, nextState);
    return true;
  }
  private handleCancelConfirmClick = () => {
    this.setState({
      confirmOpen: false,
      confirmMessage: "Take a break, I'm sure you will ..."
    });  
    clearInterval(this.timer);
  }


  private handleOkConfirmClick = () => {
    this.setState({
      confirmOpen: false,
      confirmMessage: "Coo, carry on reading!"
    });
    clearInterval(this.timer);
  }

  private handleConfirmClick = () => {
    this.setState({
      confirmOpen: true
    });
    clearInterval(this.timer);
  }

  

  private handleTimerTick = () => {
    this.setState({
      confirmMessage: `Please hit the confirm button ${this.state.countDown} secs to go`,
      countDown: this.state.countDown - 1
    }, () => {
      if (this.state.countDown <= 0) {
        clearInterval(this.timer);
        this.setState({
          confirmMessage: "Too late to confirm",
          confirmVisible: false
        });
      }
    })


  }
}

export default App;
