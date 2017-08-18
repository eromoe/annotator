// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from './utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

// not working
// const getComponentby = (componentName, reducerMapName) => (nextState, cb) => {
//   const importModules = Promise.all([
//     import(`containers/${componentName}/reducer`),
//     import(`containers/${componentName}/sagas`),
//     import(`containers/${componentName}`),
//   ]);

//   const renderRoute = loadModule(cb);

//   importModules.then(([reducer, sagas, component]) => {
//     injectReducer(reducerMapName, reducer.default);
//     injectSagas(sagas.default);
//     renderRoute(component);
//   });

//   importModules.catch(errorLoading);
// }

export default function createRoutes(store) {
  // create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store);

  return [
    {
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/HomePage/reducer'),
          import('containers/HomePage/sagas'),
          import('containers/HomePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('home', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/corpus/:corpusId',
      name: 'corpus',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/Corpus/reducer'),
          import('containers/Corpus/sagas'),
          import('containers/Corpus'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('corpusPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/corpus/:id/documents/:id',
      name: 'doc',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/Annotator/reducer'),
          // import('containers/Annotator/sagas'),
          import('containers/Annotator'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, component]) => {
          injectReducer('xxx', reducer.default);
          // injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, ...['/annotator', '/corpus/:corpusId/documents/:docId', '/corpus/1/annotator'].map(
      (p)=>({
        path: p,
        name: 'annotator',
        getComponent(nextState, cb) {
          const importModules = Promise.all([
            import('containers/Annotator/reducer'),
            import('containers/Annotator/sagas'),
            import('containers/Annotator'),
          ]);

          const renderRoute = loadModule(cb);

          importModules.then(([reducer, sagas, component]) => {
            injectReducer('annotator', reducer.default);
            injectSagas(sagas.default);
            renderRoute(component);
          });

          importModules.catch(errorLoading);
        },
      })), {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
