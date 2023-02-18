import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import Swal from "sweetalert2";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { ToastContainer, toast } from "material-react-toastify";
import "material-react-toastify/dist/ReactToastify.css";
import { getAllUser, deleteUsr, deleteAllUsr } from "../../Services/ApiService";
import "react-confirm-alert/src/react-confirm-alert.css";
import Button from "@material-ui/core/Button";

import PageTitle from "../../components/PageTitle/PageTitle";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  tableOverflow: {
    overflow: "auto",
  },
  titleItemRight: {
    transform: "translateY(-40%)",
    align: "right",
  },
}));

export default function Tables() {
  const classes = useStyles();
  let history = useHistory();

  const [dataValues, setdataValues] = useState([]);

  useEffect(() => {
    list();
  }, []);

  const list = () => {
    getAllUser(
      (response) => {
        setdataValues(response.data.data);
        console.log(response.data);
      },
      (err) => {
        console.log(err);
      },
    );
  };

  const deleteUser = (uid) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this imaginary file!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        return (
          deleteUsr(uid, () => {
            list();
          }),
          Swal.fire(
            "Deleted!",
            "Your imaginary file has been deleted.",
            "success",
          )
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your imaginary file is safe :)", "error");
      }
    });
  };
  const token = localStorage.getItem("id_token");

  const deleteRows = (RowsDeleted, data) => {
    const ids = RowsDeleted.data.map((d) => d.dataIndex);

    let indexes = [];
    const arr = [];
    for (let i = 0; i < dataValues.length; i++) {
      indexes.push(i);
    }
    const cmn = indexes.filter((element) => {
      if (ids.includes(element)) {
        arr.push(element);
      }
    });
    const usr = [];
    arr.map((index) => {
      var values = dataValues[index];
      usr.push(values._id);
      var data_ids = values._id;
    });
    console.log(usr, "usr");
    deleteAllUsr(
      usr,
      token,
      () => {
        list();
        toast.error("Deleted");
      },
      (err) => {
        console.log(err);
      },
    );
  };

  const rows = dataValues.map((user) => {
    return {
      name: user.name,
      email: user.email,
      phoneno: user.phoneno,

      action: (
        <div>
          <EditIcon
            onClick={() => history.push("/app/updateuser/" + user._id)}
          />

          <DeleteIcon onClick={() => deleteUser(user._id)} />
        </div>
      ),
    };
  });

  console.log("mydatasss", dataValues);
  console.log("Basic " + localStorage.getItem("id_token"));
  return (
    <>
      <PageTitle title="Users" />
      <ToastContainer />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Button
            className={classes.titleItemRight}
            variant="contained"
            color="primary"
            onClick={() => history.push("/app/adduser")}
          >
            Add New
          </Button>
          <MUIDataTable
            title="User List"
            data={rows}
            columns={[
              { name: "name", label: "Name" },
              { name: "phoneno", label: "Contact" },
              { name: "email", label: "Email" },
              { name: "action", label: "Action" },
            ]}
            options={{
              filterType: "checkbox",
              onRowsDelete: deleteRows,
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
