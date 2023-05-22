import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { doesSectionHaveLeadingZeros } from "@mui/x-date-pickers/internals/hooks/useField/useField.utils";

export function CounterCell({ data, onUpdateRows }) {
  const [counts, setCounts] = useState({});
  const [rowsData, setRowData] = useState({});

  const handleToggle = (module, value) => {
    setCounts((prevCounts) => {
      const currentCount = prevCounts[module.name] || 0;
      if (value === "up") {
        return {
          ...prevCounts,
          [module.name]: currentCount + 1,
        };
      } else if (value === "down" && currentCount > 0) {
        return {
          ...prevCounts,
          [module.name]: currentCount - 1,
          // [module.name]: currentCount - 1,

        };
      } else {
        return prevCounts;
      }
    });

  };

  useEffect(() => {
    // Update object here
    const val = data.map((module) => ({
      module_id: module.id,
      n_questions: counts[module.name] || 0,
    }));
    setRowData(val)
  }, [counts]);
  // console.log(rowsData);
  onUpdateRows(rowsData);


  return (
    <TableContainer sx={{
      height: "35vh",
      mt: 2,
      borderRadius: 2,
      "&::-webkit-scrollbar": {
        width: 5,
      },
      "&::-webkit-scrollbar-track": {
        backgroundColor: "secondary.main",
        borderRadius: 2,
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "appDark.scrollBar",
        borderRadius: 2,
      },

    }}>
      <Table sx={{ width: 1 }} aria-label="simple table">
        <TableHead sx={{ overflowX: "initial" }}>
          <TableRow>
            <TableCell
              align="left"
              sx={{
                color: "appDark.text",
                position: "sticky",
                top: 0,
                bgcolor: "primary.main",
                zIndex: 1,
              }}
            >
              Módulos
            </TableCell>
            <TableCell
              align="right"
              sx={{
                color: "appDark.text",
                position: "sticky",
                top: 0,
                bgcolor: "primary.main",
                zIndex: 1,
              }}
            >
              Ejercicios
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((module) => (
            <TableRow key={module.name}>
              <TableCell
                align="left"
                sx={{ color: "appDark.text", paddingRight: 0 }}
                component="th"
                scope="row"
              >
                {module.name}
              </TableCell>
              <TableCell sx={{ color: "appDark.text" }}>
                <ToggleButtonGroup
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: 'center',
                    svg: { color: "appDark.text", width: "12px", height: "10px" },
                    "& .MuiToggleButton-root": { padding: "3px" },
                    columnGap: 1,

                  }}
                  value={counts[module.name] || 0}
                  exclusive
                  onChange={(event, value) => handleToggle(module, value)}
                >
                  <Typography sx={{ mb: "2px" }}>
                    {counts[module.name] || 0}
                  </Typography>
                  <ToggleButtonGroup
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: 'center',

                      svg: { color: "appDark.text", width: "12px", height: "10px" },
                      "& .MuiToggleButton-root": { padding: "3px" },
                      flexDirection: 'column',

                    }}
                    value={counts[module.name] || 0}
                    exclusive
                    onChange={(event, value) => handleToggle(module, value)}
                  >
                    <ToggleButton sx={{ bgcolor: "#404655" }} value="up">
                      <ArrowUpwardIcon />
                    </ToggleButton>
                    <ToggleButton sx={{ bgcolor: "#404655" }} value="down">
                      <ArrowDownwardIcon />
                    </ToggleButton>
                  </ToggleButtonGroup>
                </ToggleButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}