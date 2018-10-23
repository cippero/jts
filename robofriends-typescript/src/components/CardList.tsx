import * as React from 'react';
import Card from './Card';
import { IRobot } from '../containers/App';

// interface IRobots {
//   robots: Array<IRobot>
// }

// const CardList: React.SFC<IRobots> = ({ robots }): JSX.Element => {
const CardList = ({ robots }: { robots: Array<IRobot> }): JSX.Element => {
  return (
    <div>
      {
        robots.map((user, i) => {
          return (
            <Card
              key={i}
              id={robots[i].id}
              name={robots[i].name}
              email={robots[i].email}
              />
          );
        })
      }
    </div>
  );
}

export default CardList;