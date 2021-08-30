import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContentDetails from "../../../components/ContentDetails/ContentDetails";

import LoadingComponent from "../../../components/LoadingComponent";
import AppPagination from "../../../components/Pagination/AppPagination";
import { fetchExpensesAction } from "../../../redux/slices/expenses/expenseAction";
import { userProfileAction } from "../../../redux/slices/users/usersSlices";

const UserExpenses = ({ location: { state } }) => {
  console.log(state);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userProfileAction(page));
  }, [page]);
  //user expenses

  const user = useSelector(state => state.users);
  const { profile, userLoading, userAppErr, userServerErr } = user;

  return (
    <>
      <section className="py-6">
        <div className="container-fluid">
          <div className="position-relative border rounded-2">
            <a className="position-absolute top-0 end-0 mt-4 me-4" href="#"></a>
            <div className="pt-8 px-8 mb-8">
              <h6 className="mb-0">Recent transactions</h6>
              <p className="mb-0">Lorem ipsum dolor sit amet consectutar</p>
            </div>
            <table className="table">
              <thead>
                <tr className="table-active">
                  <th scope="col">
                    <button className="btn d-flex align-items-centerr text-uppercase">
                      <small>Withdrawed By</small>
                    </button>
                  </th>
                  <th scope="col">
                    <button className="btn d-flex align-items-centerr text-uppercase">
                      <small>Title</small>
                    </button>
                  </th>
                  <th scope="col">
                    <button className="btn d-flex align-items-centerr text-uppercase">
                      <small>Description</small>
                    </button>
                  </th>
                  <th scope="col">
                    <button className="btn d-flex align-items-centerr text-uppercase">
                      <small>Amount</small>
                    </button>
                  </th>
                  <th scope="col">
                    <button className="btn d-flex align-items-centerr text-uppercase">
                      <small>Date</small>
                    </button>
                  </th>
                  <th scope="col">
                    <button className="btn d-flex align-items-centerr text-uppercase">
                      <small>Action</small>
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                <>
                  {userLoading ? (
                    <LoadingComponent />
                  ) : userAppErr || userServerErr ? (
                    <div>err</div>
                  ) : profile?.expenses?.length <= 0 ? (
                    <h2>No Expense Found</h2>
                  ) : (
                    profile?.expenses.map(exp => (
                      <ContentDetails item={exp} key={exp?._id} />
                    ))
                  )}
                </>
              </tbody>
            </table>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20px",
          }}
        ></div>
      </section>
    </>
  );
};

export default UserExpenses;