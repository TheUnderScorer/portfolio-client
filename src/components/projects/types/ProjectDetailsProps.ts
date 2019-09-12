import ProjectInterface from './ProjectInterface';

export default interface ProjectDetailsProps
{
    project: ProjectInterface;
    onImageLoad?: ( index: number ) => any;
    isClosing?: boolean;
}
