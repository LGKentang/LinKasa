import Dashboard from "../dashboard/Dashboard";
import {usePageState} from "../abstract/AbstractDashboard";
import DashboardIcon from "@mui/icons-material/Dashboard"
import { Typography } from "@mui/material";

const BaggageSecuritySupervisorDashboard = () => {

    const states = {
        Dashboard : {
            icon : <DashboardIcon></DashboardIcon>,
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

export default BaggageSecuritySupervisorDashboard 
