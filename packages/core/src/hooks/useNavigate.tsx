import { useHistory, useRouteMatch } from 'react-router-dom';

const useNavigate = () => {
  const { path, url } = useRouteMatch();
  const history = useHistory();
  const nonEmpty = (str?: string): boolean =>
    str !== undefined && str !== null && str.trim() !== '';

  const getUrl = (link: string) => {
    var finalTokens = [];

    var urlTokens = url.split('/').filter((u: string) => nonEmpty(u));
    var linkTokens = link.split('/').filter((l) => nonEmpty(l));
    let linkIndex = 0;

    for (const urlIndex in urlTokens) {
      linkIndex = linkTokens.findIndex((l) => l === urlTokens[urlIndex]);
      if (linkIndex >= 0) {
        break;
      } else {
        finalTokens.push(urlTokens[urlIndex]);
      }
    }

    var slice = linkIndex >= 0 ? linkTokens.slice(linkIndex) : linkTokens;
    //console.log('slice', linkTokens, slice, linkIndex)

    finalTokens = finalTokens.concat(slice);
    //console.log("baseUrl", url, link, finalTokens.join("/"));
    return `/${finalTokens.join('/')}`;
  };

  const changeUrlParam = (params: any) => {
    var finalTokens = [];

    var pathTokens = path.split('/').filter((u: string) => nonEmpty(u));
    var linkTokens = history.location.pathname.split('/').filter((l: string) => nonEmpty(l));

    for (const linkIndex in linkTokens) {
      if (
        pathTokens[linkIndex]?.startsWith(':') &&
        Object.keys(params).includes(pathTokens[linkIndex].slice(1))
      ) {
        finalTokens.push(params[pathTokens[linkIndex].slice(1)]);
      } else {
        finalTokens.push(linkTokens[linkIndex]);
      }
    }
    let finalUrl = finalTokens.join('/');
    if (finalUrl.endsWith('/')) finalUrl = finalUrl.slice(0, finalUrl.length - 1);
    if (!finalUrl.startsWith('/')) finalUrl = `/${finalUrl}`;
    //console.log('changeUrlParam', pathTokens, linkTokens, params, finalUrl)
    return finalUrl;
  };

  return {
    push: (link: string, state?: any) => {
      history.push(getUrl(link), state);
    },
    replace: (link: string, state?: any) => {
      history.replace(getUrl(link), state);
    },
    changeRouteParams: (params: any, state?: any) => {
      history.push(changeUrlParam(params), state);
    },
  };
};

export default useNavigate;
