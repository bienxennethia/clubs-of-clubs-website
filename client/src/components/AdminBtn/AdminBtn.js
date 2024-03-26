
import {ReactComponent as Edit } from "../../icons/edit.svg";
import {ReactComponent as Delete } from "../../icons/delete.svg";

import { useParams } from 'react-router-dom';

import './AdminBtn.scss';

import { useCommonState } from "../../data/commonState";

const AdminBtn = ({ editModalId, deleteModalId, id = null }) => {
  const { setModalContentId, toggleModal } = useCommonState();
  const itemId = useParams()?.id || id;
  const btnHandler = (modalId) => {
    setModalContentId(itemId);
    toggleModal(modalId);
  };
  return (
    <div className="admin-btns">
      <div className="admin-btns__btn" onClick={() => btnHandler(editModalId)}>
        <Edit />
      </div>
      <div className="admin-btns__btn" onClick={() => btnHandler(deleteModalId)}>
        <Delete />
      </div>
    </div>
  )
};

export default AdminBtn;