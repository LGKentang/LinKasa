import Dashboard from "../dashboard/Dashboard";
import {usePageState} from "../abstract/AbstractDashboard";

const defaultPage = () => {

    const states = { }
    const { pageState, listItems, changeState } = usePageState(
        "Dashboard",
        states
      );
    return <Dashboard title={pageState} listItems={listItems}>
      ''
    </Dashboard>
}

export default defaultPage;