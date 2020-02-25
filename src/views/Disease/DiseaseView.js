import React from "react";
// core components
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import AddForm from "components/AddForm/AddForm.js";
import UpdateListTable from "components/UpdateListTable/UpdateListTable.js";
import DataListTable from "components/DataListTable/DataListTable.js";
import DeleteListTable from "components/DeleteListTable/DeleteListTable.js";

// to network request
import axios from "axios";

export default class DiseaseView extends React.Component {
  state = {
    diseases: [],
    isLoading: false
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    axios
      .get("/diseases")
      .then(res => {
        this.setState({
          diseases: res.data,
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
              tabName: "‌‌ර‌ෝගයන්",
              tabContent: (
                <DataListTable
                  tableHeders={[
                    "නම",
                    "විස්තරය",
                    "හ‌ේතුව",
                    "පිළියම",
                    "උපකරණ",
                    "සදා ගන්නා ආකාරය"
                  ]}
                  dataList={this.state.diseases}
                  isLoading={this.state.isLoading}
                />
              )
            },
            {
              tabName: "එකතු කරන්න",
              tabContent: (
                <AddForm
                  submitType={"disease"}
                  cardSubHeader={"නව වෙද මැදුරක් ඇතුලත් කරන්න."}
                  textFieldsTypes={[
                    "name",
                    "description",
                    "cause",
                    "solution",
                    "medication_goods",
                    "prepare_method"
                  ]}
                />
              )
            },
            {
              tabName: "වෙනස් කරන්න",
              tabContent: (
                <UpdateListTable
                  tableHeders={["යොමු අංකය", "නම", ""]}
                  submitType={"disease"}
                  cardSubHeader={"බ‌ෙහ‌ෙත් වර්ගයන්හි ත‌ොරතුරු ව‌ෙනස් කරන්න."}
                  fields={[
                    "id",
                    "name",
                    "description",
                    "cause",
                    "solution",
                    "medication_goods",
                    "prepare_method"
                  ]}
                  dataList={this.state.diseases}
                  isLoading={this.state.isLoading}
                />
              )
            },
            {
              tabName: "ඉවත් කරන්න",
              tabContent: (
                <DeleteListTable
                  submitType={"disease"}
                  tableHeders={["යොමු අංකය", "නම", ""]}
                  dataList={this.state.diseases}
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
