import React from 'react';
import {Item, List, Image, Card} from 'semantic-ui-react';
import {IActivity} from '../../app/models/activity';

interface IProps {
    activities: IActivity[]
}
const ActivityList: React.FC<IProps> = ({activities}) => {
    return(
      <div>
    <Card.Group>

        {activities.map(activity =>(
        

            <Card
            header={activity.activityName}
            description={[
            'Hours trained: 66',
            'Total Workotus: 34'
            ].join('')}
           

            />
            // <List.Item>
            // <Image avatar src='https://react.semantic-ui.com/images/avatar/small/daniel.jpg' />
            // <List.Content>
            //     <List.Header as='a'>{activity.activityName}</List.Header>
            // </List.Content>
            // </List.Item>
        ))}
         </Card.Group>

      </div>
    )
}

export default ActivityList
    