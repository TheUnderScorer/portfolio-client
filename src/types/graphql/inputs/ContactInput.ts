export default interface ContactInput
{
    subject: string;
    email?: string;
    message: string;
    files?: File[];
}

export interface ContactInputVariable
{
    input: ContactInput;
}
