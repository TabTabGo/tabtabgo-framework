//import Re from "react";
import React, { useState } from 'react';
import update from 'immutability-helper';
export interface ComponentContextProps {
  setComponent: (key: string, component: any) => void;
  getComponent: (key: string, props: any) => any;
}

export const ComponentContext = React.createContext<ComponentContextProps>({
  setComponent: (key: string, component: any) => {},
  getComponent: (key: string, props: any) => null,
} as ComponentContextProps);

export interface ComponentKeyValue {
  key: string;
  component: any;
  defaultProps?: any;
}
export type ComponentProviderProps = {
  components?: Array<ComponentKeyValue>;
  defaultComponents: any;
  children: any;
};

export const ComponentProvider = ({
  components,
  children,
  defaultComponents,
}: ComponentProviderProps) => {
  const [listOfComponents, setListOfComponents] = useState<Array<ComponentKeyValue>>(
    components ? components : ([] as Array<ComponentKeyValue>),
  );
  //todo use Element
  const setComponent = (key: string, component: any, defaultProps?: any) => {
    const keyValue = { key, component, defaultProps } as ComponentKeyValue;
    setListOfComponents(update(listOfComponents, { $push: [keyValue] }));
  };

  const getComponent = (key: string, props: any) => {
    const comp = listOfComponents.find((c) => c.key === key);
    if (comp && comp.component && typeof comp.component === 'function')
      return comp.component(props);
    else if (comp) return comp;
    return null;
  };

  return (
    <ComponentContext.Provider
      value={{
        setComponent,
        getComponent,
        ...defaultComponents,
      }}
    >
      {children}
    </ComponentContext.Provider>
  );
};

export default ComponentProvider;

export const withComponentProvider = (Component: any) => {
  return function WrapperComponent(props: any) {
    return (
      <ComponentContext.Consumer>
        {(state) => <Component {...props} componentProvider={state} />}
      </ComponentContext.Consumer>
    );
  };
};
