import { NextApiRequest, NextApiResponse } from "next";
import { isASCII } from "../../../utils/characterSet";
import imagemin from "imagemin";
import svgo from "imagemin-svgo";

export default function generateSvg(req: NextApiRequest, res: NextApiResponse) {
  const { hex } = req.query;

  if (typeof hex === "string" && /^0x([a-fA-F0-9]{2})+$/.test(hex)) {
    let name = Buffer.from(hex.substring(2), "hex").toString("utf8");
    let domain;
    const isAscii = isASCII(name);
    if (name.includes(".")) {
      const split = name.split(".");
      domain = split.pop();
      name = split.join(".");
    }

    return imagemin
      .buffer(
        Buffer.from(
          `<?xml version="1.0" encoding="utf-8"?>
        <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            width="500px" height="500px" viewBox="-100 -100 1600 1600" enable-background="new 0 0 708.661 255.118"
            xml:space="preserve">
            <defs>
                <linearGradient gradientTransform="rotate(60, 0.5, 0.5)" id="gradient">
                    <stop stop-color="#ff4800" stop-opacity="1" offset="0%"></stop>
                    <stop stop-color="#c7007b" stop-opacity="1" offset="50%"></stop>
                    <stop stop-color="#2d388a" stop-opacity="1" offset="100%"></stop>
                </linearGradient>
                <style>
                    @font-face {
                        font-family: 'Poppins';
                        font-style: normal;
                        font-weight: 700;
                        src: url(data:font/woff2;base64,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) format('woff2');
                        unicode-range: U+0100-02AF, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
                    }
                    @font-face {
                        font-family: 'Poppins';
                        font-style: normal;
                        font-weight: 700;
                        src: url(data:font/woff2;base64,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) format('woff2');
                        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
                    }
                    text {
                        font-weight: bold;
                        font-family: 'Poppins', sans-serif;
                    }
                </style>
                <mask id="tla">
                    <rect x="1120" y="25" width="200" height="200" fill="#fff" />
                    <text font-size="90px" fill="#000" text-anchor="middle" alignment-baseline="middle" transform="translate(1220, 125) rotate(20)">TLA</text>
                </mask>
            </defs>
            <rect width="2000" height="2000" fill="url(#gradient)" x="-500" y="-500" />
            <g fill="#fff">
                <polygon points="104.687,129.11 113.291,138.4 158.395,88.217 141.441,88.217"/>
                <polygon points="76.657,114.179 85.657,104.136 85.657,47.201 76.657,47.201"/>
                <polygon points="157.385,187.467 124.325,187.467 130.774,194.467 163.869,194.467"/>
                <polygon points="76.657,143.182 76.657,187.467 58.997,187.467 58.997,194.467 85.657,194.467 85.657,152.951"/>
                <path d="M199.311,155.59c-1.872-4.233-2.814-9.014-2.814-14.346c0-9.115,2.726-16.585,8.176-22.413
                    c5.45-5.826,12.295-8.74,20.537-8.74c2.376,0,4.633,0.236,6.777,0.691c-0.005-0.005-0.01-0.011-0.015-0.017
                    c-4.971-5.164-11.108-7.674-18.762-7.674c-7.441,0-13.442,2.548-18.346,7.79c-4.957,5.3-7.367,11.961-7.367,20.363
                    c0,8.47,2.457,15.21,7.51,20.605C196.365,153.301,197.8,154.542,199.311,155.59z"/>
                <polygon points="270.895,88.217 270.895,187.467 253.235,187.467 253.235,194.467 279.895,194.467 279.895,88.217"/>
                <path d="M238.235,187.467v-7.665c-3.812,2.986-7.663,5.297-11.501,6.896c-5.583,2.325-11.697,3.503-18.176,3.503
                    c-5.946,0-11.583-0.971-16.9-2.869c8.492,6.569,18.122,9.869,28.9,9.869c6.112,0,11.786-1.092,17.021-3.271
                    c3.592-1.497,7.177-3.662,10.755-6.463H238.235z"/>
                <path d="M349.34,103.092c-7.62,0-13.75,2.512-18.741,7.678c-5.019,5.196-7.458,11.861-7.458,20.377
                    c0,8.724,2.445,15.538,7.476,20.834c1.337,1.408,2.759,2.616,4.266,3.639c-1.825-4.229-2.742-9.052-2.742-14.473
                    c0-9.244,2.767-16.732,8.301-22.461c5.533-5.728,12.5-8.594,20.899-8.594c2.221,0,4.336,0.213,6.353,0.627
                    C362.8,105.59,356.795,103.092,349.34,103.092z"/>
                <path d="M324.313,179.794v46.54h-17.465v7h26.465v-47.809C330.3,184.035,327.292,182.123,324.313,179.794z"/>
                <path d="M402.259,101.205c-0.975-1.052-1.975-2.038-2.991-2.984c5.672,9.415,8.542,20.573,8.542,33.317
                    c0,16.535-5.334,30.584-15.855,41.754c-10.569,11.221-23.297,16.91-37.829,16.91c-5.5,0-10.746-0.856-15.642-2.531
                    c3.502,2.702,7.02,4.799,10.552,6.26c5.273,2.18,10.969,3.271,17.09,3.271c13.736,0,25.617-5.322,35.645-15.967
                    c10.025-10.645,15.039-23.877,15.039-39.697C416.81,125.131,411.958,111.688,402.259,101.205z"/>
                <path d="M471.117,87.711c1.121,2.881,1.743,6.01,1.743,9.283c0,14.159-11.519,25.677-25.678,25.677
                    c-1.645,0-3.252-0.162-4.812-0.458c4.149,4.581,10.144,7.458,16.812,7.458c12.525,0,22.678-10.152,22.678-22.677
                    C481.86,98.849,477.564,91.71,471.117,87.711z"/>
                <path d="M471.117,155.712c1.121,2.881,1.743,6.01,1.743,9.282c0,14.158-11.519,25.677-25.678,25.677
                    c-1.645,0-3.252-0.162-4.812-0.459c4.149,4.581,10.144,7.459,16.812,7.459c12.525,0,22.678-10.152,22.678-22.677
                    C481.86,166.85,477.564,159.711,471.117,155.712z"/>
                <polygon points="587.657,47.146 514.182,213.146 493.552,213.146 490.453,220.146 524.229,220.146 600.803,47.146"/>
                <polygon points="660.862,47.146 587.387,213.146 566.757,213.146 563.658,220.146 597.434,220.146 674.008,47.146"/>
                <rect x="49.997" y="40.201" width="20.66" height="141.266"/>
                <polygon points="145.001,181.467 96.564,129.17 139.665,81.217 114.254,81.217 71.587,128.826 120.089,181.467"/>
                <path d="M264.895,181.467V81.217h-20.66v16.036l-5.137-5.211c-4.453-4.518-9.352-7.947-14.561-10.19
                    c-5.191-2.235-10.829-3.369-16.758-3.369c-13.097,0-23.927,4.828-33.107,14.759c-9.115,9.861-13.737,22.746-13.737,38.296
                    c0,14.957,4.779,27.622,14.206,37.642c9.51,10.108,20.442,15.022,33.418,15.022c5.683,0,11.021-1.023,15.868-3.041
                    c4.869-2.029,9.829-5.428,14.741-10.098l5.067-4.818v15.223H264.895z M236.312,156.11c-6.079,6.422-13.819,9.678-23.007,9.678
                    c-8.935,0-16.564-3.31-22.678-9.836c-6.059-6.47-9.131-14.782-9.131-24.707c0-9.857,3.023-18.087,8.985-24.462
                    c6.016-6.431,13.663-9.691,22.728-9.691c9.241,0,17.008,3.201,23.085,9.513c6.046,6.282,9.112,14.539,9.112,24.542
                    C245.407,141.335,242.347,149.734,236.312,156.11z"/>
                <path d="M388.057,93.243c-9.192-9.932-20.036-14.76-33.15-14.76c-5.938,0-11.585,1.134-16.784,3.369
                    c-5.222,2.247-10.164,5.68-14.689,10.205l-5.121,5.122V81.217h-20.465v139.118h20.465V166.25l5.066,4.813
                    c4.915,4.669,9.896,8.065,14.803,10.096c4.886,2.02,10.25,3.044,15.943,3.044c12.993,0,23.938-4.914,33.461-15.023
                    c9.438-10.021,14.223-22.685,14.223-37.641C401.81,115.99,397.183,103.105,388.057,93.243z M372.084,155.956
                    c-6.131,6.524-13.783,9.832-22.744,9.832c-9.214,0-16.977-3.255-23.074-9.674c-6.055-6.375-9.125-14.775-9.125-24.967
                    c0-10.006,3.076-18.265,9.143-24.545c6.095-6.311,13.853-9.51,23.056-9.51c9.156,0,16.857,3.259,22.891,9.687
                    c5.982,6.375,9.016,14.606,9.016,24.466C381.247,141.17,378.164,149.485,372.084,155.956z"/>
                <path d="M447.183,77.316c-10.85,0-19.677,8.828-19.677,19.678s8.827,19.677,19.677,19.677
                    c10.851,0,19.678-8.827,19.678-19.677S458.033,77.316,447.183,77.316z"/>
                <path d="M447.183,145.317c-10.85,0-19.677,8.827-19.677,19.678c0,10.85,8.827,19.677,19.677,19.677
                    c10.851,0,19.678-8.827,19.678-19.677C466.86,154.144,458.033,145.317,447.183,145.317z"/>
                <polygon points="556.98,40.146 483.062,207.146 510.275,207.146 584.194,40.146"/>
                <polygon points="630.186,40.146 556.267,207.146 583.48,207.146 657.399,40.146"/>
            </g>
            <text fill="#fff" x="50" y="${
              domain !== undefined ? 1140 : 1300
            }" font-size="200px">${name}</text>
            ${
              domain !== undefined
                ? `<text fill="#fff" x="50" y="1300" font-size="120px">.${domain}</text>`
                : `<circle cx="1220" cy="125" r="100" fill="#fff" mask="url(#tla)" />`
            }
            ${
              !isAscii
                ? `<text x="1220" y="1300" font-size="80px">⚠️</text>`
                : ""
            }
        </svg>
    `
        ),
        { plugins: [svgo()] }
      )
      .then((buffer: Buffer) => {
        return res
          .status(200)
          .setHeader("Cache-Control", "max-age=43200, immutable")
          .setHeader("Content-Type", "image/svg+xml")
          .send(buffer);
      })
      .catch(() => {
        return res.status(500).json({ error: "Error generating image" });
      });
  } else {
    return res.status(500).json({ error: "Hex parameter is required" });
  }
}
