import { createContext, FC, Reducer, useContext, useReducer } from 'react';

type DisplayMode = 'LIST' | 'VISUAL';

type GroupMode = 'CARD_TYPE' | 'MANA_VALUE';

type Options = {
  displayMode: DisplayMode;
  groupMode: GroupMode;
};

type ListOptionsContextData = {
  options: Options;
  toggleDisplayMode: (mode: DisplayMode) => void;
  toggleGroupMode: (mode: GroupMode) => void;
};

type OptionsReducer = Reducer<
  Options,
  | { type: 'SET_DISPLAY_MODE'; mode: DisplayMode }
  | { type: 'SET_GROUP_MODE'; mode: GroupMode }
>;

const ListOptionsContext = createContext({} as ListOptionsContextData);

export const ListOptionsProvider: FC = ({ children }) => {
  const [options, dispatchOptions] = useReducer<OptionsReducer, null>(
    (state, action) => {
      switch (action.type) {
        case 'SET_GROUP_MODE':
          return {
            ...state,
            groupMode: action.mode,
          };
        case 'SET_DISPLAY_MODE':
          return {
            ...state,
            displayMode: action.mode,
          };
        default:
          return state;
      }
    },
    null,
    () => {
      return {
        groupMode: 'CARD_TYPE',
        displayMode: 'LIST',
      };
    }
  );

  const toggleDisplayMode = (mode: DisplayMode) => {
    dispatchOptions({ type: 'SET_DISPLAY_MODE', mode });
  };

  const toggleGroupMode = (mode: GroupMode) => {
    dispatchOptions({ type: 'SET_GROUP_MODE', mode });
  };

  return (
    <ListOptionsContext.Provider
      value={{ options, toggleDisplayMode, toggleGroupMode }}
    >
      {children}
    </ListOptionsContext.Provider>
  );
};

export const useListOptions = () => useContext(ListOptionsContext);
