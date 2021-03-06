import React from 'react';
import ReactSVG from 'react-svg';

import { surveyUrl } from '../../../../lib/constants';
import iconFeedback from './feedback.svg';
import './index.scss';

export const AppHeader = ({ hasExtension, appVersion = null }) => {
  let survey = `${surveyUrl}?ref=app`;
  if (appVersion) {
    survey += `${survey}&ver=${appVersion}`;
  }
  return (
    <div className="app-header">
      <div className="app-header__content">
        <div className="app-header__icon" />
        <header>
          <h1>Themer</h1>
          <h3>A <a href="https://testpilot.firefox.com" target="_blank"
           rel="noopener noreferrer">Firefox Test Pilot</a> Experiment</h3>
        </header>
      </div>
      {hasExtension &&
        <a href={ survey }
           title="survey link"
           className="app-header__survey"
           target="_blank"
           rel="noopener noreferrer">
            <span>Feedback</span>
            <ReactSVG
                    style={{ fill: '#fff' }}
                    path={iconFeedback}
                  />
           </a>
      }
    </div>
  );
};

export default AppHeader;
