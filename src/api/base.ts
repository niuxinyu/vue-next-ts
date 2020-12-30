import { axios } from '@/libs/request';
import Qs from 'qs';

const stringify = Qs.stringify;
const parse = Qs.parse;

export {
    axios,
    stringify,
    parse
};
