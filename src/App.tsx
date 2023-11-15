import "./App.css";
import Card from "./components/Card";
import { useEffect, useState } from "react";
import CreateIssueModal from "./modal/CreateIssueModal";
import { mutationRequest, queryRequest } from "./request-body/queries";
import addIcon from "./assets/icons/images.jpeg";
import { TitemsType } from "./utils/types";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [boardId, setBoardId] = useState(0);
  const [item_id, setItemId] = useState(0);
  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setItemId(0);
    setIsOpen(false);
  };

  const { mutate } = mutationRequest({
    url: `/items`,
    method: "delete",
    isAuth: true,
  });
  const handleDelete = (itemId: number) => {
    mutate.mutate({
      itemId,
    });
  };
  const [items, setItems] = useState<TitemsType[]>([]);
  const { mutate: addIssue } = mutationRequest({
    url: `/items`,
    method: "post",
    isAuth: true,
  });
  const { mutate: editIssue } = mutationRequest({
    url: `/items`,
    method: "patch",
    isAuth: true,
  });
  const { mutate: editIssueStatus } = mutationRequest({
    url: `/items`,
    method: "put",
    isAuth: true,
  });
  const handleEditIssue =
    (new_name: string, handleClose: () => void, new_desc: string) => () => {
      editIssue.mutate(
        {
          boardId,
          new_name,
          item_id,
          new_desc,
        },
        {
          onSuccess: () => {
            handleClose();
          },
        }
      );
    };
  const handleStatusEdit = (new_status: string, item_id: number) => {
    editIssueStatus.mutate(
      {
        boardId,
        item_id,
        new_status,
      },
      {
        onSuccess: () => {
          handleClose();
        },
      }
    );
  };
  const handleCreateIssue =
    (name: string, desc: string, status: string) => () => {
      addIssue.mutate(
        {
          name,
          boardId,
          desc,
          status,
        },
        {
          onSuccess: () => {
            handleClose();
          },
        }
      );
    };
  const { refetch } = queryRequest({
    url: `/items`,
    method: "get",
    key: `getItems ${mutate.isSuccess}`,
    cb: setItems,
    setBoardId,
  });
  useEffect(() => {
    refetch();
  }, [
    mutate.isSuccess,
    addIssue.isSuccess,
    editIssue.isSuccess,
    editIssueStatus.isSuccess,
  ]);

  return (
    <div
      className="page-content container note-has-grid"
      style={{ width: "max-content", minWidth: "540px" }}
    >
      <ul className="nav nav-pills p-3 bg-white mb-3 rounded-pill d-flex justify-content-between">
        <li className="nav-item">
          <div
            className="nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2 active"
            id="all-category"
          >
            <i className="icon-layers mr-1"></i>
            <span className="d-none d-md-block">Board: {boardId}</span>
          </div>
        </li>
        <li
          className="nav-item d-flex align-items-center gap-3"
          style={{ cursor: "pointer" }}
          onClick={handleOpen}
        >
          <div>
            <img className="edit-icon" src={addIcon} />
          </div>
          <span className="d-none d-md-block">Add Issue</span>
        </li>
      </ul>
      <div className="tab-content bg-transparent">
        <div
          id="note-full-container"
          className="note-has-grid"
          style={{ width: "100%" }}
        >
          {items.map((item,index) => (
            <div key={index}>
              <Card
                setItemId={setItemId}
                item={item}
                handleDelete={handleDelete}
                handleEditIssue={handleEditIssue}
                handleStatusEdit={handleStatusEdit}
              />
            </div>
          ))}
        </div>
      </div>

      <CreateIssueModal
        isOpen={isOpen}
        handleClose={handleClose}
        boardId={boardId}
        handleCreateIssue={handleCreateIssue}
      />
    </div>
  );
}

export default App;
