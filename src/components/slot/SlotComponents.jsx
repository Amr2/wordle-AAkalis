import React, { useEffect } from "react";
import { allIndexOfChar, textOnlyRx } from "../../helpers";
import { StyledSlot } from "./styles/SlotStyles";

const SlotComponents = React.forwardRef(
  (
    {
      current,
      next,
      prev,
      word,
      answer,
      index,
      setAnswer,
      checkWord,
      setCurrentSlot,
      ...props
    },
    ref
  ) => {
    const value = answer?.[index]?.value ?? ref?.current?.defaultValue ?? "";
    // handleMethods
    const checkCharMissPlaced = (char) => {
      const indexes = allIndexOfChar(word, char);
      if (word?.[index] !== char) {
        if (indexes.includes(index)) return false;
        if (word?.[index] === char) return false;
        return true;
      }
      if (word?.[index] === char) return false;
      return true;
    };
    const checkCharNotExisten = (char) => {
      if (!word.includes(char)) {
        return true;
      }
      return false;
    };

    const handlValueChange = (event) => {
      event.preventDefault();
      if (event.keyCode === 13 && next == null) {
        checkWord();
        return;
      }
      if (event.keyCode === 8) {
        let tempObj = { ...answer };
        tempObj[index] = { index, value: "" };
        setAnswer({ ...tempObj });
        prev != null && setCurrentSlot(prev);
        return;
      }

      if (textOnlyRx.test(event.key)) {
        let tempObj = { ...answer };
        tempObj[index] = { index, value: event.key };
        setAnswer({ ...tempObj });
        next != null && setCurrentSlot(next);
      }
    };

    useEffect(() => {
      if (ref !== null && ref.current && current === ref) {
        current.current.focus();
      }
    }, [current]);

    return (
      <StyledSlot
        type={"text"}
        aria-disabled={current !== ref}
        disabled={current !== ref}
        value={value}
        readOnly={current !== ref}
        onKeyUp={handlValueChange}
        data-notexist={checkCharNotExisten(value)}
        data-missplaced={checkCharMissPlaced(value)}
        ref={ref}
      />
    );
  }
);

export default SlotComponents;
