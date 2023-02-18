import React from "react";

import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Chip,
} from "@material-ui/core";
import useStyles from "../../styles";

const states = {
  sent: "success",
  pending: "warning",
  declined: "secondary",
};

export default function TableComponent({ data }) {
  const classes = useStyles();
  var keys = Object.keys(data[0]).map((i) => i.toUpperCase());
  // keys.shift(); // delete "id" key

  return (
    <Table className="mb-0">
      <TableHead>
        <TableRow>
          {keys.map((key) => (
            <TableCell key={key}>{key}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(({ id, name, phoneno, email, action }) => (
          <TableRow key={id}>
            <TableCell className="pl-3 fw-normal">{name}</TableCell>
            <TableCell>{phoneno}</TableCell>
            <TableCell>{email}</TableCell>
            <TableCell>{action}</TableCell>
            {/* <TableCell>{date}</TableCell>
            <TableCell>{city}</TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
