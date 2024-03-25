
import {ReactComponent as Edit } from "../../icons/edit.svg";
import {ReactComponent as Delete } from "../../icons/delete.svg";

import { useParams } from 'react-router-dom';

import './AdminBtn.scss';

const AdminBtn = ({ toggleModal, editModalId, deleteModalId }) => {
  const clubId = useParams()?.id;
  return (
    <div className="admin-btns">
      <div className="admin-btns__btn" onClick={() => toggleModal(editModalId, clubId)}>
        <Edit />
      </div>
      <div className="admin-btns__btn" onClick={() => toggleModal(deleteModalId, clubId)}>
        <Delete />
      </div>
    </div>
  )
};

export default AdminBtn;