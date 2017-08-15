/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_INFO_BY_URL = 'boilerplate/App/LOAD_INFO_BY_URL';
export const LOAD_INFO_SUCCESS = 'boilerplate/App/LOAD_INFO_SUCCESS';
export const LOAD_INFO_ERROR = 'boilerplate/App/LOAD_INFO_ERROR';
export const DEFAULT_LOCALE = 'en';

export const LOAD_ARTICLES = 'boilerplate/App/LOAD_ARTICLES';
export const LOAD_ARTICLES_SUCCESS = 'boilerplate/App/LOAD_ARTICLES_SUCCESS';
export const LOAD_ARTICLES_ERROR = 'boilerplate/App/LOAD_ARTICLES_ERROR';

export const RENDER_TAGGED_TEXT = 'boilerplate/Home/RENDER_TAGGED_TEXT';

