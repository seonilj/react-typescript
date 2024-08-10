import React, { useRef, useState, useEffect } from "react";
import { useSpring, a } from "@react-spring/web";
import useMeasure from "react-use-measure";
import { Container, Title, Frame, Content, toggle } from "./styles";
import * as Icons from "./icons";

import logo from './logo.svg';
import './App.css';

function usePrevious<T>(value: T) {
  const ref = useRef<T>();
  useEffect(() => void (ref.current = value), [value]);
  return ref.current;
}

const Tree = React.memo<
  React.HTMLAttributes<HTMLDivElement> & {
    defaultOpen?: boolean;
    name: string | JSX.Element;
  }
>(({ children, name, style, defaultOpen = false }) => {
  const [isOpen, setOpen] = useState(defaultOpen);
  const previous = usePrevious(isOpen);
  const [ref, { height: viewHeight }] = useMeasure();
  const { height, opacity, y } = useSpring({
    from: { height: 0, opacity: 0, y: 0 },
    to: {
      height: isOpen ? viewHeight : 0,
      opacity: isOpen ? 1 : 0,
      y: isOpen ? 0 : 20,
    },
  });
  // @ts-ignore
  const Icon =
    Icons[`${children ? (isOpen ? "Minus" : "Plus") : "Close"}SquareO`];
  return (
    <Frame>
      <Icon
        style={{ ...toggle, opacity: children ? 1 : 0.3 }}
        onClick={() => setOpen(!isOpen)}
      />
      <Title style={style}>{name}</Title>
      <Content
        style={{
          opacity,
          height: isOpen && previous === isOpen ? "auto" : height,
        }}
      >
        <a.div ref={ref} style={{ y }} children={children} />
      </Content>
    </Frame>
  );
});

export default function App() {
  return (
    <Container>
      <Tree name="🏰 Hogwarts Castle: Ground Level" defaultOpen>
        <Tree name="Great Hall">
          <Tree name="main gathering area in the school" />
          <Tree name="4 long tables for each house 📘📕📗📒">
            <Tree name="3 meals per a day" style={{ color: "#37ceff" }} />
          </Tree>
          <Tree name="holding special events">
            <Tree name="Start-of-Term Feast 👩‍🏫" style={{ color: "#37ceff" }} />
            <Tree name="Hallowe'en Feast 🧛‍♂️" style={{ color: "#37ceff" }} />
            <Tree name="Christmas Feast 🎅" style={{ color: "#37ceff" }} />
            <Tree name="Ordinary Wizarding Level Examinations" />
            <Tree name="Nastily Exhausting Wizarding Tests" />
          </Tree>
        </Tree>

        <Tree name="Entrance Hall">
          <Tree name="= The Front Hall" />
          <Tree name="Grand Staircase 🎢">
            <Tree name="as high as the 7th level" />
            <Tree name="a wide marble staircase" />
            <Tree name="Honeydukes" style={{ color: "#37ceff" }}>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: 200,
                  padding: 10,
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "#f393a0",
                    borderRadius: 5,
                  }}
                />
              </div>
            </Tree>
          </Tree>
        </Tree>

        <Tree name="Classrooms">
          <Tree name="Classroom 1B:">
            <div style={{ color: "#37ceff" }}>Transfiguration</div>
            <Tree name="'Treat inanimate objects respectfully.' — Notice" />
          </Tree>
          <Tree name="Classroom 11: ">
            <div style={{ color: "#37ceff" }}>Divination</div>
            <Tree name="Firenze was unable to climb the ladder" />
          </Tree>
        </Tree>

        <Tree name="Training grounds">
          <Tree name="way to Quidditch Pitch" />
        </Tree>

        <Tree name={<span> supported by magic 🧙‍♀️🧙‍♂️</span>} />
      </Tree>
    </Container>
  );
}

/* lists info from:
https://harrypotter.fandom.com/wiki/Great_Hall
https://harrypotter.fandom.com/wiki/Great_Hall
- https://harrypotter.fandom.com/wiki/Grand_Staircase
https://harrypotter.fandom.com/wiki/Classroom_1B
https://harrypotter.fandom.com/wiki/Classroom_Eleven
https://harrypotter.fandom.com/wiki/Training_grounds_way_to_Quidditch_Pitch
*/