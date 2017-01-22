class Script {
  process_incoming_request({ request }) {
    const body = request.content;
    let color = '#31af64';
    const redColor = '#b92b27';
    const grayColor = '#cbd0d5';

    // {
    //   "name": "asgard",
    //   "url": "job/asgard/",
    //   "build": {
    //       "full_url": "http://localhost:8080/job/asgard/18/",
    //       "number": 18,
    //       "phase": "COMPLETED",
    //       "status": "SUCCESS",
    //       "url": "job/asgard/18/",
    //       "scm": {
    //           "url": "https://github.com/evgeny-goldin/asgard.git",
    //           "branch": "origin/master",
    //           "commit": "c6d86dc654b12425e706bcf951adfe5a8627a517"
    //       },
    //       "artifacts": {
    //           "asgard.war": {
    //               "archive": "http://localhost:8080/job/asgard/18/artifact/asgard.war"
    //           },
    //           "asgard-standalone.jar": {
    //               "archive": "http://localhost:8080/job/asgard/18/artifact/asgard-standalone.jar",
    //               "s3": "https://s3-eu-west-1.amazonaws.com/evgenyg-bakery/asgard/asgard-standalone.jar"
    //           }
    //       }
    //   }
    // }
    if (body.build) {
      if (body.build.status === 'FAILURE') {
        color = redColor;
      } else if (body.build.status === 'ABORTED') {
        color = grayColor;
      }

      return {
        content: {
          username: 'jenkins',
          icon_url: 'https://jenkins.io/sites/default/files/jenkins_favicon.ico',
          attachments: [{
            title: `Job "${body.name}" completed with result ${body.build.status || 'STARTED'}`,
            title_link: body.build.full_url,
            color
          }]
        }
      };
    }

    // {
    //   "action": "应用更新",
    //   "title": "OooPlay",
    //   "link": "https://www.pgyer.com/oooplay_test",
    //   "message": "您的应用OooPlay有了新的版本(2.4)更新。",
    //   "type": "updateVersion",
    //   "os_version": "2.4",
    //   "build_version": "139",
    //   "created": "2015-10-09 11:25:16",
    //   "updated": "2015-10-09 11:25:16",
    //   "timestamp": 1444361118,
    //   "appsize": "2238036",
    //   "device_type": 'iOS',
    //   "notes": "修复了一些小弱智的小bug"
    // }
    if (body.os_version) {
      return {
        content: {
          username: 'pgyer',
          icon_url: 'http://www.pgyer.com/favicon.ico',
          attachments: [{
            title: `${body.device_type} App "${body.title}" has a new version ${body.os_version}`,
            title_link: body.link,
            color
          }]
        }
      };
    }

    // {
    //   // The account connected to the event (always present)
    //   account: {
    //     // The ID of the account (always present)
    //     id: "56b9ca7f17025f8756f69054",
    //     // The name of the account (always present)
    //     name: "My Company",
    //     // The URL to the account (always present)
    //     url: "https://app.bugsnag.com/accounts/my-company"
    //   },
    //   // The project connected to the event (always present)
    //   project: {
    //     // The ID of the project (always present)
    //     id: "56b9ca7f17025f8756f69054",
    //     // The name of the project (always present)
    //     name: "My Test Project",
    //     // The URL to the project (always present)
    //     url: "https://app.bugsnag.com/my-company/my-test-project"
    //   },
    //   // The reason why the payload was fired (always present)
    //   trigger: {
    //       // The type of trigger sent (always present)
    //       // - "firstException"         A new error is created from a new exception
    //       // - "powerTen"               An error occurs frequently
    //       // - "exception"              Every time an exception is received
    //       // - "reopened"               An error is automatically reopened
    //       // - "projectSpiking"         A spike in exception in a project has been detected
    //       // - "comment"                A comment is added to an error
    //       // - "errorStateManualChange" A user has manually changed the state of an error
    //       type: "exception",
    //       // Detailed description of why the trigger was fired (always present)
    //       message: "1000th exception",
    //       // The snooze rule associated with the trigger, if applicable (optional).
    //       // This can be the snooze rule that caused this event to occur if its reopened from
    //       // archived, or the snooze rule connected to the user action of snoozing
    //       // or cancelling a snooze.
    //       snoozeRule: {
    //           // The type of rule that (always present)
    //           // - "occurrences"          An error as reoccurred a number of times
    //           // - "occurrence_per_hour"  An error as reoccurred a number of times in an hour
    //           // - "occurs_after"         An error as reoccurred after a period of time
    //           type: "occurrences",
    //           // The number of occurrences or minutes (always present)
    //           ruleValue: 10
    //       },
    //       // The number of events that have occurred in the project of the spiking time,
    //       // if the trigger is project spiking (optional)
    //       rate: 5000,
    //       // The state change that occurred if the trigger is a manual error state change (optional).
    //       // This can be "fixed", "reopened", "snoozed", "snoozeCancelled", "ignored"
    //       // and "unignored".
    //       stateChange: ""
    //   },
    //   // The comment details if a comment was added (optional)
    //   comment: {},
    //   // The user that created the comment, if comment was added (optional)
    //   user: {
    //       // A unique identifier for a user who made the comment (always present)
    //       id: "56b9ca7f17025f8756f69054",
    //       // The user's name, or a string used to identify them (always present)
    //       name: "Example User",
    //       // The user's email address (always present)
    //       email: "user@example.com"
    //   },
    //   // The event that caused this trigger to fire (always present)
    //   error: {
    //       // The ID of the event (always present)
    //       id: "56b9ca7f17025f8756f69054",
    //       // The ID of the error containing the event (always present)
    //       errorId: "56b9ca7f17025f8756f69054",
    //       // The name of the exception class from the event (always present)
    //       exceptionClass: "NoMethodError",
    //       // The message associated with the event (always present)
    //       message: "Unable to connect to database.",
    //       // A string representing what was happening in the application at the
    //       // time of the error (always present)
    //       context: "auth/session#create",
    //       // The app version when the event occurred (optional)
    //       appVersion: "0.1.0",
    //       // The release stage of the event (always present)
    //       releaseStage: "development",
    //       // The timestamp when the error was first created (always present)
    //       firstReceived: "2015-11-27T15:26:11.000Z",
    //       // The timestamp when this event was received (always present)
    //       receivedAt: "2015-11-27T15:26:11.000Z",
    //       // The request URL that caused the exception (optional)
    //       requestUrl: "http://localhost:3000/admin/raise_exception",
    //       // The user ID connected to the event (optional)
    //       userId: "5642494942656e7eac000004",
    //       // The bugsnag URL to the event (always present)
    //       url: "https://app.bugsnag.com/my-company/my-test-project/errors/56b9ca7f17025f8756f69054?event_id=56b9ca7f17025f8756f69054",
    //       // The severity of the error (always present)
    //       // - "error"   used when the app crashes
    //       // - "warning" used when Bugsnag.notify is called
    //       // - "info"    can be used in manual Bugsnag.notify calls
    //       severity: "error",
    //       // If there is a linked issue in an issue tracker then the details
    //       // will be given here (optional)
    //       createdIssue: {
    //           // The ID of the issue in the issue tracker (optional)
    //           id: "BUG123",
    //           // The number of the issue in the issue tracker (optional)
    //           number: 3,
    //           // The name of the issue tracker (always present)
    //           type: "bugify",
    //           // The url to view the issue (always present)
    //           url: "http://demo.bugify.com/issues/3",
    //       },
    //       // An object containing any further data attached to this
    //       // error event (optional)
    //       metaData: {
    //           // This is displayed as the first tab after the stacktrace on the
    //           // Bugsnag website (optional)
    //           someData: {
    //               // A key value pair that is be displayed in the first tab (optional)
    //               key: "value",
    //               // This is shown as a section within the first tab (optional)
    //               setOfKeys: {
    //                   key: "value",
    //                   key2: "value"
    //               }
    //           },
    //           // This would be the second tab on the Bugsnag website (optional)
    //           someMoreData: {
    //               ...
    //           }
    //       },
    //       // An array of stacktrace objects. Each object represents one line
    //       // in the exception's stacktrace (optional)
    //       stackTrace: [{
    //           // Whether or not this line is in the user's project code (always present)
    //           inProject: true,
    //           // The line of the file that this frame of the stack was in (optional)
    //           lineNumber: 1234,
    //           // The column of the file that this frame of the stack was in (optional)
    //           columnNumber: 123,
    //           // The file that this stack frame was executing (optional)
    //           file: "controllers/auth/session_controller.rb",
    //           // The method that this particular stack frame is within (optional)
    //           method: "create",
    //           // The code in this file surrounding this line, up to three lines
    //           // either side of the line that caused the problem (optional)
    //           code: {
    //               1231: "  def a",
    //               1232: "",
    //               1233: "    if problem?",
    //               1234: "      raise 'something went wrong'",
    //               1235: "    end"
    //               1236: "",
    //               1237: "  end"
    //           }
    //       }]
    //     }
    //   }
    if (body.account && body.project && body.trigger) {
      if (body.trigger.type !== 'comment' && body.trigger.type !== 'errorStateManualChange') {
        color = redColor;
      }

      const project = `${body.account.name}/${body.project.name}`;
      const message = (body.error && body.error.message) || body.trigger.message;

      return {
        content: {
          username: 'bugsnag',
          icon_url: 'https://bugsnag.com/favicon.ico',
          attachments: [{
            title: `Project ${project} has a new "${body.trigger.type}" event with message "${message}"`,
            title_link: (body.error && body.error.url) || body.project.url,
            color
          }]
        }
      };
    }

    if (body.trigger) {
      if (body.status === 'PROBLEM') {
        color = redColor;
      }

      return {
        content: {
          username: 'zabbix',
          icon_url: 'http://www.zabbix.com/favicon.ico',
          attachments: [{
            title: `Trigger "${body.trigger}" status changed to ${body.status}`,
            title_link: 'https://monitor.baomiding.com/tr_status.php?ddreset=1',
            color
          }]
        }
      }
    }

    // {
    //   "object_kind": "tag_push",
    //   "before": "0000000000000000000000000000000000000000",
    //   "after": "09bdc2c14f276e792a110df1910ee5350a0f2f52",
    //   "ref": "refs/tags/t3",
    //   "checkout_sha": "09bdc2c14f276e792a110df1910ee5350a0f2f52",
    //   "message": null,
    //   "user_id": 1,
    //   "user_name": "Aaron Wang",
    //   "user_email": "aaron.wang@augmentum.com",
    //   "project_id": 24,
    //   "repository": {
    //     "name": "Misc Tests",
    //     "url": "git@git.augmentum.com.cn:aaron.wang/misc-tests.git",
    //     "description": "",
    //     "homepage": "http://git.augmentum.com.cn/aaron.wang/misc-tests",
    //     "git_http_url": "http://git.augmentum.com.cn/aaron.wang/misc-tests.git",
    //     "git_ssh_url": "git@git.augmentum.com.cn:aaron.wang/misc-tests.git",
    //     "visibility_level": 0
    //   },
    //   "commits": [
    //     {
    //       "id": "09bdc2c14f276e792a110df1910ee5350a0f2f52",
    //       "message": "asdg fix issue #2\n",
    //       "timestamp": "2015-12-16T15:41:54+08:00",
    //       "url": "http://git.augmentum.com.cn/aaron.wang/misc-tests/commit/09bdc2c14f276e792a110df1910ee5350a0f2f52",
    //       "author": {
    //         "name": "inetfuture(Aaron Wang)",
    //         "email": "inetfuture@gmail.com"
    //       },
    //       "added": [
    //         "kkk"
    //       ],
    //       "modified": [],
    //       "removed": []
    //     }
    //   ],
    //   "total_commits_count": 1
    // }
    if (body.object_kind === 'tag_push') {
      return {
        content: {
          username: 'gitlab',
          icon_url: 'https://gitlab.com/favicon.ico',
          attachments: [{
            title: `Repository "${body.repository.name}" has a new tag ${body.ref.replace('refs/tags/', '')}`,
            title_link: `${body.repository.homepage}/tags`,
            color
          }]
        }
      };
    }

    return {
      content: {
        username: 'unknown',
        text: '```javascript\n' + JSON.stringify(body, null, 2) + '\n```'
      }
    };
  }
}
