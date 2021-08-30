import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ContentDetails from "../../components/ContentDetails/ContentDetails";

import LoadingComponent from "../../components/LoadingComponent";
import AppPagination from "../../components/Pagination/AppPagination";
import { fetchIncomesAction } from "../../redux/slices/income/incomeSlices";

const IncomeList = ({ location: { state } }) => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  //hide some table tabs to display user income information
  const dataType = state?.data;
  useEffect(() => {
    dispatch(fetchIncomesAction(page));
  }, [page]);
  const income = useSelector(state => state.income);
  const { loading, incomeList, appErr, serverErr } = income;

  const history = useHistory();
  // const navigate = expense => {
  //   history.push({
  //     pathname: "/edit",
  //     state: {
  //       data,
  //     },
  //   });
  // };
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
                  {!dataType && (
                    <th scope="col">
                      <button className="btn d-flex align-items-centerr text-uppercase">
                        <small>Withdrawed By</small>
                      </button>
                    </th>
                  )}
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
                {loading ? (
                  <LoadingComponent />
                ) : appErr || serverErr ? (
                  <div>err</div>
                ) : incomeList?.length <= 0 ? (
                  <h2>No Expense Found</h2>
                ) : (
                  incomeList?.docs?.map(exp => (
                    <ContentDetails
                      dataType={dataType}
                      item={exp}
                      key={exp?._id}
                    />
                  ))
                )}
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
        >
          {incomeList?.docs?.length > 1 && (
            <AppPagination setPage={setPage} items={incomeList?.totalPages} />
          )}
        </div>
      </section>
    </>
  );
};

export default IncomeList;