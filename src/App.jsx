import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createWord } from "./helpers";
import { v4 } from "uuid";
import SlotComponents from "./components/slot/SlotComponents";
import Container from "./components/container/Container";
import { SlotsRow } from "./components/slot/styles/SlotStyles";

function App() {
  const [wordLength, setWordLength] = useState(5); // we will think with as The X-axis
  const [retries, setRetries] = useState(6); // we will think with as The Y-axis
  const [word, setWord] = useState("");
  const [answer, setAnswer] = useState({});
  const [loading, setloading] = useState(false);
  const [currentSlot, setCurrentSlot] = useState(null);
  const [activeRetry, setActiveRetry] = useState(0);

  const slotsTemplate = useMemo(() => {
    const template = [...new Array(retries)].map(() =>
      [...new Array(wordLength)].map(() => React.createRef())
    );
    setAnswer({
      ...[...new Array(wordLength)].map((_, index) => ({ value: "", index })),
    });
    setCurrentSlot(template[activeRetry][0]);
    return template;
  }, [retries, wordLength]);

  // handler methods
  const generateWord = useCallback(async () => {
    setloading(true);
    const wordString = await createWord(wordLength, 1);
    setWord(wordString);
    setloading(false);
  }, [wordLength]);

  const checkWord = () => {
    setAnswer({
      ...[...new Array(wordLength)].map((_, index) => ({ value: "", index })),
    });
    setActiveRetry((prev) => {
      if (prev === retries - 1) {
        // TODO lost state
        console.log("lost");
        return prev;
      }
      slotsTemplate.length - 1 >= prev + 1 &&
        setCurrentSlot(slotsTemplate[prev + 1][0]);
      return prev + 1;
    });
  };

  // render methods
  const renderSlotsTemplate = useMemo(() => {
    return slotsTemplate.map((yAxis, xIndex) => {
      return (
        <SlotsRow key={v4()}>
          {yAxis.map((ref, index, array) => {
            return (
              <SlotComponents
                key={xIndex + "char" + index}
                current={currentSlot}
                setAnswer={activeRetry === xIndex && setAnswer}
                setCurrentSlot={setCurrentSlot}
                ref={ref}
                answer={activeRetry === xIndex && answer}
                index={index}
                next={array?.[index + 1]}
                prev={array?.[index - 1]}
                checkWord={checkWord}
                word={word}
              />
            );
          })}
        </SlotsRow>
      );
    });
  }, [currentSlot, answer, word]);

  useEffect(() => {
    generateWord();
  }, [generateWord]);

  return (
    <div className="App">
      {word}
      <Container>
        <React.Fragment key={v4()}>{renderSlotsTemplate}</React.Fragment>
      </Container>
    </div>
  );
}

export default App;
