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
          attachments: [{
            title: `${body.device_type} App "${body.title}" has a new version ${body.os_version}`,
            title_link: body.link,
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
          attachments: [{
            title: `Trigger "${body.trigger}" status changed to ${body.status}`,
            title_link: 'http://monitor.baomiding.com/tr_status.php?ddreset=1',
            color
          }]
        }
      }
    }

    return {
      content: {
        username: 'unknown',
        text: '```javascript\n' + JSON.stringify(body, null, 2) + '\n```'
      }
    };
  }
}
