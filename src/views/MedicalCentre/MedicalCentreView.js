import React from "react";
// core components
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import AddForm from "components/AddForm/AddForm.js";
import UpdateListTable from "components/UpdateListTable/UpdateListTable.js";
import DataListTable from "components/DataListTable/DataListTable.js";
import DeleteListTable from "components/DeleteListTable/DeleteListTable.js";

// to network request
import axios from "axios";

export default class MedicalView extends React.Component {
  state = {
    places: [],
    isLoading: false
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    axios
      .get("/places")
      .then(res => {
        this.setState({
          places: res.data,
          isLoading: false
        });
        console.log(this.state.places);
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <div>
        <CustomTabs
          tabs={[
            {
              tabName: "‌‌වෙද මැදුරු",
              tabContent: (
                <DataListTable
                  tableHeders={["රූපය", "නම", "දුරකථන අංකය", "දුර", "විස්තර"]}
                  dataList={this.state.places}
                  isLoading={this.state.isLoading}
                />
              )
            },
            {
              tabName: "එකතු කරන්න",
              tabContent: (
                <AddForm
                  submitType={"place"}
                  cardSubHeader={"නව වෙද මැදුරක් ඇතුලත් කරන්න."}
                  textFieldsTypes={[
                    "name",
                    "description",
                    "image_url",
                    "phone_number",
                    "duration",
                    "marker_location"
                  ]}
                />
              )
            },
            {
              tabName: "වෙනස් කරන්න",
              tabContent: (
                <UpdateListTable
                  tableHeders={["යොමු අංකය", "නම", ""]}
                  submitType={"place"}
                  cardSubHeader={"ව‌ෙද මැදුර‌ෙහි ත‌ොරතුරු ව‌ෙනස් කරන්න."}
                  fields={[
                    "id",
                    "name",
                    "description",
                    "image_url",
                    "phone_number",
                    "duration",
                    "marker_location"
                  ]}
                  dataList={this.state.places}
                  isLoading={this.state.isLoading}
                />
              )
            },
            {
              tabName: "ඉවත් කරන්න",
              tabContent: (
                <DeleteListTable
                  submitType={"place"}
                  tableHeders={["යොමු අංකය", "නම", ""]} //"යොමු අංකය",
                  dataList={this.state.places}
                  isLoading={this.state.isLoading}
                />
              )
            }
          ]}
        />
      </div>
    );
  }
}
