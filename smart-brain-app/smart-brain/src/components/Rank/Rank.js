import React, { Component } from 'react';

export default class Rank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emoji: ''
    }
  }

  componentDidMount() {
    this.generateEmojis(this.props.entries);
  }

  componentDidUpdate(prevProps, prevState) {
    // prevProps.entries !== this.props.entries && this.generateEmojis(this.props.entries);
    if (prevProps.entries === this.props.entries && prevProps.name === this.props.name) return
    this.generateEmojis(this.props.entries);
  }

  generateEmojis = (entries) => {
    fetch(`https://7tcky1gk0h.execute-api.us-west-2.amazonaws.com/prod?rank=${entries}`)
      .then(res => res.json())
      .then(res => this.setState({emoji: res.input}))
      .catch(console.log);
  }

  render() {
    const { name, entries } = this.props;
    return (
      <div>
        <div className='white f3'>
          {`${name}, your current entry count is...`}
        </div>
        <div className='white f1'>
          {entries}
        </div>
        <div className='white f3'>
          {`Rank Badge: ${this.state.emoji}`}
        </div>
      </div>
    );
  }
}