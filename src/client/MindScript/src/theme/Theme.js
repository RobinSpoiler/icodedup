import { createTheme } from "@mui/material";
import { red, orange, pink } from "@mui/material/colors";

export const Theme = createTheme({
    palette: {
        primary: {
            main: '#161A23'
        },
        secondary: {
            main: '#252836'
        },
        error: {
            main: red.A400
        },
        success:{
            main: '#55D16E'
        },
        appDark: {
            text: '#FFF',
            box: '#FFF',
            bgBox: '#303645',
            icon: '#FFF',
            link: '#FFF',
            button: '#FF6B00',
            adminButton: '#18A0FB',
            menuDropdown: '#000',
            selectHover: "#404655",
            scrollBar: "#A4A6A5",
            progressBar: '#21AE2F',
            progressBg: '#6D7483'
        }
    },
    components: {
        MuiDataGrid: {
          styleOverrides: {
            footer: {
              color: '#FFF',
            },
          },
        },
      },
})