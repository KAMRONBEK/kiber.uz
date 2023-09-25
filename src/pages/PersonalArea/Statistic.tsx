import "./style.scss";
import { ArrowUpward } from "@mui/icons-material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Calculate from "../../assets/images/calculate.svg";
import { experimentalStyled, TableContainer } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import userService from "../../services/userService";

const StyledTableContainer = experimentalStyled(TableContainer)(
  ({ theme }) => ({
    height: "calc(100vh - 180px)",
    backgroundColor: "#fff",
  })
);

const Statistic = () => {
  const params = useParams();

  const [tableData, setTableData] = useState(null);
  const [loader, setLoader] = useState(true);

  const fetchTableData = () => {
    setLoader(true);

    userService
      .getUserDocument(params.tin)
      .then((res) => {
        // @ts-ignore
        setTableData(res);
      })
      .finally(() => setLoader(false));
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  return (
    <div className="PersonalArea">
      <StyledTableContainer>
        <div className="statistic-container">
          {/* @ts-ignore */}
          {tableData?.map((data) => (
            <div className="box">
              <p>{data?.title}</p>

              <div className="in-box">
                <div
                  style={{
                    width: "40%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div className="outgoing-box">
                    <p className="outgoing-text">{data?.data[0].name}</p>
                    <div className="outgoing-number-box">
                      <ArrowUpward color="primary" sx={{ fontSize: 25 }} />
                      <p>{data?.data[0].number}</p>
                    </div>
                  </div>
                  <div className="inbox-box">
                    <p className="inbox-text">{data?.data[1].name}</p>
                    <div className="inbox-number-box">
                      <ArrowDownwardIcon
                        color="primary"
                        sx={{ fontSize: 25 }}
                      />
                      <p>{data?.data[1].number}</p>
                    </div>
                  </div>
                </div>
                <img src={Calculate} alt="Calculate" />
              </div>
            </div>
          ))}
        </div>
      </StyledTableContainer>
    </div>
  );
};

export default Statistic;
