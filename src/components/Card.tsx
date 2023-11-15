import moment from "moment";
import trash from "../assets/icons/download.png";
import edit from "../assets/icons/edit-editor-pen-pencil-write-icon--4.png";
import { TitemsType } from "../utils/types";
import EditIssueModal from "../modal/EditIssueModal";
import {Dispatch, SetStateAction, useState} from "react";
import { Dropdown } from "react-bootstrap";
import { statuses } from "../utils/constants";

const Card = ({
  handleDelete,
  item: { name, id, created_at, column_values },
  handleEditIssue,
  setItemId,
  handleStatusEdit,
}: {
  handleOpenEdit?: (itemId: number) => void;
  handleDelete: (id: number) => void;
  item: TitemsType;
  handleEditIssue: (
    new_name: string,
    handleClose: () => void,
    new_desc: string
  ) => () => void;
  setItemId: Dispatch<SetStateAction<number>>;
  handleStatusEdit: (new_status: string, item_id: number) => void;
}) => {
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const handleCloseEdit = () => {
    setIsOpenEdit(false);
  };
  const handleOpenEdit = (itemId: number) => {
    
    setItemId(itemId);
    setIsOpenEdit(true);
  };
  return (
    <div className="single-note-item all-category">
      <div className="card card-body">
        <span className="side-stick"></span>
        <h5
          className="note-title text-truncate w-75 mb-0"
          data-noteheading="Book a Ticket for Movie"
        >
          {name}
          <i className="point fa fa-circle ml-1 font-10"></i>
        </h5>
        <p className="note-date font-12 text-muted">
          ({moment(created_at).format("DD/MM/YY HH:mm:ss")})
        </p>
        <div className="note-content">
          <p
            className="note-inner-content text-muted"
            data-notecontent="Blandit tempus porttitor aasfs. Integer posuere erat a ante venenatis."
          >
            {column_values.find((elem) => elem.id === "description")?.text}
          </p>
        </div>
        <div className="d-flex align-items-center">
          <span className="mr-1" onClick={() => handleOpenEdit(id)}>
            <img src={edit} alt="" className="edit-icon" />
          </span>
          <span className="mr-1" onClick={() => handleDelete(id)}>
            <img src={trash} alt="" className="trash-icon" />
          </span>
        </div>
        <div className="d-flex  flex-column mt-3">
          <span>Status</span>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {column_values.find((elem) => elem.id === "status")?.text}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {statuses
                .filter(
                  (elem) =>
                    elem.value !==
                    column_values.find((elem) => elem.id === "status")?.text
                )
                .map(({ value }) => {
                  return (
                    <Dropdown.Item
                      key={value}
                      onClick={() => handleStatusEdit(value, id)}
                    >
                      {value}
                    </Dropdown.Item>
                  );
                })}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      <EditIssueModal
        handleEditIssue={handleEditIssue}
        isOpen={isOpenEdit}
        handleClose={handleCloseEdit}
        name={name}
        desc={column_values.find((elem) => elem.id === "description")?.text}
      />
    </div>
  );
};

export default Card;
