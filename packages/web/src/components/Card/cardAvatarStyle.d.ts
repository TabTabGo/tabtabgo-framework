export default cardAvatarStyle;
declare namespace cardAvatarStyle {
    const cardAvatar: {
        '&$cardAvatarProfile img,&$cardAvatarTestimonial img': {
            width: string;
            height: string;
        };
    };
    const cardAvatarProfile: {
        maxWidth: string;
        maxHeight: string;
        margin: string;
        borderRadius: string;
        overflow: string;
        padding: string;
        boxShadow: string;
        '&$cardAvatarPlain': {
            marginTop: string;
        };
    };
    const cardAvatarPlain: {};
    const cardAvatarTestimonial: {
        margin: string;
        maxWidth: string;
        maxHeight: string;
        borderRadius: string;
        overflow: string;
        padding: string;
        boxShadow: string;
        '&$cardAvatarPlain': {
            marginTop: string;
        };
    };
    namespace cardAvatarTestimonialFooter {
        const marginBottom: string;
        const marginTop: string;
    }
}
