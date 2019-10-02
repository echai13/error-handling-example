import React from 'react';

import Input from './Input';

import './App.css';

const inputFields = {
  username: {
      label: 'Display name',
      maxLength: 8,
      placeholder: 'Must be no more than 8 characters.',
  },
  briefIntroduction: {
      label: 'Brief introduction',
      maxLength: 120,
      placeholder: 'Write a brief description about yourself.',
  },
  careerAspirations: {
      label: 'Career Aspirations',
      maxLength: 200,
      placeholder: 'What are your career dreams?',
  },
  favoriteColor: {
      label: 'Favorite color',
      maxLength: 20,
      placeholder: 'e.g. blue, pink, purple',
  },
};

class App extends React.Component {
  state = {
    username: '',
    briefIntroduction: '',
    careerAspirations: '',
    favoriteColor: '',
    errors: {
      username: null,
      briefIntroduction: null,
      careerAspirations: null,
      favoriteColor: null,
    },
    formHasError: false,
  };

  checkInputLength = (key, value) => {
    if (value.length > inputFields[key].maxLength) {
      this.setState(prevState => ({
        formHasError: false,
        errors: {
          ...prevState.errors,
          [key]: 'Input length exceeded max length',
        },
      }));

      return true;
    }

    return false;
  }

  handleChange = (key, value) => {
    const hasError = this.checkInputLength(key, value);
    
    if (!hasError) {
      this.setState(prevState => ({
        formHasError: false,
        errors: {
          ...prevState.errors,
          [key]: null,
        },
      }));
    }

    this.setState({ [key]: value });
  };

  handleBlur = (key) => {
    if (!this.state[key]) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          [key]: 'This field cannot be empty!'
        }
      }));
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const errorKeys = Object.keys(this.state.errors);
    const formHasError = errorKeys.some(key => this.state.errors[key]);
    if (formHasError) {
      this.setState({ formHasError: true });
      return;
    }

    alert('You have successfully submitted the form!!');
  };

  renderFields = () => {
    const inputKeys = Object.keys(inputFields);
    return inputKeys.map(this.renderSingleField);
  };

  renderSingleField = (key, index) => {
    const { label, maxLength, placeholder } = inputFields[key];
    return (
      <Input
        key={`field-${index}`}
        label={label}
        maxLength={maxLength}
        value={this.state[key]}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        error={this.state.errors[key]}
        placeholder={placeholder}
        name={key}
      />
    );
  };

  render() {
    return (
      <div className="App">
        <main className="App-header">
          <h1>Exploring Errors Using Form</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="form-error">{this.state.formHasError && 'Please check your input fields for errors.'}</div>
            {this.renderFields()}
            <button type="submit">Submit Form!</button>
          </form>
        </main>
      </div>
    );
  }
}

export default App;
