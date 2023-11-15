import { Dropdown, Modal } from "react-bootstrap";
import { useState } from "react";
import { selectStatus, statuses } from "../utils/constants";

const CreateIssueModal = ({
  handleCreateIssue,
  isOpen,
  handleClose,
}: {
  isOpen: boolean;
  handleClose: () => void;
  boardId: number;
  handleCreateIssue: (name: string, desc: string, status: string) => () => void;
}) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState(selectStatus);

  const handleInputChange =
    (set: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      set(e.target.value);
    };

  return (
    <Modal show={isOpen} onHide={handleClose} backdrop="static">
      <div
        className="modal-dialog modal-dialog-centered"
        role="document"
        style={{
          marginTop: "unset",
          marginLeft: "unset",
          marginRight: "unset",
        }}
      >
        <div className="modal-content border-0">
          <Modal.Header closeButton className="bg-info text-white">
            <h5 className="modal-title text-white">Add Notes</h5>
          </Modal.Header>
          <Modal.Body className="modal-body">
            <div className="notes-box">
              <div className="notes-content">
                <div id="addnotesmodalTitle">
                  <div className="row">
                    <div className="col-md-12 mb-3">
                      <div className="note-title">
                        <label>Issue Title</label>
                        <input
                          type="text"
                          id="note-has-title"
                          className="form-control"
                          placeholder="Title"
                          value={name}
                          onChange={handleInputChange(setName)}
                        />
                      </div>
                    </div>

                    <div className="col-md-12 mb-3">
                      <div className="note-title">
                        <label>Issue Desctiption</label>
                        <input
                          type="text"
                          id="note-has-title"
                          className="form-control"
                          placeholder="Desctiption"
                          value={desc}
                          onChange={handleInputChange(setDesc)}
                        />
                      </div>
                    </div>
                    <div className="row d-flex  flex-column mt-3">
                      <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                          {status}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          {statuses
                            .filter(({ value }) => value !== status)
                            .map(({ value }) => {
                              return (
                                <Dropdown.Item onClick={() => setStatus(value)} key={value}>
                                  {value}
                                </Dropdown.Item>
                              );
                            })}
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="modal-footer">
            <button
              id="btn-n-add"
              className="btn btn-danger"
              onClick={handleCreateIssue(name, desc, status)}
              disabled={!(name && desc && status !== selectStatus)}
            >
              Add
            </button>
          </Modal.Footer>
        </div>
      </div>
    </Modal>
  );
};

export default CreateIssueModal;
