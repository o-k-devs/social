import { css } from 'styled-components';
import sizes from './sizes';

const media = {
  large: (...args) => css`
    @media (min-width: ${sizes.media.mediumMaxWidth + 1}px) {
      ${css(...args)}
    }
  `,
  medium: (...args) => css`
    @media (max-width: ${sizes.media.mediumMaxWidth}px) {
      ${css(...args)}
    }
  `,
  small: (...args) => css`
    @media (max-width: ${sizes.media.smallMaxWidth}px) {
      ${css(...args)}
    }
  `,
};

export default media;
