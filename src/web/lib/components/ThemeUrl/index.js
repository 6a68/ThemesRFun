import React from 'react';

import './index.scss';

export default class ThemeUrl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      themeUrl: '',
      copied: false
    };
    this.handleCopied = () => this.setState({ copied: true });
  }

  componentDidMount() {
    this.updateThemeUrl(this.props.theme);
    this.props.clipboard.on('success', this.handleCopied);
  }

  componentWillUnmount() {
    this.props.clipboard.off('success', this.handleCopied);
  }

  componentWillReceiveProps({ theme }) {
    this.updateThemeUrl(theme);
  }

  handleCopied() {
    this.setState({ copied: true });
  }

  updateThemeUrl(theme) {
    if (!theme) { return; }

    const { urlEncodeTheme } = this.props;
    urlEncodeTheme(theme).then(themeUrl => {
      this.setState({ themeUrl, copied: false });
    });
  }

  render() {
    const {
      copied,
      themeUrl
    } = this.state;

    return (
      <form className="theme-url" onSubmit={e => e.preventDefault()}>
        <label><h2>Share your theme</h2></label>
        <fieldset>
          <input type="text" id="themeUrl" value={themeUrl} />
          <input type="submit" className="clipboardButton"
            data-clipboard-target="#themeUrl"
            value={copied ? 'Copied!' : 'Copy'} />
        </fieldset>
      </form>
    );
  }
}
