import { makeStyles } from "@material-ui/core";
import { deepPurple } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 12,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: { color: "rgba(0, 183, 255, 1)" },
  image: {
    marginLeft: "4px",
    borderRadius: "30px",
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
  },
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
    width: "400px",
  },
  profile: { display: "flex", justifyContent: "space-between", width: "400px" },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  userName: {
    display: "flex",
    alignItems: "center",
  },
}));
