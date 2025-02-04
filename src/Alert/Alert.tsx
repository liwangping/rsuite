import classNames from 'classnames';
import { prefix } from '../utils';
import { defaultClassPrefix } from '../utils/prefix';
import NoticeManager, { NoticeManagerProps } from '../Notification/NoticeManager';
import { StandardProps } from '../@types/common';

export interface AlertProps extends StandardProps {
  /** The prefix of the component CSS class */
  classPrefix?: string;

  /** The distance from the top of the message box */
  top?: number;

  /** message box duration (Unit: milliseconds) */
  duration?: number;

  /** The parent container of Alert */
  getContainer?: () => HTMLElement;
}

class Alert {
  props: AlertProps = {
    duration: 2000,
    top: 5,
    classPrefix: defaultClassPrefix('alert'),
    getContainer: null
  };

  _instance: any = null;

  addPrefix = name => prefix(this.props.classPrefix)(name);

  setProps(nextProps: AlertProps) {
    this.props = {
      ...this.props,
      ...nextProps
    };

    if (nextProps.top !== undefined) {
      this._instance = null;
    }
  }
  getInstance(callback) {
    const { top, style, className, ...rest } = this.props;
    const props: NoticeManagerProps = {
      style: { top, ...style },
      className: classNames(className, this.addPrefix('container')),
      ...rest
    };
    NoticeManager.getInstance(props, callback);
  }

  open(
    type: string,
    content: React.ReactNode | (() => React.ReactNode),
    duration: number,
    onClose: () => void
  ) {
    if (typeof content === 'function') {
      content = content();
    }

    const nextProps = {
      content,
      duration: typeof duration !== 'undefined' ? duration : this.props.duration,
      onClose,
      type,
      closable: true
    };

    if (!this._instance) {
      this.getInstance(nextInstance => {
        this._instance = nextInstance;
        this._instance.push(nextProps);
      });
    } else {
      this._instance.push(nextProps);
    }
  }
  close(key: string) {
    this._instance?.remove?.(key);
  }

  closeAll() {
    this._instance?.removeAll?.();
  }
}

export default Alert;
