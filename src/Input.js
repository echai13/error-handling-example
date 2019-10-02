import React from 'react';

import './Input.css';

export default class Input extends React.Component {
  handleChange = (event) => {
    this.props.onChange(this.props.name, event.target.value);
  };

  handleBlur = () => {
    this.props.onBlur(this.props.name);
  };

  render() {
    const { label, maxLength, value, error, placeholder } = this.props;
    const inputErrorCss = error ? 'error' : '';
    return (
      <div className="input-component">
        <div className="label-counter">
          <div className="label">{label}</div>
          <div className="counter">{`${value.length}/${maxLength}`}</div>
        </div>
        <input
          className={inputErrorCss}
          value={value}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          placeholder={placeholder}
        />
        <div className="error">{error}</div>
      </div>
    );
  }
}
