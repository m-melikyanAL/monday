import { useState } from "react";
import { Modal } from "react-bootstrap";

const EditIssueModal = ({
  isOpen,
  handleClose,
  handleEditIssue,
  name,
  desc,
}: {
  isOpen: boolean;
  handleClose: () => void;
  handleEditIssue: (
    new_name: string,
    handleClose: () => void,
    new_desc: string
  ) => () => void;
  name: string;
  desc?: string;
}) => {
  const [new_name, setNew_Name] = useState(name);
  const [new_desc, setNew_Desc] = useState(desc);

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
                        <label>Edit Title</label>
                        <input
                          type="text"
                          id="note-has-title"
                          className="form-control"
                          placeholder="Title"
                          value={new_name}
                          onChange={(e) => setNew_Name(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 mb-3">
                      <div className="note-title">
                        <label>Edit Desctiprion</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Desctiprion"
                          value={new_desc}
                          onChange={(e) => setNew_Desc(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="modal-footer">
            <button
              id="btn-n-save"
              className="float-left btn btn-success"
              onClick={handleEditIssue(
                new_name,
                handleClose,
                new_desc as string
              )}
            >
              Save
            </button>
          </Modal.Footer>
        </div>
      </div>
    </Modal>
  );
};

export default EditIssueModal;
