import * as React from 'react';
import { NameHighlight } from '../../components/hero-text/styled';

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
        text:         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at accumsan lacus. Proin condimentum lectus purus, nec rhoncus mauris auctor sit amet. Nullam luctus et ipsum ac interdum. In fermentum eget eros ac euismod. Curabitur tempus eros consequat, porta urna in, molestie purus. Integer vel faucibus odio. Praesent eleifend, purus eget iaculis tincidunt, nulla dui consequat nibh, a aliquam orci dolor ut justo. Sed non tellus nisl. Sed vitae leo felis. Nullam cursus vulputate suscipit. Sed quis nisl purus. Pellentesque in commodo ante. Nullam nec massa tortor. Duis eleifend sit amet tellus id lobortis. Ut at quam vitae libero mollis bibendum quis et dui.'
    },
    projects: {
        sectionTitle: 'My Projects',
        label:        'Projects',
        id:           'projects',
    },
    hire:     {
        sectionTitle: 'Hire me!',
        id:           'contact'
    }
};

export default texts;
