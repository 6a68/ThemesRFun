import React from 'react';
import classnames from 'classnames';
import onClickOutside from 'react-onclickoutside';

import { colorToCSS } from '../../../../lib/utils';

import './index.scss';

const bgImages = require.context('../../../../images/', false, /bg-.*\.png/);

const Background = ({ src, active, setBackground, accentcolor }) =>
  <div
    className={classnames('bg', { active })}
    onClick={() => setBackground({ url: src })}
  >
    <div
      className="bg__inner"
      style={{
        backgroundColor: accentcolor,
        backgroundImage: `url(${bgImages(src)})`
      }}
    />
  </div>;

class ThemeBackgroundPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    };
  }

  handleClick() {
    this.setState({ selected: !this.state.selected });
  }

  handleClickOutside() {
    this.setState({ selected: false });
  }

  render() {
    const { theme, setBackground } = this.props;
    const { selected } = this.state;
    const accentcolor = colorToCSS(theme.colors.accentcolor);
    // Note: default theme initializes with no bg so we have to check before adding bg to CSS
    const backgroundSwatch = theme.images.headerURL ? `url(${bgImages(theme.images.headerURL)})` : '';
    return (
      <div className={classnames('theme-background-picker', { selected })} onClick={ this.handleClick.bind(this) }>
        <span className="theme-background-picker__swatch"
          style={{ backgroundColor: accentcolor, backgroundImage: backgroundSwatch }}
        />
        <span className="theme-background-picker__text">Theme Texture</span>
        <div className="theme-background-picker__backgrounds">
          <div className="theme-background-picker__backgrounds-inner">
            {bgImages
              .keys()
              .map((src, key) =>
                <Background
                  key={key}
                  {...{ src, accentcolor, setBackground, active: theme.images.headerURL === src }}
                />
              )}
          </div>
        </div>
      </div>
    );
  }
}

export default onClickOutside(ThemeBackgroundPicker);
