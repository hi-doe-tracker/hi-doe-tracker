// import React from 'react';
// import { measureTypes } from '../../api/legislature/measureTypes';

export function getEmailHtml(organization, hearing, sender, filteredBills) {
  /* eslint-disable no-nested-ternary */
  const headerPortion = `
        <div>
  <center><span><b>From:</b> ${sender}</span></center>
    <hr />
    <span><b>Subject: </b>${hearing.notice}</span>
    <center>
        <h3>Notice of Hearing</h3>
        <p><b>DATE-TIME</b>: ${hearing.datetime}</p>
        <p><b>Location</b>: ${hearing.room}</p>
      </center>
      <p>          
${hearing.description} 
      </p>
      <div>
  ${organization === 'both' ? `<h2>FOR UH SYSTEM, UH HILO, UH WEST OAHU, & UH COMMUNITY COLLEGES:</h2>
  <fieldset>
    <ul>
      <li>Reply to Laura Chun (<a href = "mailto://llchun@hawaii.edu">llchun@hawaii.edu</a>) if testimony will be submitted (indicate your position) or if monitored
only.</li>
      <li>If providing testimony, send draft approved by your Dean/Director to <a href = "mailto://llchun@hawaii.edu">llchun@hawaii.edu</a> in Word format
(.doc/.docx) at least four hours before the submission deadline on hearing notice</li>
      <li>If providing oral testimony, include the first and last name of the testifier and whether testimony will be in
person or virtually via Zoom. For your reference, GRO has created a summary of oral testimony procedures,
which may be accessed here. </li>
      <li>
        Questions? Call Stephanie Kim at 808‐956‐4250 or 808‐284‐7807.
      </li>
    </ul>
  </fieldset>   
      
   <h2>FOR UH MANOA UNITS ONLY:</h2>
  <fieldset>
    <ul>
      <li>Reply to Elmer Kaai (<a href = "mailto://elmerk@hawaii.edu">elmerk@hawaii.edu)</a>if testimony will be submitted (indicate your position) or if monitored
only.</li>
      <li>If providing testimony, send draft approved by your Dean/Director to <a href = "mailto://llchun@hawaii.edu">llchun@hawaii.edu</a> in Word format
(.doc/.docx) at least four hours before the submission deadline on hearing notice</li>
      <li>If providing oral testimony, include the first and last name of the testifier and whether testimony will be in
person or virtually via Zoom. For your reference, GRO has created a summary of oral testimony procedures,
which may be accessed here. </li>
      <li>
        Questions? Call Elmer Kaai at 808‐956‐3816.
      </li>
    </ul>
  </fieldset>` : organization === 'manoa' ? `<h2>FOR UH MANOA UNITS ONLY:</h2>
  <fieldset>
    <ul>
      <li>Reply to Elmer Kaai (<a href = "mailto://elmerk@hawaii.edu">elmerk@hawaii.edu)</a>if testimony will be submitted (indicate your position) or if monitored
only.</li>
      <li>If providing testimony, send draft approved by your Dean/Director to <a href = "mailto://llchun@hawaii.edu">llchun@hawaii.edu</a> in Word format
(.doc/.docx) at least four hours before the submission deadline on hearing notice</li>
      <li>If providing oral testimony, include the first and last name of the testifier and whether testimony will be in
person or virtually via Zoom. For your reference, GRO has created a summary of oral testimony procedures,
which may be accessed here. </li>
      <li>
        Questions? Call Elmer Kaai at 808‐956‐3816.
      </li>
    </ul>
  </fieldset> ` : `<h2>FOR UH SYSTEM, UH HILO, UH WEST OAHU, & UH COMMUNITY COLLEGES:</h2>
    <fieldset>
      <ul>
        <li>Reply to Laura Chun (<a href = "mailto://llchun@hawaii.edu">llchun@hawaii.edu</a>) if testimony will be submitted (indicate your position) or if monitored
  only.</li>
        <li>If providing testimony, send draft approved by your Dean/Director to <a href = "mailto://llchun@hawaii.edu">llchun@hawaii.edu</a> in Word format
  (.doc/.docx) at least four hours before the submission deadline on hearing notice</li>
        <li>If providing oral testimony, include the first and last name of the testifier and whether testimony will be in
  person or virtually via Zoom. For your reference, GRO has created a summary of oral testimony procedures,
  which may be accessed here. </li>
        <li>
          Questions? Call Stephanie Kim at 808‐956‐4250 or 808‐284‐7807.
        </li>
      </ul>
    </fieldset>`
}`;

  // console.log(headerPortion)
  // }

  const info = `<p>The following measure(s) listed below are being tracked by the Government Relations Office. Please click on the NOTICE OF HEARING above to view the complete
hearing notice.</p>
<p>For each measure where your unit/department is lead (in Bold), please read the appropriate instructions below.</p>
<ul><li>A live stream of this Committee meeting will be available on the <a href="https://www.youtube.com/channel/UCekvvdL_uyq2DUyj1GjlrOA" target=_blank>Senate YouTube channel</a>.</li>
<li>A live stream of this Committee meeting will be available on the <a href="https://www.youtube.com/channel/UCekvvdL_uyq2DUyj1GjlrOA" target=_blank>House YouTube channel.</a></li>
<li>A live stream link of all Conference Committee meetings will be available online.</li>
<li>Click <a href="https://www.youtube.com/channel/UCekvvdL_uyq2DUyj1GjlrOA" target=_blank>here</a> for the live stream of House & Senate meetings via YouTube.</li></ul>
 </div><center><h2>Measures</h2></center>
`;

  const bills = filteredBills.map(bill => (`<fieldset>
  <center><h3>${bill.measureType.toUpperCase()}_${bill.measureNumber}</h3></center>
   <p>
  ${bill.description}
  </p>
  </fieldset>`)).join('');

  const signature = `<hr /><p><b><i>Best Regards,<i><b></p><p>${sender}</p></div>`;

  /* eslint-enable no-nested-ternary */

  return headerPortion.concat(info).concat(bills).concat(signature);
}
