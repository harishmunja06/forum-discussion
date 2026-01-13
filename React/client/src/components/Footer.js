// import React from "react";
// import "../styles/Footer.css";

// export default function Footer() {
//   return (
//     <footer className="footer">
//       <div className="footer-links">
//         <a href="#">About</a>
//         <a href="#">Careers</a>
//         <a href="#">Privacy Policy</a>
//         <a href="#">Terms</a>
//         <a href="#">Contact</a>
//         <a href="#">Languages</a>
//         <a href="#">ForumFusion, Inc. © 2025. All rights reserved.</a>
//       </div>
//     </footer>
//   );
// }

import React from 'react';

export default function Footer() {
  return (
    <footer>
      <p>
        <a href="#">About</a> | <a href="#">Careers</a> | <a href="#">Privacy Policy</a> | 
        <a href="#"> Terms</a> | <a href="#">Contact</a> | <a href="#">Languages</a>
      </p>
      <p>ForumFusion, Inc. © 2025. All rights reserved.</p>
    </footer>
  );
}
