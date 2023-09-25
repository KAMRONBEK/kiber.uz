// @ts-ignore
export const contractReducer = (state, action) => {
  console.log({ state, action });

  switch (action.type) {
    case "addTable": {
      const newState = [...state, action.payload];
      return newState;
    }

    case "removeTable": {
      // @ts-ignore
      const newState = state.filter((_, i) => i !== action.payload);
      // @ts-ignore
      const updatedState = newState.map((el, index) => ({
        ...el,
        ContractNo: index + 1,
      }));
      return updatedState;
    }

    case "changeValue": {
      // @ts-ignore
      const result = state.map((el, i) => {
        if (i !== action.index) return el;
        if (action.name.split(" ").length === 1) {
          return {
            ...el,
            [action.name]: action.value,
          };
        } else {
          //
          const names = action.name.split(" ");

          const name1 = names[0];
          const name2 = names[1];
          return {
            ...el,
            [name1]: { ...el[name1], [name2]: action.value },
          };
        }
      });
      return result;
    }

    case "addItem": {
      // @ts-ignore
      const findTable = state.find((_, i) => i === action.index);

      const newItems = [
        ...findTable.verificationActContractItems,
        action.payload,
      ];

      const newTable = { ...findTable, verificationActContractItems: newItems };
      let copyState = JSON.parse(JSON.stringify(state));

      copyState[action.index] = newTable;

      return copyState;
    }

    case "removeItem": {
      // @ts-ignore
      let copyState = JSON.parse(JSON.stringify(state));

      //@ts-ignore
      const findTable = copyState.find((_, i) => i === action.index);
      const lengthOfTable = findTable.verificationActContractItems.length;
      if (lengthOfTable > 1) {
        findTable.verificationActContractItems.splice(-1);
      }

      copyState[action.index] = findTable;

      return copyState;
    }

    case "changeItemValue": {
      let stateCopy = JSON.parse(JSON.stringify(state));

      const result = stateCopy[action.index].verificationActContractItems.map(
        // @ts-ignore
        (el, i) => {
          if (i !== action.indexEl) return el;

          return {
            ...el,
            [action.name]: action.value,
          };
        }
      );

      stateCopy[action.index].verificationActContractItems = result;
      const newState = [...stateCopy];
      return newState;
    }
    default:
      return state;
  }
};
