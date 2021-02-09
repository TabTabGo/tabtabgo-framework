import React from 'react';
export interface ITab {
    route: string;
    label: string;
    component: React.ReactElement;
}
declare type RouterTabProps = {
    tabs: Array<ITab>;
    className?: string;
    subRouteName?: string;
    routeParameters?: any /** route parameters order is important */;
};
declare const RouterTab: ({ className, tabs, subRouteName, routeParameters }: RouterTabProps) => JSX.Element;
export default RouterTab;
