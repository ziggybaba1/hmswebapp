const appConfig = window.globalConfig || { siteName: process.env.REACT_APP_SITENAME}
export const baseUrl = appConfig.server+'/api';
export const baseRoot = appConfig.server;
export const secretkey='';
