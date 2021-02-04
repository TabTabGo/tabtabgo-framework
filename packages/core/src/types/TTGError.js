export class TTGError extends Error {
    constructor(message, name, extraProperties) {
        super(message);
        this.message = message;
        this.name = name || 'general';
    }
}
