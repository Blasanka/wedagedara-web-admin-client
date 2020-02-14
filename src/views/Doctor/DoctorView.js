import React from "react";
// core components
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import AddForm from "components/AddForm/AddForm.js";
import EditForm from "components/EditForm/EditForm.js";
import DataListTable from "components/DataListTable/DataListTable.js";
import DeleteListTable from "components/DeleteListTable/DeleteListTable.js";

// to network request
import axios from "axios";

export default class DoctorView extends React.Component {
  state = {
    doctors: [],
    isLoading: false
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    axios
      .get("/doctors")
      .then(res => {
        this.setState({
          doctors: res.data,
          isLoading: false
        });
        console.log(this.state.doctors);
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
              tabName: "‌‌වෙද මහතුන්",
              tabContent: (
                <DataListTable
                  tableHeders={["රූපය", "නම", "ස්ථනය", "දුරකථන අංකය"]}
                  dataList={this.state.doctors}
                  isLoading={this.state.isLoading}
                />
              )
            },
            {
              tabName: "එකතු කරන්න",
              tabContent: (
                <AddForm
                  submitType={"doctor"}
                  cardSubHeader={"නව වෙද මහතකු ඇතුලත් කරන්න."}
                  textFieldsTypes={[
                    "name",
                    "description",
                    "image_url",
                    "phone_number",
                    "location"
                  ]}
                />
              )
            },
            {
              tabName: "වෙනස් කරන්න",
              tabContent: (
                <EditForm
                  submitType={"doctor"}
                  cardSubHeader={"ව‌ෙද මහතාග‌ේ ත‌ොරතුරු ව‌ෙනස් කරන්න."}
                  textFieldsTypes={[
                    "id",
                    "name",
                    "description",
                    "image_url",
                    "phone_number",
                    "location"
                  ]}
                />
              )
            },
            {
              tabName: "ඉවත් කරන්න",
              tabContent: (
                <DeleteListTable
                  submitType={"doctor"}
                  tableHeders={["යොමු අංකය", "නම", ""]} //"යොමු අංකය",
                  dataList={this.state.doctors}
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
