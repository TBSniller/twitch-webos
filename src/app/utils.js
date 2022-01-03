
export function extractLaunchParams() {
    if (window.launchParams) {
      return JSON.parse(window.launchParams);
    } else {
      return {};
    }
  }
  
  export function handleLaunch(params) {
    // We use our custom "target" param, since launches with "contentTarget"
    // parameter do not respect "handlesRelaunch" appinfo option. We still
    // fallback to "contentTarget" if our custom param is not specified.
    //
    let { target, contentTarget = target } = params;
  
    if (contentTarget && typeof contentTarget === 'string') {
  
      if (contentTarget.indexOf('https://twitch.tv/') === 0) {
        console.info('Launching from direct contentTarget:', contentTarget);
        window.location = contentTarget;
      } else {
        console.info('Launching from partial contentTarget:', contentTarget);
        window.location = 'https://twitch.tv/' + contentTarget;
      }
    } else {
      console.info('Default launch');
      window.location = 'https://twitch.tv/';
    }
  }