import React from "react";
import MyPrintsStore from "./MyPrintsStore";
import { observer } from "mobx-react";

export interface MyPrintsProps {
  myPrintsStore: MyPrintsStore;
}

@observer
export default class MyPrints extends React.Component<MyPrintsProps> {
  render() {
    const expansionPanels = this.props.myPrintsStore.prints.map((print) => <div key={print.id}>{print.name}</div>);

    return <div>{expansionPanels}</div>;
  }
}
