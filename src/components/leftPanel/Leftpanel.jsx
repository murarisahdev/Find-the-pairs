//React
import React from "react";
//components
import SelectOption from "../common/SelectOption";
import DialogBox from "../common/DialogBox";
//material ui
import { Button, Typography, Grid, Box } from "@mui/material";

const Leftpanel = ({
  getScoreTotal,
  getScore,
  moves,
  setOption,
  option,
  showModal,
  handleRestart,
}) => {
  return (
    <>
      <Grid item xs={4}>
        <Box
          sx={{
            background: "#FBFBFB",
            borderRadius: "4px",
            padding: "15px",
            marginLeft: "56px",
          }}
        >
          <Box>
            <Box
              sx={{
                borderBottom: "1px solid #B2B2B2",
                paddingBottom: "28px",
                marginBottom: "28px",
              }}
            >
              <Typography variant="h6" sx={{ paddingBottom: "20px" }}>
                Score
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontSize: "35px",
                  paddingBottom: "20px",
                  fontWeight: "700",
                }}
              >
                <span style={{ color: "#1890FF" }}>{getScore() ?? "0"}</span> /{" "}
                {getScoreTotal()}
              </Typography>
              <span>Tries : {moves}</span>
            </Box>
            <Box>
              <Typography variant="h6">Options</Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "35px",
                }}
              >
                <span>Size</span>
                <SelectOption
                  setOption={setOption}
                  option={option}
                ></SelectOption>
              </Box>
            </Box>
            <Button
              color="primary"
              variant="contained"
              sx={{ textTransform: "capitalize" }}
              onClick={handleRestart}
            >
              Restart
            </Button>
          </Box>
          {showModal && (
            <DialogBox
              open={showModal}
              moves={moves}
              getScore={getScore}
              handleRestart={handleRestart}
            />
          )}
        </Box>
      </Grid>
    </>
  );
};

export default Leftpanel;
