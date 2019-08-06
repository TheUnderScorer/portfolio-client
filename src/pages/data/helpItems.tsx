import HorizontalListItemData from '../../components/horizontal-list/types/HorizontalListItemData';
import { Text } from '../../components/styled/typography';
import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const helpItems: HorizontalListItemData[] = [
    {
        name:          'front-end',
        content:       (
                           <Text>
                               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at accumsan lacus. Proin condimentum lectus purus, nec rhoncus mauris auctor sit amet. Nullam luctus et ipsum ac interdum. In fermentum eget eros ac euismod. Curabitur tempus eros consequat, porta urna in, molestie purus.
                           </Text>
                       ),
        detailsHeight: '112px',
        position:      'left',
        title:         'Front-end development',
        icon:          <FontAwesomeIcon icon="paint-brush"/>
    },
    {
        name:          'back-end',
        content:       (
                           <Text>
                               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at accumsan lacus. Proin condimentum lectus purus, nec rhoncus mauris auctor sit amet. Nullam luctus et ipsum ac interdum. In fermentum eget eros ac euismod. Curabitur tempus eros consequat, porta urna in, molestie purus.
                           </Text>
                       ),
        detailsHeight: '112px',
        position:      'right',
        title:         'Back-end development',
        icon:          <FontAwesomeIcon icon="tools"/>
    },
    {
        name:          'mobile',
        content:       (
                           <Text>
                               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at accumsan lacus. Proin condimentum lectus purus, nec rhoncus mauris auctor sit amet. Nullam luctus et ipsum ac interdum. In fermentum eget eros ac euismod. Curabitur tempus eros consequat, porta urna in, molestie purus.
                           </Text>
                       ),
        detailsHeight: '112px',
        position:      'left',
        title:         'Mobile development',
        icon:          <FontAwesomeIcon icon="mobile"/>
    },
    {
        name:          'desktop',
        content:       (
                           <Text>
                               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at accumsan lacus. Proin condimentum lectus purus, nec rhoncus mauris auctor sit amet. Nullam luctus et ipsum ac interdum. In fermentum eget eros ac euismod. Curabitur tempus eros consequat, porta urna in, molestie purus.
                           </Text>
                       ),
        detailsHeight: '112px',
        position:      'right',
        title:         'Desktop development',
        icon:          <FontAwesomeIcon icon="desktop"/>
    }
];

export default helpItems;
