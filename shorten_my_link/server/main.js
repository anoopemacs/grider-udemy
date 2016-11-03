import { Meteor } from 'meteor/meteor';
import { Links } from '../imports/collections/links';
import { WebApp } from 'meteor/webapp';
import ConnectRoute from 'connect-route';

Meteor.startup(() => {
  Meteor.publish('links', function() {
    return Links.find({});
  });
});

// Executed whenever a user visits with a route like
// 'localhost:3000/abcd'
function onRoute(req, res, next) {
  // Take the token out or url
  // Find matching link in Links collection
  const link = Links.findOne({ token: req.params.token });

  if (link) {
    // If we find a link object, redirect user to the long url
    Links.update(link, { $inc: { clicks: 1 }});
    res.writeHead(307, { 'Location': link.url });
    res.end();
  } else {
    // If we dont find a matching link, send user to our React app
    next();
  }
}

const middleware = ConnectRoute(function(router) {
  router.get('/:token', onRoute);
});

WebApp.connectHandlers.use(middleware);
