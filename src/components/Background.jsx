export default function Background() {
  return (
      <div className="fixed inset-0 -z-10">
          <svg
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1000 1000"
              preserveAspectRatio="none"
          >
              <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#1E3A8A', stopOpacity: 1 }} />  {/* Dark Blue */}
                  <stop offset="100%" style={{ stopColor: '#4B5563', stopOpacity: 1 }} /> {/* Grey */}
                  </linearGradient>
                  <radialGradient id="grad2" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                      <stop offset="0%" style={{ stopColor: '#FFF8E7', stopOpacity: 0.8 }} /> {/* Creamish white */}
                      <stop offset="100%" style={{ stopColor: '#F8F3EB', stopOpacity: 0 }} /> {/* Almost white */}
                  </radialGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#grad1)" />
              <circle cx="0" cy="0" r="600" fill="url(#grad2)">
                  <animateTransform
                      attributeName="transform"
                      type="translate"
                      values="0 0; 1000 1000; 0 0"
                      dur="30s"
                      repeatCount="indefinite"
                  />
              </circle>
              <circle cx="1000" cy="1000" r="600" fill="url(#grad2)">
                  <animateTransform
                      attributeName="transform"
                      type="translate"
                      values="0 0; -1000 -1000; 0 0"
                      dur="30s"
                      repeatCount="indefinite"
                  />
              </circle>
          </svg>
      </div>
  );
}
