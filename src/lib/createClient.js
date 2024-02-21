import * as contentful from 'contentful';

//import { spaceId, accessToken } from '../constants';

export const client = contentful.createClient({
    space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
    accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
});