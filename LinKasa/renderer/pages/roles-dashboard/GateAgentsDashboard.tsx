import Dashboard from "../dashboard/Dashboard";
import {usePageState} from "../abstract/AbstractDashboard";
import FlightSharp from "@mui/icons-material/FlightSharp"

const GateAgentsDashboard = () => {

    const states = {
        Flight : {
            icon : <FlightSharp></FlightSharp>
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

export default GateAgentsDashboard;