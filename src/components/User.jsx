import React from 'react';
import { Row, Col } from 'react-materialize';

import Repo from './Repo';

class User extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    function handleErrors(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }
    fetch(`https://api.github.com/users/${this.props.params.username}`)
      .then(handleErrors)
      .then(response => response.json())
      .then(
        user => {
          this.setState({
            user: user
          });
        }
      ).catch(
        error => {
          this.setState({
            error: error
          });
        }
      );
  }

  renderStat(stat) {
    return (
      <div className="user-info__stat center-align" key={stat.value}>
        <p className="user-info__stat-value">{stat.value}</p>
        <p className="user-info__stat-name">{stat.name}</p>
      </div>
    );
  }

  render() {
    if (this.state.error) {
      return (<div className="user-page">We couldn’t find any repositories matching '{this.props.params.username}'</div>);
    }

    if (!this.state.user) {
      return (<div className="user-page">LOADING...</div>);
    }

    const user = this.state.user;

    const stats = [
      {
        name: 'Public Repos',
        value: user.public_repos
      }
    ];

    return (
      <div className="user-page">
        <Row>
          <Col s={12} m={10}>
            <Row className="valign-wrapper">
              <Col s={2} m={1}>
                <img className="circle responsive-img" src={user.avatar_url} alt={`${user.login} avatar`} />
              </Col>
              <Col s={10} m={11}>
                <span className="user-info__title">{user.login} ({user.name})</span>
              </Col>
            </Row>
            <p className="user-info__bio">{user.bio}</p>
          </Col>
          <Col s={12} m={2}>
            {stats.map(this.renderStat)}
          </Col>
        </Row>
        <Repo repos_url={user.repos_url} />
      </div>
    );
  }
};

export default User;
