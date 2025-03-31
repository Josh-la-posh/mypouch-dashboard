import React, { useEffect } from 'react';

function RedirectToLink({ externalLink }) {
  useEffect(() => {
    if (externalLink) {
      // Redirecting to the external URL
      window.location.href = externalLink;
    }
  }, [externalLink]);

  return <div>Redirecting...</div>;
}

export default RedirectToLink;