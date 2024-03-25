
import {ReactComponent as Edit } from "../../icons/edit.svg";
import {ReactComponent as Delete } from "../../icons/delete.svg";

import { useParams } from 'react-router-dom';

import './AdminBtn.scss';

const AdminBtn = ({ editModal, editModalId }) => {
  const clubId = useParams()?.id;
  return (
    <div className="admin-btns">
      <div className="admin-btns__btn" onClick={() => editModal(editModalId, clubId)}>
        <Edit />
      </div>
      <div className="admin-btns__btn">
        <Delete />
      </div>
    </div>
  )
};

export default AdminBtn;