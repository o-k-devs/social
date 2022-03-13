import React, { useEffect, useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import gsap, { Power3 } from 'gsap';

const Wrapper = styled.div`
  height: calc(100vh - 300px);
  background-color: #292829;
  display: flex;
  justify-content: center;
  padding: 150px;
  overflow: hidden;
  position: relative;
`;

const Button = styled.button`
  position: relative;
  height: 200px;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: unset;
  outline: none;
  border: none;
  cursor: pointer;
`;

const IconWrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Pause = styled.div`
  position: relative;
  height: 100px;
  width: 100px;
  opacity: 1;
`;

const Left = styled.div`
  position: absolute;
  height: 100px;
  width: 35px;
  top: 0;
  left: 0;
  background-color: #e757ff;
`;

const Right = styled.div`
  position: absolute;
  height: 100px;
  width: 35px;
  top: 0;
  right: 0;
  background-color: #e757ff;
`;

const MStart = { x: 20, y: 20 };
const MEnd = { x: 40, y: 20 };

const L1Start = { x: 20, y: 20 };
const L1End = { x: 0, y: 40 };

const VStart = 20;
const VEnd = 0.1;

const L2Start = { x: 20, y: 20 };
const L2End = { x: 40, y: 20 };

const playInOut = (progress, playRef, pauseRef, toValue) => {
  gsap.killTweensOf(playRef.current);
  gsap.killTweensOf(pauseRef.current);
  gsap.killTweensOf(pauseRef.current.children);

  const playing = toValue === 0;

  gsap.to(progress.current, {
    value: toValue,
    duration: 0.4,
    ease: playing ? Power3.easeIn : Power3.easeInOut,
    onUpdate: () => {
      const { value } = progress.current;

      const power3 = Power3.easeIn(value);

      const MX = gsap.utils.interpolate(MStart.x, MEnd.x, value);
      const MY = gsap.utils.interpolate(MStart.y, MEnd.y, value);
      const L1X = gsap.utils.interpolate(L1Start.x, L1End.x, power3);
      const L1Y = gsap.utils.interpolate(L1Start.y, L1End.y, power3);
      const V = gsap.utils.interpolate(VStart, VEnd, power3);
      const L2X = gsap.utils.interpolate(L2Start.x, L2End.x, value);
      const L2Y = gsap.utils.interpolate(L2Start.y, L2End.y, value);

      const d = `M ${MX} ${MY} L ${L1X} ${L1Y} V${V} L ${L2X} ${L2Y} Z`;
      playRef.current.setAttribute('d', d);
    },
  });

  const wrapperWidth = playing ? 100 : 150;
  const childWidth = playing ? 35 : 0;
  const timeline = gsap.timeline();
  timeline
    .to(
      pauseRef.current,
      {
        width: wrapperWidth,
        duration: playing ? 0.3 : 0.3,
        delay: playing ? 0.1 : 0.2,
        ease: playing ? Power3.easeIn : Power3.easeOut,
      },
      'together',
    )
    .to(
      pauseRef.current.children,
      {
        width: childWidth,
        duration: playing ? 0.3 : 0.3,
        delay: playing ? 0 : 0.2,
        ease: playing ? Power3.easeIn : Power3.easeOut,
        stagger: 0.02,
      },
      'together',
    );
};

const SPACE_BAR = 32;

/**
 * Play/pause interaction
 */
function MarchTwelve() {
  const [playing, setPlaying] = useState(false);
  const progress = useRef({ value: 0 });

  const buttonRef = useRef();
  const playRef = useRef();
  const pauseRef = useRef();

  const onKeydown = useCallback(event => {
    switch (event.which) {
      case SPACE_BAR:
        buttonRef.current.click();
        break;

      default:
        break;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', onKeydown);
    return () => {
      window.removeEventListener('keydown', onKeydown);
    };
  }, [onKeydown]);

  useEffect(() => {
    if (playing) {
      playInOut(progress, playRef, pauseRef, 1);
    } else {
      playInOut(progress, playRef, pauseRef, 0);
    }
  }, [playing]);

  return (
    <Wrapper>
      <Button
        type="button"
        ref={buttonRef}
        onClick={() => setPlaying(!playing)}
      >
        <IconWrapper>
          <svg
            width="100"
            height="100"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path ref={playRef} fill="#E757FF" />
          </svg>
        </IconWrapper>
        <IconWrapper>
          <Pause ref={pauseRef}>
            <Left />
            <Right />
          </Pause>
        </IconWrapper>
      </Button>
    </Wrapper>
  );
}

export default MarchTwelve;
