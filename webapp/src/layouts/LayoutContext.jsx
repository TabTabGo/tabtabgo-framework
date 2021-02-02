import React, { useState } from 'react';

const LayoutContext = React.createContext([{}, () => {}]);

const LayoutProvider = (props) => {
  const [state, setState] = useState({});
  return (
    <LayoutContext.Provider value={[state, setState]}>{props.children}</LayoutContext.Provider>
  );
};

export { LayoutContext, LayoutProvider };
