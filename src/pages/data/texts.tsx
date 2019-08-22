import * as React from 'react';
import { NameHighlight } from '../../components/hero-text/styled';
import { ContactTypes } from '../../types/reducers/ContactReducer';
import { Highlight } from '../../components/styled/typography';

const texts = {
    me:       {
        name:     'Przemysław Żydek',
        position: 'Full-Stack developer'
    },
    hero:     {
        title: <>Hello, I'm <NameHighlight>Przemysław Żydek</NameHighlight>.</>,
    },
    aboutMe:  {
        label:        'About',
        sectionTitle: 'About Me',
        id:           'about_me',
        title:        'Nice to meet you!',
        subTitle:     'Let me introduce myself.',
        text:
                      <span>Lorem ipsum dolor sit amet, <Highlight>consectetur</Highlight> adipiscing elit. Vestibulum at accumsan lacus. Proin condimentum lectus purus, nec rhoncus mauris auctor sit amet. Nullam luctus et ipsum ac interdum. In fermentum eget eros ac euismod. Curabitur tempus eros consequat, porta urna in, molestie purus. Integer vel faucibus odio. Praesent eleifend, purus eget iaculis tincidunt, nulla dui consequat nibh, a <Highlight>aliquam</Highlight> orci dolor ut justo. Sed non tellus nisl. Sed vitae leo felis. Nullam cursus vulputate suscipit. Sed quis nisl purus. Pellentesque in commodo ante. Nullam nec massa tortor. Duis eleifend sit amet tellus id lobortis. Ut at quam vitae libero mollis bibendum quis et dui.</span>
    },
    projects: {
        sectionTitle: 'My Recent Projects',
        label:        'Projects',
        id:           'projects',
        viewProject:  'View project',
        viewRepo:     'View repository'
    },
    contact:  {
        sectionTitle:                  'Interested in collaboration?',
        id:                            'contact',
        label:                         'Contact',
        subTitle:                      'Let\'s build something amazing together!',
        basicInfo:                     'Let\'s start with some basic info.',
        [ ContactTypes.Selection ]:    ( name: string ) => `How would you like to contact me, ${ name }?`,
        [ ContactTypes.ContactForm ]:  'Create your message',
        [ ContactTypes.EditProfile ]:  'Edit your profile',
        [ ContactTypes.Conversation ]: 'Conversation'
    },
};

export default texts;
