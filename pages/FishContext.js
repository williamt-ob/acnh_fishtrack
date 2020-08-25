import React, { useState, useEffect } from 'react';

export const FishContext = React.createContext({});

export const FishContextProvider = (props) => {
  const [count, setCount] = useState(1);

  const increment = () => {
    setCount(count + 1);
  }

  const decrement = () => {
    setCount(count - 1);
  }

  const context = {count, increment, decrement};

  return (
    <FishContext.Provider value={context}>
      {props.children}
    </FishContext.Provider>
  );
};
