import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

function RedirectToLink({ externalLink }) {
  const openedRef = useRef(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (externalLink && !openedRef.current) {
      openedRef.current = true;
      try {
        const newWindow = window.open(externalLink, '_blank', 'noopener,noreferrer');
        if (!newWindow) {
          setFailed(true);
        }
      } catch {
        setFailed(true);
      }
    }
  }, [externalLink]);

  return (
    <div className="space-y-2">
      <p className="text-sm">Opening payment page in a new tab...</p>
      {failed && (
        <p className="text-xs">
          Pop-up blocked. <a href={externalLink} target="_blank" rel="noopener noreferrer" className="text-primary underline">Click here</a> to open manually.
        </p>
      )}
    </div>
  );
}

export default RedirectToLink;

RedirectToLink.propTypes = {
  externalLink: PropTypes.string,
};