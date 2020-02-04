import React from "react";
// core components
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import AddForm from "components/AddForm/AddForm.js";
import EditForm from "components/EditForm/EditForm.js";
import DataListTable from "components/DataListTable/DataListTable.js";
import DeleteListTable from "components/DeleteListTable/DeleteListTable.js";

// to network request
import axios from "axios";

export default class MedicineView extends React.Component {
  state = {
    medications: [],
    isLoading: false
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    axios
      .get("/medications")
      .then(res => {
        this.setState({
          medications: res.data,
          isLoading: false
        });
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
              tabName: "‌‌බෙහෙත් වර්ග",
              tabContent: (
                <DataListTable
                  tableHeders={["රූපය", "නම", "විස්තර"]}
                  dataList={this.state.medications}
                  isLoading={this.state.isLoading}
                />
              )
            },
            {
              tabName: "එකතු කරන්න",
              tabContent: (
                <AddForm
                  submitType={"medication"}
                  cardSubHeader={"නව බ‌ෙහ‌ෙත් වර්ගයක් ඇතුලත් කරන්න."}
                  textFieldsTypes={[
                    "name",
                    "description",
                    "image_url",
                    "location"
                  ]}
                />
              )
            },
            {
              tabName: "වෙනස් කරන්න",
              tabContent: (
                <EditForm
                  submitType={"medication"}
                  cardSubHeader={"බ‌ෙහ‌ෙත් වර්ගය‌ෙ ත‌ොරතුරු ව‌ෙනස් කරන්න."}
                  textFieldsTypes={[
                    "name",
                    "description",
                    "image_url",
                    "location"
                  ]}
                />
              )
            },
            {
              tabName: "ඉවත් කරන්න",
              tabContent: (
                <DeleteListTable
                  submitType={"medication"}
                  tableHeders={["නම", ""]} //"යොමු අංකය",
                  dataList={this.state.medications}
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
