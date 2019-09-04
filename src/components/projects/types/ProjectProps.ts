import ProjectInterface from './ProjectInterface';

export default interface ProjectProps
{
    project: ProjectInterface;
    active?: boolean;
    onOpen: () => any;
    onClose: () => any;
    index: number;
}
