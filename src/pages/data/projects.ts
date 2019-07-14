import ProjectInterface from '../../components/projects/types/ProjectInterface';
import Test from '../../assets/projects/test.jpg'
import { ProjectTypes } from '../../types/ProjectTypes';

const projects: ProjectInterface[] = [
    {
        thumbnailUrl:  Test,
        images:        [ Test, Test, Test ],
        name:          'Test Project',
        details:       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ultricies, dui ut varius feugiat, arcu ex mattis elit, vel eleifend enim orci in mauris. Donec tristique vestibulum accumsan. Aliquam enim ante, ullamcorper ut consectetur non, pulvinar ut massa. Integer sollicitudin, augue sed faucibus tristique, odio velit scelerisque tortor, sit amet blandit est lacus vel sem. Integer condimentum vel leo at euismod. Proin eu semper ex, non feugiat nulla. Proin auctor malesuada ex, tempus auctor nunc interdum sed. Aliquam erat volutpat.\n' +
                       '\n' +
                       'Vestibulum bibendum risus et scelerisque egestas. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus id rhoncus arcu. Quisque at eros non neque feugiat viverra in quis justo. Donec urna dui, egestas sit amet sem eget, posuere pellentesque turpis. Donec dictum placerat velit, in venenatis augue dictum a. Sed tempor enim nec enim rhoncus consequat. Suspendisse a pretium eros. Suspendisse volutpat pulvinar diam ac aliquam. Fusce id elit id erat placerat rutrum. Fusce tincidunt, nibh vitae facilisis scelerisque, eros risus tempus enim, id rhoncus velit ex eget elit. Pellentesque dictum imperdiet molestie. Aliquam hendrerit nulla in leo consequat accumsan. Cras purus felis, rhoncus ut elit eu, tristique ultricies eros. Sed viverra massa ut sem tincidunt tristique. Maecenas non ligula placerat lectus fermentum accumsan.',
        shortDetails:  'Lorem ipsum',
        url:           '#',
        repositoryUrl: '#',
        category:      ProjectTypes.backend
    },
    {
        thumbnailUrl: Test,
        images:       [ Test, Test, Test ],
        name:         'Test Project',
        details:      'Lorem ipsum',
        shortDetails: 'Lorem ipsum',
        url:          '#',
        category:     ProjectTypes.backend
    },
    {
        thumbnailUrl: Test,
        images:       [ Test, Test, Test ],
        name:         'Test Project',
        details:      'Lorem ipsum',
        shortDetails: 'Lorem ipsum',
        url:          '#',
        category:     ProjectTypes.backend
    },
    {
        thumbnailUrl: Test,
        images:       [ Test, Test, Test ],
        name:         'Test Project',
        details:      'Lorem ipsum',
        shortDetails: 'Lorem ipsum',
        url:          '#',
        category:     ProjectTypes.backend
    },
    {
        thumbnailUrl: Test,
        images:       [ Test, Test, Test ],
        name:         'Test Project',
        details:      'Lorem ipsum',
        shortDetails: 'Lorem ipsum',
        url:          '#',
        category:     ProjectTypes.backend
    },
    {
        thumbnailUrl: Test,
        images:       [ Test, Test, Test ],
        name:         'Test Project',
        details:      'Lorem ipsum',
        shortDetails: 'Lorem ipsum',
        url:          '#',
        category:     ProjectTypes.backend
    },
];

export default projects;
