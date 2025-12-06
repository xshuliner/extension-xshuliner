import pkg from '../../package.json';
import { EnumWebEnv } from '../types';
import { getEnv } from '../utils/index';

const { nodeEnv, webEnv } = getEnv();

const description =
  nodeEnv === 'development'
    ? `${nodeEnv} | ${webEnv} | ${pkg.description}`
    : pkg.description;

const key = {
  [EnumWebEnv.uat]:
    'MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCfeoPCImpryMvWzv1a2uUjzRoQOe34ryjn7zkHv2lte0KPTAdQYfE4vsNYIkXiishNOn7DtgDZaHUu4QDNF8oO1NtnBYmeH1ISFcLKpT4ugzDpgem1AER8vaOQdVxfw7XYsqJ5eRdRA3LmHIooug5Wc5CXplR2eABb1uf4LzsdqsveEFrZ5e7ESj29GhcBduyNmy94gq9Ym6tSTUGTWAuyFETnrkZOrIwioLrX4vwwLEypd7U0pOJLnTsPlcVNSkLjsvuwucjSTyoHAluNeYfyzL3gKbOC+dqEkCXPM/45V3DARgQI4UZ31JLdDYQDssWXJ2MMFIdigD/LAev/eEI7AgMBAAECggEALkwBSw71qROyRUpy13jbc3C748EFeh/Tdr2GZ17kitFxKatvJiFAx3HtwLy2YAVdD7pvCX7hMTw3ZKQSOPfygyq9BOPhJyO9jh1+Hpko+5S/UtKRl6ebukDNZocDiZOFy4JUU4JZR/4B0ZawbxFQTz2eWMADHh9JL2AsmGqRtVMmJLVqV6mekA7yO95fwASy4m/BxDjKClwmyiszQMxVgtefj4KobFtpn2FnYmLSLiZVdYXDlqn2GLCxy5CWJd0mlIq4xZku0CC6H/WCPwesgib8OPWteIFl9jQ0w8KAee5sSuAfjkwaCNGMPUXL+gLppiBQ9P7l9uEagh1aAFDxVQKBgQDN5pjff8M3iffiWfk6zXJjVH6o8lUge3Ort9lsEzNnUYKmvCnRvvkYxAAHeorhUIJJSXLAt9qs3M1HMjxEcg8gJSgVwHgClJOtVGFvW3wQpIwMhcq1xmc5fLRi1CFA9A/jVjx3YUBsUbcRLnYukyYFMn8vlPcJV6aYAHBzngxt3wKBgQDGSFBmOA9L1glsbmcY0MUMBf3ZxIRiOQyBsCEvEWU7Tn1H7lvQQSY1DX1uDQEsjEyya9ZNiaqOvhbFDkafSy2DPR2WUvDrtEMvBc2BTaLBId6RvxnpMbLzK0/PYyYcvTskr2AR7Vb9YHUuweSLpfF2+NgkbmCyb1KMjCSLnq2/JQKBgD5zoQ65S9b+rAclzyh8xCNIr5pC1nshtrXw76uOL1s5J+22yOBrklZmrLOYAaPRrZLZCktV+KfR2RmtLQZ9qgTQAFaIqF3v/tLl8x+5menaXvg1ZIS6Bvkyz+vh96wh2ufTckerYcT5DBPUCdianT+aT2V5Q2y7/zW/fFw1JgP1AoGALJ7BWP9skchMvpXppW/1p8sBYSwUDnaAFf8ouIrVmQ8Eqlc9WhQPIQk0HLvYc8nuyIfz5ecA9rZYMWgRBG/KgioSqm1nweMC62YG5P4vjf6tM2cp0YxZlNc+UpEhVn5O/OZqXB5o4QP/2tHPOI3TVM6S9T/RitX6YZ536uN+ffECgYARYinLlyvCx57Pv93gLM5UchApjBnSsNM4kMMMyUn8RD47BuFZcl7ZSnaETX2RofMFO9ig1snpRG4tLj9UFjZZjb6VrDeG6UsQVObGVWsccYq429+Egc7KXb6KudA93VO3Ni0Tp/mTPR+l07ZN5DvDcw3eGKZcdhOra9W5IrwzDw==',
  [EnumWebEnv.prod]:
    'MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDcABs5G3DVYOVQmTFifN8yaVUJs/sjQBC8gtdjU27bueFyyXPYlvmvOnnPP3C4FOrduvqUzwvC03Q6tGAaLz7wNCOvMbNJZWRkfNzQIgVVm2Q6yKAan1gPmr/REWT3837Z7Lgz08JChLfFK/eMIclUSr8hW00MKn6lfP9ZYO809n1PDsQH5ZAwlCr8syo5HwtCZQecYaEfWgaGRrWHXIEn1gTzQxFMq6lARIcE4/JgwsbqrAmw65By0tiG7ie/Wsdco31nP5x6PsJTHVFqkHy/h0iJgq+5+OAKF4hiQRJt1Jw/CWRuooBYdxWWCXHT3eOTzElKj3DNBsQhSnCTSr8DAgMBAAECggEAMshzgEMtUJQFWw2BsNJSUzitQIgjOIfZVSp+vZbMyDuoJu8Jpr1y9VfyNjzWsCdj77rxjNgeRuK4ubRZWrH9PUVL120Jja+x9OA9uG2h/ZjZEhitnHebxD5ceM4jGHlEltlly9Ddzq0EHqd/hQFnj+WRKQoCRwSoJ1srNl6B2R9/R/oXgXBaLOQRpPZYUwxnscLBsSf0nUDQ1ZJkUyK9zZ4fmgBwqd/nJ2t6jI9Grul2S8JKKAe4ZdOH20o7gh276+sXZxp6cowIwtdoayOLEAjTYS7F4gfBa/u1gahz2aR8iLAN5wUsCASSKFlBtV6+6AmWinGGq7+vUDYoUF2xgQKBgQDyBf9XxFOHWvq7IAixwv1/jgvIIOiuZ/j/x9nLvkfyqLx1oIRZicMKPNrRDY/qwDkk4pisJYQ2ZCuJ9si9hF0iCrvuonWpYhQy8IObbxjmpLePZEPc3RksXxtdA2IEzpIj5XplPud49LWPJ9mwdlMarqGQGLbrLmv0O0UZOt0CiwKBgQDotIb4dLcRI5tbZwXC5VTxZ4w6IuhEQtyorvAQAQHbypMKg+L0PHf4GoSeI5DlIud/SVFnY0zPeLk3TElPfMN3ZheyM1xnB0UJyTbUZjaiomT8zPFEkRogctoHZ5HuCyZ6Sv7XzpzJtG5du9X2/5UASRFL4FjXbx1mcNODXkicaQKBgHWJ3BxvyHEwChzezdom7J4KCkbDVL1+2Tq/gFKmsqJyuDQYJK6nbQWH0G0+vOoxOI9lTOgtwCv6Mfrq00rXAbQKqoKWe7YrX8vtar0OE3XQASWueBbHefZGqi9d+TiEagzs4ahSCHCBx7sii2Jb1LhcnzIwDoXhIaSXNFOwdq1JAoGARNeDRmVg8xURlMy5i5rEslXryhchl3AgT1bRdiqWHiujrGyv64koBKHzscTbzK2yxpkuF+PsiUQxpwZOedFzEhOF1xYSs/gWmHqKWfOTHjHkplUK2zoB/K99iMs/BKkPzQX6tmVNRO6358r11Yhu0BLNpyDLp5Abpn6iVC7EVGECgYA9YN8SLPvnJwP88cuzDbLAbdnZ+qKhPPjMiXsbGawTm0e9Optl1cCFeAIxluZ800ecAXCKfLtdxtLlnhuwshaQu2pNbutPAm3RVPHoxPz4vZHMJRDWVz+gSNXo2SaqlpPbmHmxzhWF90R/e+gIXKdX/g04kFhlF8iai5tyvHZtNQ==',
}[webEnv as EnumWebEnv];

export const manifestBase = {
  manifest_version: 3,
  name: pkg.name,
  version: pkg.version,
  description,

  key,

  action: {
    default_popup: 'src/popup/index.html',
    default_title: pkg.name,
    default_icon: {
      '16': 'icon_16x16.png',
      '48': 'icon_48x48.png',
      '128': 'icon_128x128.png',
    },
  },

  background: {
    service_worker: 'src/background/index.ts',
  },

  // Note: side panel varies by browser. Chrome/Edge use `side_panel` and permission `sidePanel`.
  // Firefox uses `sidebar_action`. These are defined in browser-specific manifests.

  // DevTools page
  // devtools_page: 'src/devtools/devtools.html',

  // Override new tab
  // chrome_url_overrides: {
  //   newtab: 'src/newtab/index.html',
  // },

  // Options page
  // options_ui: {
  //   page: 'src/options/index.html',
  //   open_in_tab: true,
  // },

  content_scripts: [
    {
      matches: ['<all_urls>'],
      js: ['src/content/index.tsx'],
    },
  ],

  icons: {
    '16': 'icon_16x16.png',
    '48': 'icon_48x48.png',
    '128': 'icon_128x128.png',
  },
};
