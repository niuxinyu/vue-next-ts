import deepmerge from "deepmerge";
import setting from './default';
import _config from './config';

const config = deepmerge(setting, _config);

export default config;
