const SEGMENT_WRITE_KEY = '';
// determines whether All: false is added to Segment's analytics.load integrations object https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/#selecting-destinations
const DISABLE_DESTINATIONS_BY_DEFAULT = false;

// mapping OneTrust cookie categories to Segment's tool categories https://community.cookiepro.com/s/article/UUID-91049ba1-62b7-f7d3-8582-e3b36fadb7c9
const ONE_TRUST_SEGMENT_MAPPING = {
  // OneTrust Performance Cookies
  C0002: ['A/B Testing', 'Feature Flagging', 'Live Chat'],
  // OneTrust Functional Cookies
  C0003: ['Analytics', 'Raw Data'],
  // OneTrust Targeting Cookies
  C0004: ['Email', 'Email Marketing', 'CRM']
};

// helper function gets OneTrust active groups from window. Returns array of active groups users consented to
function getConsentGroups() {
  if (!window.OnetrustActiveGroups) {
    return [];
  }
  const oneTrustActiveGroupArray = window.OnetrustActiveGroups.split(',').filter(e =>
    e.startsWith('C')
  );

  return oneTrustActiveGroupArray;
}

async function getConsentedIntegrations(enabledIntegrations, oneTrustGroupIds) {
  // Get consented segment categories.
  const segmentCategories = oneTrustGroupIds
    .map(oneTrustGroupId => ONE_TRUST_SEGMENT_MAPPING[oneTrustGroupId])
    .filter(segmentCategory => segmentCategory)
    .flat(1); // Filter out `null` mappings.

  // Filter enabled integrations by consented segment categories.
  const consentedIntegrations = enabledIntegrations.filter(enabledIntegration => {
    const isConsented = segmentCategories.includes(enabledIntegration.category);
    return isConsented;
  });

  return consentedIntegrations;
}

// helper function determines whether user has given consent for any cookie groups OTHER than strictly necessary. Returns boolean
function shouldLoadAjs(oneTrustActiveGroups) {
  return (
    oneTrustActiveGroups.includes('C0002') ||
    oneTrustActiveGroups.includes('C0003') ||
    oneTrustActiveGroups.includes('C0004')
  );
}

// Calls Segment API to get all destinations connected to source write key. Returns object of destination info
async function fetchDestinationForWriteKey(writeKey) {
  if (!writeKey) {
    return [];
  }
  // To get currently enabled integrations, execute HTTP get to: https://codepen.io/samuelkahr/pen/gOpWyEG
  const res = await window.fetch(`https://cdn.segment.com/v1/projects/${writeKey}/integrations`);

  if (!res.ok) {
    throw new Error(
      `Failed to fetch integrations for write key ${writeKey}: HTTP ${res.status} ${res.statusText}`
    );
  }

  const destinations = await res.json();

  // Rename creationName to id to abstract default data model
  for (const destination of destinations) {
    destination.id = destination.creationName;
    delete destination.creationName;
  }

  console.log("Anne16")
  console.log(destinations)
  return destinations;
}

// Main executable that calls other helper functions. If user has consented to active group
// other than strictly necessary, loads A.js with destination preferences
async function loadAnalytics() {
  const enabledIntegrations = await fetchDestinationForWriteKey(SEGMENT_WRITE_KEY);
  const oneTrustGroupIds = getConsentGroups();

  const consentedIntegrations = await getConsentedIntegrations(
    enabledIntegrations,
    oneTrustGroupIds
  );

  // If All:false is added to integrations object, you need to be sure to add Segment.io:true or else data will not be sent to Segment + cloud mode destinations
  const destinationPreferences = DISABLE_DESTINATIONS_BY_DEFAULT
    ? { All: false, 'Segment.io': true }
    : {};

  // setting consented destination to truthy in destinationPreferences
  consentedIntegrations.forEach(consentedIntegration => {
    destinationPreferences[consentedIntegration.id] = true;
  });

  // creating array with names of destinations consented to
  const consentedIntegrationArray = [];
  for (const value in consentedIntegrations) {
    consentedIntegrationArray.push(consentedIntegrations[value].name);
  }

  // setting destinations w/o consent to false in destinationPreferences
  enabledIntegrations.forEach(integration => {
    if (!consentedIntegrationArray.includes(integration.name)) {
      destinationPreferences[integration.name] = false;
    }
  });

  // calling helper funciton to determine whether any categories other than strictly necessary have been consented to
  const loadAjs = shouldLoadAjs(oneTrustGroupIds);

  // Segment integrations object https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/#load-options
  if (loadAjs) {
    console.log('Anne1');
    window.destinationPreferences = destinationPreferences;
    // console.log(destinationPreferences);
    window.analytics.load(SEGMENT_WRITE_KEY, {
      integrations: destinationPreferences
    });
  } else {
    console.log('Anne12');
    console.log('No groups other than strictly necessary consented to');
  }
}

loadAnalytics();
