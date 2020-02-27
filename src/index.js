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
import "primeflex/primeflex.css";

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
      addRowShow: false,
      row: { firstName: "", lastName: "", middleName: "", color: "" }
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
    this.updateProperty = this.updateProperty.bind(this);
    this.save = this.save.bind(this);
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

  onEditorValueChange(props, value) {
    let updatedData = [...props.value];
    updatedData[props.rowIndex][props.field] = value;
    this.setState({ data: updatedData });
  }

  onFilter(event) {
    console.log(event.filters);
    // perform back-end actions (lazy-loading etc.)
  }

  onRowToggle(event) {
    console.log(event.currentTarget);
  }

  findSelectedRows(e, data) {
    let checkedMap = this.state.checked;

    checkedMap[data.firstName] = e.checked;

    let selectedRows = this.state.data.filter(row => {
      return row.firstName === data.firstName;
    });

    let selectedData = this.state.selectedData;

    if (e.checked) {
      selectedData.push(...selectedRows);
    } else {
      selectedData = selectedData.filter(el => !selectedRows.includes(el));
    }
    this.setState({ checked: checkedMap, selectedData: selectedData });
  }

  headerTemplate(data) {
    return (
      <div>
        <Checkbox
          onChange={e => this.findSelectedRows(e, data)}
          checked={this.state.checked[data.firstName]}
        />
        <span style={{ padding: ".5em" }}>{data.firstName}</span>
      </div>
    );
  }

  requiredValidator(props) {
    let value = props.rowData[props.field];

    console.log(props);

    if (value.length === 0) {
      this.growl.show({
        severity: "error",
        summary: "Error",
        detail: props.header + " is required"
      });
    }

    return value && value.length > 0;
  }

  footerTemplate(data, index) {
    return;
  }

  firstNameEditor(props) {
    return this.inputTextEditor(props, "firstName");
  }
  lastNameEditor(props) {
    return this.inputTextEditor(props, "lastName");
  }

  onColorChange(event) {
    this.dt.filter(event.value, "color", "equals");
    this.setState({ colors: event.value });
  }

  colorFilter() {
    return (
      <Dropdown
        value={this.state.colors}
        options={this.colors}
        panelStyle={{ width: "50%", marginRight: "2em", position: "sticky" }}
        onChange={this.onColorChange}
        style={{ width: "100%", minWidth: "5em" }}
        placeholder="Color"
      />
    );
  }
  colorEditor(props) {
    return (
      <Dropdown
        value={props.value[props.rowIndex].color}
        options={this.colors}
        panelStyle={{ width: "50%", marginRight: "2em", position: "sticky" }}
        onChange={e => this.onEditorValueChange(props, e.value)}
        style={{ width: "70%", minWidth: "5em" }}
        placeholder="Select a Color"
      />
    );
  }

  nameTemplate(rowData, column) {
    return (
      <div>
        <span href="#" id="UncontrolledTooltipExample">
          {rowData.firstName}
        </span>
        <UncontrolledTooltip
          placement="right"
          target="UncontrolledTooltipExample"
        >
          ToolTip example!
        </UncontrolledTooltip>
      </div>
    );
  }

  deleteRow(rowData) {
    let index = this.state.data.indexOf(rowData);

    this.setState({
      data: this.state.data.filter((val, i) => i !== index)
    });
  }

  deleteTemplate(rowData, column) {
    return (
      <div>
        <Button
          icon="pi pi-trash"
          href="#"
          className="p-button-danger"
          id="deleteTemplate"
          onClick={() => this.deleteRow(rowData)}
        />
        <UncontrolledTooltip placement="right" target="deleteTemplate">
          Delete Row
        </UncontrolledTooltip>
      </div>
    );
  }

  updateProperty(property, value) {
    let row = this.state.row;
    row[property] = value;
    this.setState({ row: row });
  }

  save() {
    let rows = [...this.state.data];

    let newRow = this.state.row;
    newRow["enterDate"] = new Date().toDateString();

    rows.push(newRow);

    this.setState({
      data: rows,
      row: { firstName: "", lastName: "", middleName: "", color: "" },
      addRowShow: !this.state.addRowShow
    });
  }

  showAddRow() {
    //This would be a seperate component with enough time
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
        <div className="p-grid" style={{ flex: "1" }}>
          <div className="p-col">
            <span className="p-float-label">
              <InputText
                id="firstNameInput"
                type="text"
                value={this.state.row.firstName}
                onChange={e => this.updateProperty("firstName", e.target.value)}
              />
              <label htmlFor="firstNameInput" style={{ paddingLeft: "1.5rem" }}>
                First Name
              </label>
            </span>
          </div>
          <div className="p-col">
            <span className="p-float-label">
              <InputText
                id="lastNameInput"
                type="text"
                value={this.state.row.lastName}
                onChange={e => this.updateProperty("lastName", e.target.value)}
              />
              <label htmlFor="lastNameInput" style={{ paddingLeft: "1.5rem" }}>
                Last Name
              </label>
            </span>
          </div>
          <div className="p-col">
            <span className="p-float-label">
              <InputText
                type="text"
                id="middleNameInput"
                value={this.state.row.middleName}
                onChange={e =>
                  this.updateProperty("middleName", e.target.value)
                }
              />
              <label
                htmlFor="middleNameInput"
                style={{ paddingLeft: "1.5rem" }}
              >
                Middle Name
              </label>
            </span>
          </div>
          <div className="p-col">
            <span className="p-float-label">
              <InputText
                type="text"
                id="colorInput"
                value={this.state.row.color}
                onChange={e => this.updateProperty("color", e.target.value)}
              />
              <label htmlFor="colorInput" style={{ paddingLeft: "1.5rem" }}>
                Color
              </label>
            </span>
          </div>
          <Button
            style={{ float: "right" }}
            label="Save"
            icon="pi pi-save"
            onClick={() => this.save()}
          />
        </div>
      );
    }
  }

  render() {
    var header = (
      <div style={{ textAlign: "left" }}>
        <i className="pi pi-search" style={{ margin: "4px 4px 0 0" }} />
        <InputText
          type="search"
          onInput={e => this.setState({ globalFilter: e.target.value })}
          placeholder="Global Search"
          size="50"
        />
      </div>
    );

    return (
      <div>
        <div className="content-section implementation">
          <Growl ref={el => (this.growl = el)} />
          <DataTable
            ref={el => (this.dt = el)}
            value={this.state.data}
            paginator={true}
            editable={true}
            rows={25}
            rowsPerPageOptions={[10, 25, 50, 100]}
            header={header}
            footer={this.showAddRow()}
            globalFilter={this.state.globalFilter}
            emptyMessage="No records found"
            rowGroupMode="subheader"
            sortField="firstName"
            sortOrder={1}
            groupField="firstName"
            rowGroupHeaderTemplate={this.headerTemplate}
            rowGroupFooterTemplate={this.footerTemplate}
            expandableRowGroups={false}
            expandedRows={this.state.expandedRows}
            onRowToggle={e => {
              this.setState({ expandedRows: e.data });
            }}
            selection={this.state.selectedData}
            onSelectionChange={e => {
              this.setState({ selectedData: e.value });
            }}
            resizableColumns={true}
            columnResizeMode="fit"
          >
            <Column selectionMode="multiple" style={{ width: "3em" }} />
            <Column
              field="firstName"
              editor={this.firstNameEditor}
              header="First Name"
              filter={true}
              sortable={true}
              body={this.nameTemplate}
              editorValidator={this.requiredValidator}
            />
            <Column
              field="lastName"
              editor={this.lastNameEditor}
              header="Last Name"
              filter={true}
              sortable={true}
            />
            <Column
              field="middleName"
              header="Middle Name"
              filter={true}
              sortable={true}
            />
            <Column
              field="color"
              header="Color"
              editor={this.colorEditor}
              filter={false}
              sortable={true}
              style={{ height: "3.5em", minWidth: "5em" }}
              filter={true}
              filterElement={this.colorFilter()}
            />
            <Column
              field="enterDate"
              header="Enter Date"
              filter={false}
              sortable={true}
            />
            <Column
              field="withdrawDate"
              header="Withdraw Date"
              filter={false}
              sortable={true}
            />
            <Column body={this.deleteTemplate} filter={false} />
          </DataTable>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
