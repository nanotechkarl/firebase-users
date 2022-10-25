import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useDidMountEffect from "../hooks/useDidMountEffect";
import DeleteModal from "../components/modal/DeleteModal";
import Table from "../components/table/Table";
import { getUsers, getUserObject, deleteUserById } from "../store/actions/user";

export default function Users() {
  //#region - HOOKS
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((state) => state.users || []);
  const [deleteModalState, setDeleteModalState] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState({});
  const [lastDeletedAccount, setLastDeletedAccount] = useState({});
  //#endregion

  //#region - FETCH
  useEffect(() => {
    fetchData();
  }, []); //eslint-disable-line

  useDidMountEffect(() => {
    refetchAllAfterDelete();
  }, [lastDeletedAccount]); //eslint-disable-line

  const fetchData = async () => {
    await dispatch(getUsers());
  };

  const refetchAllAfterDelete = async () => {
    await dispatch(getUsers());
  };
  //#endregion

  //#region - EDIT
  const redirectEdit = (account) => {
    navigate(`/edit-user?id=${account.id}`);
  };
  //#endregion

  //#region - DELETE
  const showDelete = async (account) => {
    setDeleteModalState(true);
    setDeleteAccount(account);
  };

  const confirmDelete = async () => {
    await dispatch(deleteUserById(deleteAccount.id));
    setDeleteModalState(false);
    setLastDeletedAccount(deleteAccount);
  };
  //#endregion

  return (
    <div className="users-page">
      <div className="users-header-div">
        <h2>
          <b>Users</b>
        </h2>
      </div>
      <div id="users-table-div">
        <Table
          header={["Name", "User Email ID"]}
          keys={["name", "email"]}
          data={store.users}
          onEdit={redirectEdit}
          onDelete={showDelete}
          custom={{ disableDelete: store.currentUser }}
        />
      </div>
      <DeleteModal
        onHide={() => setDeleteModalState(false)}
        handleDelete={confirmDelete}
        show={deleteModalState}
        account={deleteAccount}
      />
    </div>
  );
}
