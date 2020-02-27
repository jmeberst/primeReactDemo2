import React, { Component } from "react";
import ReactDOM from "react-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import { Growl } from "primereact/growl";
import { UncontrolledTooltip } from "reactstrap";
import { MultiSelect } from "primereact/multiselect";
import { Button } from "primereact/button";
import "bootstrap/dist/css/bootstrap.min.css";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import "./styles.css";
import makeData from "./makeData";

export class App extends Component {
  constructor() {
    super();
    this.state = {
      colors: [],
      expandedRows: [],
      data: makeData(1000),
      selectedData: [],
      checked: {},
      hover: {},
      addRowShow: false
    };

    this.colors = [
      { label: "red", value: "red" },
      { label: "blue", value: "blue" },
      { label: "green", value: "green" },
      { label: "yellow", value: "yellow" }
    ];

    this.onFilter = this.onFilter.bind(this);
    this.firstNameEditor = this.firstNameEditor.bind(this);
    this.lastNameEditor = this.lastNameEditor.bind(this);
    this.colorEditor = this.colorEditor.bind(this);
    this.onRowToggle = this.onRowToggle.bind(this);
    this.headerTemplate = this.headerTemplate.bind(this);
    this.footerTemplate = this.footerTemplate.bind(this);
    this.findSelectedRows = this.findSelectedRows.bind(this);
    this.requiredValidator = this.requiredValidator.bind(this);
    this.cellTemplate = this.nameTemplate.bind(this);
    this.colorFilter = this.colorFilter.bind(this);
    this.onColorChange = this.onColorChange.bind(this);
    this.deleteTemplate = this.deleteTemplate.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.showAddRow = this.showAddRow.bind(this);
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

  inputTextEditor(props, field) {
    return (
      <InputText
        type="text"
        value={props.rowData[field]}
        onChange={e => this.onEditorValueChange(props, e.target.value)}
      />
    );
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
