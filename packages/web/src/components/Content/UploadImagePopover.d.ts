/**
 * Code taken from mui-rte example https://github.com/niuware/mui-rte/blob/master/examples/async-image-upload/index.tsx
 */
import { FunctionComponent } from 'react';
export interface IUploadImagePopoverProps {
    anchor: TAnchor;
    onSubmit: (data: TUploadImageData, insert: boolean) => void;
}
declare type TUploadImageData = {
    file?: File;
};
declare type TAnchor = HTMLElement | null;
declare const UploadImagePopover: FunctionComponent<IUploadImagePopoverProps>;
export default UploadImagePopover;
