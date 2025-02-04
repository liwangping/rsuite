import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defaultClassPrefix } from '../utils/prefix';
import { StandardProps } from '../@types/common';

interface ProgressBarProps extends StandardProps {
  vertical?: boolean;
  rtl?: boolean;
  start?: number;
  end?: number;
}

function ProgressBar(props: ProgressBarProps) {
  const { vertical, rtl, end = 0, start = 0, style, className } = props;
  const sizeKey = vertical ? 'height' : 'width';
  const dirKey = rtl ? 'right' : 'left';
  const startKey = vertical ? 'top' : dirKey;
  const styles = {
    ...style,
    [startKey]: `${start}%`,
    [sizeKey]: `${end - start}%`
  };

  return (
    <div
      style={styles}
      className={classNames(defaultClassPrefix('slider-progress-bar'), className)}
    />
  );
}

ProgressBar.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  vertical: PropTypes.bool,
  rtl: PropTypes.bool,
  start: PropTypes.number,
  end: PropTypes.number
};

export default ProgressBar;
