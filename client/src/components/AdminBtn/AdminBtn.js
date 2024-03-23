
import {ReactComponent as Edit } from "../../icons/edit.svg";
import {ReactComponent as Delete } from "../../icons/delete.svg";

import './AdminBtn.scss';

const AdminBtn = ({ toggleModal }) => {
  return (
    <div className="admin-btns">
      <div className="admin-btns__btn">
        <Edit />
      </div>
      <div className="admin-btns__btn">
        <Delete />
      </div>
    </div>
  )
};

export default AdminBtn;