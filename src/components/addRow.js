import React, { Component } from "react";
import { Button } from "primereact/button";
import PropTypes from "prop-types";

import "./styles.css";

export class AddRow extends Component {
  static defaultProps = {
    onSave: null,
    onKeyPress: null,
    inputTemplate: null
  };

  static propTypes = {
    onSave: PropTypes.func,
    onKeyPress: PropTypes.func,
    inputTemplate: PropTypes.node | undefined
  };

  constructor() {
    super();
    this.onSave = this.onSave.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);

    this.state = {
      addRowShow: false
    };
  }

  componentDidMount() {
    // axios
    //   .get(
    //     "https://raw.githubusercontent.com/primefaces/primereact/master/public/showcase/resources/demo/data/cars-large.json"
    //   )
    //   .then(data => {
    //     let res = data.data.data;
    //     let storage = sessionStorage.getItem("tablestatedemo-session");
    //     this.setState({ cars: res, sessionStorage: storage });
    //   });
  }

  render() {
    if (!this.state.addRowShow) {
      return (
        <div className="p-clearfix" style={{ width: "100%" }}>
          <Button
            style={{ float: "right" }}
            label="Add"
            icon="pi pi-plus"
            onClick={() =>
              this.setState({
                addRowShow: !this.state.addRowShow,
                row: { firstName: "", lastName: "", middleName: "", color: "" }
              })
            }
          />
        </div>
      );
    } else {
      return (
        <div className="p-clearfix" style={{ width: "100%" }}>
          <Button
            style={{ float: "right" }}
            label="Save"
            icon="pi pi-save"
            onClick={() =>
              this.setState({ addRowShow: !this.state.addRowShow })
            }
          />
        </div>
      );
    }
  }
}
