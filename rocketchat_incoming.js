class Script {
  process_incoming_request({ request }) {
    const body = request.content;
    let color = '#31af64';
    const dangerColor = '#b92b27';

    if (body.os_version) {
      return {
        content: {
          username: 'pgyer',
          attachments: [{
            text: `${body.device_type} App "${body.title}" has a new version ${body.os_version}`,
            title_link: body.link,
            color
          }]
        }
      };
    }

    if (body.build) {
      if (body.build.status === 'FAILURE') {
        color = dangerColor;
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

    if (body.trigger) {
      if (body.status === 'PROBLEM') {
        color = dangerColor;
      }

      return {
        content: {
          username: 'zabbix',
          attachments: [{
            title: `Trigger "${body.trigger}" status changed to ${body.status}`,
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
