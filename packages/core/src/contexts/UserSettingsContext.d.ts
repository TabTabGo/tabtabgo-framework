import React from 'react';
export interface RecentView {
    type: 'Info' | 'Economy' | 'Internet' | 'TV' | 'Files';
    path: string;
    id: number;
    name: string;
}
export declare const UserSettingsContext: React.Context<{
    recentViews: RecentView[];
    addRecentView: (view: RecentView) => void;
    removeRecentView: (id: any) => void;
    clearRecentViews: () => void;
    showIds: boolean;
    setShowIDs: (value: boolean) => void;
    setSetting: (name: string, value: any) => void;
}>;
declare type RecentViewProviderProps = {
    children: any;
    [key: string]: any;
};
export declare const UserSettingsProvider: ({ children }: RecentViewProviderProps) => JSX.Element;
export declare const withUserSettings: (WrapperComponent: any) => (props: any) => JSX.Element;
export {};
