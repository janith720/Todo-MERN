import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

export default function TodoItem({ todoItem, edit, deleted }) {
  return (
    <div className="todoItem">
      <p>{todoItem}</p>
      <div className="editNdel">
        <EditIcon
          onClick={edit}
          style={{ fontSize: "30px", margin: "5px", color: "#11343d",cursor: 'pointer' }}
        />
        <DeleteIcon
          onClick={deleted}
          style={{ fontSize: "30px", margin: "5px", color: "#11343d", cursor: 'pointer' }}
        />
      </div>
    </div>
  );
}
