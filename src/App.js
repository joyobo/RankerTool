import React from 'react';
import './App.css';
import EntryList from './components/EntryList';
import { Button, Toaster, Position } from '@blueprintjs/core';

function array_move(arr, old_index, new_index) {
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr;
};

const AppToaster = Toaster.create({
  className: "recipe-toaster",
  position: Position.TOP,
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      entryNum: 1,
      entryList: [""]
    };
  }

  onAddClick() {
    console.log("add pressed")
    var newentryNum = this.state.entryNum + 1;
    var newentryList = this.state.entryList.concat([""])
    console.log(newentryList)
    this.setState({
      entryNum: newentryNum,
      entryList: newentryList
    })
  }

  onClickRemove({ index }) {
    var newentryList = this.state.entryList.slice(0, index).concat(this.state.entryList.slice(index + 1));
    var newentryNum = this.state.entryNum - 1
    console.log("clickremove", index, newentryList, newentryNum)

    this.setState({
      entryNum: newentryNum,
      entryList: newentryList
    })
  }

  onTypeChange(e, index) {
    var newentryList = this.state.entryList
    newentryList[index] = e.target.value
    console.log("type", index, newentryList)

    this.setState({
      entryList: newentryList
    })
  }

  onUpClick(index) {
    if (index === 0) {
      this.showToast("Already at the top!");
      return;
    }
    var newentryList = array_move(this.state.entryList, index, index - 1)
    console.log("up", index, newentryList)

    this.setState({
      entryList: newentryList
    })
  }

  onDownClick(index) {
    if (index === this.state.entryList.length - 1) {
      this.showToast("Already at the bottom :(");
      return;
    }
    var newentryList = array_move(this.state.entryList, index, index + 1)
    console.log("down", index, newentryList)

    this.setState({
      entryList: newentryList
    })
  }

  showToast(message) {
    // create toasts in response to interactions.
    // in most cases, it's enough to simply create and forget (thanks to timeout).
    AppToaster.show({ message: message, timeout: "2500" });
  }

  render() {
    return (
      <div className="App">
        <header className="AppHeader">Ranking Tool</header>
        <div className="contentcontainer">
          <Button onClick={() => this.onAddClick()}>Add Choice</Button>
          <EntryList entryList={this.state.entryList} onClickRemove={this.onClickRemove.bind(this)} onTypeChange={this.onTypeChange.bind(this)} onUpClick={this.onUpClick.bind(this)} onDownClick={this.onDownClick.bind(this)} />
        </div>
      </div>
    );
  }
}

window.addEventListener("beforeunload", function (e) {
  var confirmationMessage = "Changes you made may not be saved.";
  e.returnValue = confirmationMessage;     // Gecko, Trident, Chrome 34+
  return confirmationMessage;              // Gecko, WebKit, Chrome <34
});

export default App;
