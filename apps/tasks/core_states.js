/**
 * A mixin that defines all of the state transitions.
 *
 * @author Suvajit Gupta
 * License: Licened under MIT license (see license.js)
 */
/*globals Tasks Ki sc_require */
sc_require('core');
sc_require('states/logged_out');

// TODO: [SG/MC] make default responder work instead of having to specify in each panel

// Overall statechart for the application
Tasks.mixin( /** @scope Tasks */ {
  
  statechart: Ki.Statechart.create({

    // Set tracing or monitoring on to debug statecharts
    trace: NO,
    monitorIsActive: NO,
  
    rootState: Ki.State.design({

      initialSubstate: 'loggedOut',

      // State when user hasn't logged in yet
      loggedOut: Ki.State.plugin('Tasks.LoggedOutState'),
    
      // State after user logs in and the application is ready to use
      loggedIn: Ki.State.design({

        enterState: function() {
          Tasks.loadData();
          Tasks.getPath('mainPage.mainPane.projectsList').becomeFirstResponder();
        },

        logout: function() {
          Tasks.logout();
        }

      }),

      // State after application is shut down
      terminated: Ki.State.design({

        enterState: function() {
          Tasks.getPath('mainPage.mainPane').remove();
        }

      })

    })
  
  })

});