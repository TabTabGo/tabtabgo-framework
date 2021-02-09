/// <reference types="react" />
declare type DropDownMenuProps = {
    menuItems: Array<any>;
    color?: 'default' | 'inherit' | 'primary' | 'secondary';
    horizontal?: boolean;
    className?: string;
};
declare const DropDownMenu: ({ menuItems, color, horizontal, className, }: DropDownMenuProps) => JSX.Element;
export default DropDownMenu;
