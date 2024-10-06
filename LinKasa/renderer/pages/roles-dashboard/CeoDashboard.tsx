import Dashboard from "../dashboard/Dashboard";
import {usePageState} from "../abstract/AbstractDashboard";
import FlightSharp from "@mui/icons-material/FlightSharp"
import { Typography } from "@mui/material";

const CeoDashboard = () => {

    const states = {
        Flight : {
            icon : <FlightSharp></FlightSharp>,
            body:(
                <Typography>
                    Hi
                </Typography>
            )
        }

    }


    const { pageState, listItems, changeState } = usePageState(
        "Dashboard",
        states
      );


    return <Dashboard title={pageState} listItems={listItems}>
         {states[pageState].body}
    </Dashboard>
}

export default CeoDashboard;