export class FileUploadRequest {
    public externalReferenceId: string;
    public profileImage: string | ArrayBuffer | null = null;
    public title: string;
    public description: string;
    public mainFile: boolean;
    public public: boolean;
}