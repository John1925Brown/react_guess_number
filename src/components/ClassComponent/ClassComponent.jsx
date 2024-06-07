import React from 'react';
import style from './ClassComponent.module.css';
import PropTypes from 'prop-types';

export class ClassComponent extends React.Component {
  state = {
    result: 'Result',
    userNumber: '',
    randomNumber: Math.floor(
      Math.random() * this.props.max - this.props.min + this.props.min
    ),
    count: 0,
    isGuess: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState((state) => ({
      count: state.count + 1,
    }));
    this.setState((state) => {
      if (!state.userNumber) {
        return {
          result: `Введите число`,
        };
      }

      if (state.userNumber > state.randomNumber) {
        return {
          result: `${state.userNumber} больше загаданного`,
        };
      }

      if (state.userNumber < state.randomNumber) {
        return {
          result: `${state.userNumber} меньше загаданного`,
        };
      }

      return {
        isGuess: true,
        result: `Вы угадали! Число ${state.userNumber}
        попыток ${state.count}`,
      };
    });

    (() => {
      console.log(this.state);
    })();

    this.setState({
      userNumber: '',
    });
  };

  handleChange = (e) => {
    this.setState({
      userNumber: e.target.value,
    });
  };

  startNewGame = () => {
    this.setState((state) => ({
      result: 'Result',
      userNumber: '',
      randomNumber: Math.floor(
        Math.random() * this.props.max - this.props.min + this.props.min
      ),
      count: 0,
      isGuess: false,
    }));
  };

  render() {
    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.result}</p>
        <form className={style.form} onSubmit={this.handleSubmit}>
          <label className={style.label} htmlFor="user_number">
            Угадай число
          </label>
          <input
            className={style.input}
            type="number"
            id="user_number"
            onChange={this.handleChange}
            value={this.state.userNumber}
          />

          {this.state.isGuess ? (
            <button className={style.btn} onClick={this.startNewGame}>
              Сыграть еще
            </button>
          ) : (
            <button className={style.btn}>Угадать</button>
          )}
        </form>
      </div>
    );
  }
}

ClassComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};
