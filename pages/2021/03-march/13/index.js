import React, { useRef, useState, useEffect, useCallback } from 'react';
import gsap, { Cubic } from 'gsap';
import _ from 'lodash';

import styled from 'styled-components';
import colors from 'styles/colors';
import fonts from 'styles/fonts';

import Caret from './Caret';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  margin: 200px;
`;

const Button = styled.button`
  height: 75px;
  width: 75px;
  border-radius: 50px;
  border: 2px solid ${colors.backgroundLight};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const HiddenWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 25px;
  overflow: hidden;
  height: 200px;
  pointer-events: none;
  flex-wrap: nowrap;
`;

const HiddenContent = styled.div`
  position: relative;
  padding-left: 75px;
  flex-wrap: nowrap;
  transform: translateX(-100%);
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  opacity: 0;
  margin-bottom: 20px;
`;

const Title = styled.p`
  font-family: ${fonts.primary.regular};
  color: ${colors.font};
  font-size: 50px;
  line-height: 50px;
  margin-right: 10px;
  text-transform: uppercase;
  padding-top: 12px;
  flex-shrink: 0;
`;

const ItemsWrapper = styled.div``;

const Item = styled.p`
  font-family: ${fonts.primary.light};
  color: ${colors.font};
  font-size: 30px;
  line-height: 40px;
  flex-shrink: 0;
  opacity: 0;
  overflow: hidden;
  transform: translateY(-12px);

  &:before {
    content: '- ';
    color: ${colors.secondary};
  }
`;

const SPACE_BAR = 32;

const items = [
  'A thing',
  'Another thing',
  'A third and most interesting thing',
];

export default function InvisibleAccordion() {
  const hiddenWrapperRef = useRef();
  const titleRef = useRef();
  const buttonRef = useRef();
  const itemsWrapper = useRef();
  const caretRef = useRef();

  const [open, setOpen] = useState(false);

  const animateOpen = () => {
    const ease = Cubic.easeIn;
    gsap.killTweensOf(hiddenWrapperRef.current);
    const timeline = gsap.timeline();
    timeline
      .to(
        hiddenWrapperRef.current,
        {
          width: 'auto',
          x: 0,
          duration: 0.5,
          ease,
        },
        'together',
      )
      .to(
        titleRef.current,
        { opacity: 1, x: 0, duration: 0.15, ease },
        'together',
      )
      .to(
        itemsWrapper.current.children,
        { opacity: 1, y: 0, duration: 0.25, delay: 0.5, stagger: 0.05 },
        'together',
      )
      .to(
        caretRef.current,
        { rotate: -90, x: -20, duration: 0.2, ease },
        'together',
      )
      .to(
        '.caret-stroke',
        { stroke: colors.secondary, duration: 0.3, delay: 0.4, ease },
        'together',
      );
  };

  const animateClosed = () => {
    const ease = Cubic.easeOut;
    gsap.killTweensOf(hiddenWrapperRef.current);
    const timeline = gsap.timeline();
    timeline
      .to(
        hiddenWrapperRef.current,
        { x: '-100%', duration: 0.5, delay: 0.2, ease },
        'together',
      )
      .to(
        titleRef.current,
        { opacity: 0, duration: 0.2, delay: 0.3, ease },
        'together',
      )
      .to(
        itemsWrapper.current.children,
        { opacity: 0, y: -12, duration: 0.1, stagger: 0.05 },
        'together',
      )
      .to(
        caretRef.current,
        { x: 0, rotate: 0, duration: 0.4, delay: 0.4, ease },
        'together',
      )
      .to(
        '.caret-stroke',
        { stroke: colors.backgroundLight, duration: 0.4, delay: 0.6, ease },
        'together',
      );
  };

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
    if (open) {
      animateOpen();
    } else {
      animateClosed();
    }
  }, [open]);

  return (
    <Wrapper>
      <HiddenWrapper>
        <HiddenContent ref={hiddenWrapperRef}>
          <TitleRow ref={titleRef}>
            <Title>Whatever and Ever</Title>
          </TitleRow>
          <ItemsWrapper ref={itemsWrapper}>
            {_.map(items, item => (
              <Item key={item}>{item}</Item>
            ))}
          </ItemsWrapper>
        </HiddenContent>
      </HiddenWrapper>
      <Button ref={buttonRef} type="button" onClick={() => setOpen(!open)}>
        <Caret passedRef={caretRef} />
      </Button>
    </Wrapper>
  );
}
