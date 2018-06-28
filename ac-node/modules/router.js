const routes = {
  get: {},
  post: {}
};

module.exports = function router() {
  this.get = (path, callback) => {
    routes.get[path] = callback;
  };

  this.post = (path, callback) => {
    routes.post[path] = callback;
  };

  this.handler = (request, response) => {
    const callback = routes[request.method.toLowerCase()][request.url];
    if (callback) {
      callback(request, response);
    } else {
      response.writeHead(404);
      response.write("404 NOT FOUND!");
      response.end();
    }
  };
};
