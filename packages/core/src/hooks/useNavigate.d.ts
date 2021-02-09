declare const useNavigate: () => {
    push: (link: string, state?: any) => void;
    replace: (link: string, state?: any) => void;
    changeRouteParams: (params: any, state?: any) => void;
};
export default useNavigate;
