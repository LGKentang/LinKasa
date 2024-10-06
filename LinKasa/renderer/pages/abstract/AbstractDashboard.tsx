import { useState } from "react";
import { SidebarItem } from "../dashboard/DashboardBuilder";

export const usePageState = (initialState, states) => {
    const [pageState, setPageState] = useState(initialState);
  
    const listItems = Object.keys(states).map((stateName, index) => {
      const state = states[stateName];
      return SidebarItem(stateName, state.icon, state.method, index);
    });
  
    const changeState = (state) => {
      if (pageState === state) return;
      setPageState(state);
    };
  
    return { pageState, listItems, changeState };
};