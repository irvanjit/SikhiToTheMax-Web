import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ACTIONS, clickEvent } from '../util/analytics';
import { toShabadURL } from '../util';
import TwitterIcon from './Icons/Twitter';
import ClipboardIcon from './Icons/Clipboard';
import ExternalLinkIcon from './Icons/ExternalLink';

export const supportedActions = ['openShabad', 'copy', 'tweet'];

const openShabad = () =>
  clickEvent({
    action: ACTIONS.LINE_SHARER,
    label: ' open-shabad',
  });
export default class Actions extends React.PureComponent {
  static defaultProps = {
    disabledActions: [],
  };

  static propTypes = {
    shabad: PropTypes.shape({
      id: PropTypes.string,
      shabadid: PropTypes.string,
    }),
    disabledActions: PropTypes.arrayOf(PropTypes.oneOf(supportedActions)),
    onCopyClick: PropTypes.func,
    onTweetClick: PropTypes.func,
  };

  render() {
    const { shabad, disabledActions, onCopyClick, onTweetClick } = this.props;
    const actions = {
      openShabad: (
        <Link
          role="button"
          aria-label="Go to shabad"
          title="Go to shabad"
          onClick={openShabad}
          to={toShabadURL({ shabad })}
        >
          <ExternalLinkIcon />
        </Link>
      ),
      copy: (
        <a
          className="copy"
          onClick={onCopyClick}
          role="button"
          aria-label="Copy to clipboard"
          title="Copy to clipboard"
        >
          <ClipboardIcon />
        </a>
      ),
      tweet: (
        <a
          className="twitter"
          onClick={onTweetClick}
          role="button"
          aria-label="Tweet this line"
          title="Tweet this line"
        >
          <TwitterIcon />
        </a>
      ),
    };
    return (
      <div className="share">
        {supportedActions
          .filter(e => !disabledActions.includes(e))
          .map(action => actions[action])}
      </div>
    );
  }
}
