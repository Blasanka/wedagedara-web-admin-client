import React from "react";
// core components
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import AddForm from "components/AddForm/AddForm.js";
import UpdateListTable from "components/UpdateListTable/UpdateListTable.js";
import DataListTable from "components/DataListTable/DataListTable.js";
import DeleteListTable from "components/DeleteListTable/DeleteListTable.js";

// to network request
import axios from "axios";

export default class MedicineView extends React.Component {
  state = {
    medications: [],
    isLoading: false,
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    axios
      .get("/medications")
      .then((res) => {
        this.setState({
          medications: res.data,
          isLoading: false,
        });
      })
      .catch((err) => {
        console.error(err);
        this.setState({
          isLoading: false,
        });
      });
  }

  render() {
    return (
      <div>
        <CustomTabs
          tabs={[
            {
              tabName: "‌‌බෙහෙත් වර්ග",
              tabContent:
                !this.state.isLoading && this.state.medications.length === 0 ? (
                  <p style={{ textAlign: "center" }}>බෙහෙත් වර්ග න‌ොමැත!</p>
                ) : (
                  <DataListTable
                    tableHeders={["රූපය", "නම", "ස්ථානයන්", "විස්තර"]}
                    dataList={this.state.medications}
                    isLoading={this.state.isLoading}
                  />
                ),
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
                    "location",
                    "marker_location",
                  ]}
                />
              ),
            },
            {
              tabName: "වෙනස් කරන්න",
              tabContent:
                !this.state.isLoading && this.state.medications.length === 0 ? (
                  <p style={{ textAlign: "center" }}>බෙහෙත් වර්ග න‌ොමැත!</p>
                ) : (
                  <UpdateListTable
                    tableHeders={["යොමු අංකය", "නම", ""]}
                    submitType={"medication"}
                    cardSubHeader={"බ‌ෙහ‌ෙත් වර්ගය‌ේ ත‌ොරතුරු ව‌ෙනස් කරන්න."}
                    fields={[
                      "name",
                      "description",
                      "image_url",
                      "location",
                      "marker_location",
                    ]}
                    dataList={this.state.medications}
                    isLoading={this.state.isLoading}
                  />
                ),
            },
            {
              tabName: "ඉවත් කරන්න",
              tabContent:
                !this.state.isLoading && this.state.medications.length === 0 ? (
                  <p style={{ textAlign: "center" }}>බෙහෙත් වර්ග න‌ොමැත!</p>
                ) : (
                  <DeleteListTable
                    submitType={"medication"}
                    tableHeders={["යොමු අංකය", "නම", ""]} //"යොමු අංකය",
                    dataList={this.state.medications}
                    isLoading={this.state.isLoading}
                  />
                ),
            },
          ]}
        />
      </div>
    );
  }
}
