import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { toShabadURL, toSearchURL } from '../../util';
import { TYPES, SOURCES, PLACEHOLDERS, TEXTS } from '../../constants';
import {
  ACTIONS,
  pageView,
  clickEvent,
  errorEvent,
} from '../../util/analytics';
import Controls, { supportedMedia } from '../../components/Controls';
import GenericError, { SachKaur } from '../../components/GenericError';
import Larivaar from '../../components/Larivaar';

export function Stub() {
  return <div className="spinner" />;
}

class Layout extends React.PureComponent {
  static propTypes = {
    q: PropTypes.string.isRequired,
    type: PropTypes.number.isRequired,
    source: PropTypes.string.isRequired,
    resultsCount: PropTypes.number.isRequired,
    nextPageOffset: PropTypes.number,
    offset: PropTypes.number,
    shabads: PropTypes.array.isRequired,
    translationLanguages: PropTypes.array.isRequired,
    transliterationLanguages: PropTypes.array.isRequired,
    larivaarAssist: PropTypes.bool.isRequired,
    larivaar: PropTypes.bool.isRequired,
    unicode: PropTypes.bool.isRequired,
    fontSize: PropTypes.number.isRequired,
  };
  render() {
    const {
      q,
      type,
      offset,
      source,
      resultsCount,
      nextPageOffset,
      shabads,
      translationLanguages = [],
      transliterationLanguages = [],
      larivaarAssist,
      larivaar,
      unicode,
      fontSize,
    } = this.props;

    if (parseInt(resultsCount, 10) === 0) {
      const className = PLACEHOLDERS[type][1] === true ? '' : 'gurbani-font';

      errorEvent({
        action: ACTIONS.NO_RESULTS_FOUND,
        label: `q:${q},source:${source},type:${type}`,
      });

      return (
        <GenericError
          title={
            <React.Fragment>
              {TEXTS.NO_RESULTS_FOUND}{' '}
              <span className={className}>{`"${q}"`}</span>
            </React.Fragment>
          }
          description={
            <React.Fragment>
              {TEXTS.NO_RESULTS_FOUND_DESCRIPTION(SOURCES[source], TYPES[type])}
              <Link to="/help#Desktop-i-cant-find-my-shabad.">
                {' '}
                {TEXTS.HELP_SECTION}
              </Link>.
            </React.Fragment>
          }
          image={SachKaur}
        />
      );
    }

    // I'm feeling lucky
    if (parseInt(resultsCount, 10) === 1) {
      const [{ shabad }] = shabads;
      return <Redirect to={toShabadURL({ shabad, q, type, source })} />;
    }

    return (
      <div className="row" id="content-root">
        <Controls
          media={
            type === 'shabad'
              ? supportedMedia
              : supportedMedia.filter(
                  m => ['embed', 'copyAll', 'copy'].includes(m) === false
                )
          }
          disableSplitView
        />
        <ul className="search-results display">
          {shabads.map(({ shabad }) => {
            const _source = SOURCES[shabad.source.id];
            const shabadPageNo = shabad.pageno === null ? '' : shabad.pageno;
            const presentationalSource = _source
              ? `${_source} - ${shabadPageNo}`
              : null;

            return (
              <React.Fragment key={shabad.id}>
                <li className="search-result">
                  <Link
                    style={{ fontSize: `${fontSize}em` }}
                    to={toShabadURL({ shabad, q, type, source })}
                    className="gurbani-font gurbani-display"
                  >
                    {unicode ? (
                      <div className="unicode">
                        <Larivaar
                          larivaarAssist={larivaarAssist}
                          enable={larivaar}
                        >
                          {shabad.gurbani.unicode}
                        </Larivaar>
                      </div>
                    ) : (
                      <div className="gurlipi">
                        <Larivaar
                          larivaarAssist={larivaarAssist}
                          enable={larivaar}
                        >
                          {shabad.gurbani.gurmukhi}
                        </Larivaar>
                      </div>
                    )}
                  </Link>

                  <div className="clear" />

                  {transliterationLanguages.includes('english') && (
                    <p className="transliteration english">
                      {shabad.transliteration}
                    </p>
                  )}

                  {translationLanguages.includes('punjabi') && (
                    <blockquote className="translation punjabi gurbani-font">
                      {unicode ? (
                        <div className="unicode">
                          {shabad.translation.punjabi.bms.unicode}
                        </div>
                      ) : (
                        <div className="gurlipi">
                          {shabad.translation.punjabi.bms.gurmukhi}
                        </div>
                      )}
                    </blockquote>
                  )}

                  {translationLanguages.includes('english') && (
                    <blockquote className="translation english">
                      {shabad.translation.english.ssk}
                    </blockquote>
                  )}

                  {translationLanguages.includes('spanish') && (
                    <blockquote className="translation spanish">
                      {shabad.translation.spanish}
                    </blockquote>
                  )}

                  <div className="meta flex wrap">
                    {presentationalSource && (
                      <a href="#">{presentationalSource}</a>
                    )}

                    <a href="#">{shabad.writer.english}</a>

                    {shabad.raag.english === 'No Raag' ||
                    shabad.raag.english === null ? (
                      ''
                    ) : (
                      <a href="#">{shabad.raag.english}</a>
                    )}
                  </div>
                </li>
              </React.Fragment>
            );
          })}
          {(offset > 0 || nextPageOffset) && (
            <li className="load-more">
              {offset > 0 ? (
                <Link
                  className="load button"
                  title={TEXTS.PREVIOUS_PAGE}
                  onClick={() => clickEvent({ action: TEXTS.PREVIOUS_PAGE })}
                  to={toSearchURL({
                    query: q,
                    source,
                    type,
                    offset: offset - 1,
                  })}
                >
                  {TEXTS.PREVIOUS_PAGE}
                </Link>
              ) : (
                <div />
              )}
              {nextPageOffset ? (
                <Link
                  className="load button"
                  title={TEXTS.NEXT_PAGE}
                  onClick={() => clickEvent({ action: TEXTS.NEXT_PAGE })}
                  to={toSearchURL({
                    query: q,
                    type,
                    source,
                    offset: nextPageOffset,
                  })}
                >
                  {TEXTS.NEXT_PAGE}
                </Link>
              ) : (
                <div />
              )}
            </li>
          )}
        </ul>
      </div>
    );
  }

  componentDidMount() {
    const { q, type, offset, source } = this.props;
    pageView(toSearchURL({ q, type, source, offset }));
  }
}

const stateToProps = state => state;
export default connect(stateToProps)(Layout);
