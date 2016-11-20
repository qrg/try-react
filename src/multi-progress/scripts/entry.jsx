'use strict';

// https://facebook.github.io/react/docs/tutorial.html#your-first-component

import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactDOM from 'react-dom';

const PROGRESS_BAR_TRANSITIONS = {
  component: 'div',
  transitionName: 'progress',
  transitionAppear: true,
  transitionAppearTimeout: 600,
  transitionEnterTimeout: 600,
  transitionLeaveTimeout: 600
};

class ProgressBar extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {max, value} = this.props;
    const rate = Math.round(value / max) * 100;
    return (
      <ReactCSSTransitionGroup {...PROGRESS_BAR_TRANSITIONS} >
        <progress className='progress is-small' value={value} max={max}>
          <span>{rate} %</span>
        </progress>
      </ReactCSSTransitionGroup>
    );
  }

}

class Indicator extends Component {

  constructor(props) {
    super(props);
    this.state = {
      p1Value: 0,
      p1Max: 100,
      p2Value: 0,
      p2Max: 100,
    };

    const {p1Value, p1Max, p2Value, p2Max} = this.state;

    this.increment('p1Value', p1Max).then(() => {
      this.increment('p2Value', p2Max);
    });
  }

  increment(key, max) {
    return new Promise(done => {
      const interval = setInterval(() => {
        const value = this.state[key];
        if (value >= max) {
          clearInterval(interval);
          done();
          console.info(`${key} done.`);
          return;
        }
        this.setState({[key]: value + 2});
      }, 300);
    });
  }

  render() {
    const {p1Value, p1Max, p2Value, p2Max} = this.state;
    const progressBar1Props = {
      max: p1Max,
      value: p1Value
    };
    const progressBar2Props = {
      max: p2Max,
      value: p2Value
    };

    return (
      <div className='section'>
        <div className='container'>
          <ProgressBar {...progressBar1Props} />
          <ProgressBar {...progressBar2Props} />
        </div>
      </div>
    );
  }

}

ReactDOM.render(
  <Indicator />,
  document.getElementById('app')
);
