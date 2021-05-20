# x509-certificate-parser

This vanilla Javascript library allows you to parse information from x.509 certificates to the following output.

```json
{
  "encryptionAlgo": "sha256WithRSAEncryption-PKCS",
  "countryName-X509": "FI",
  "stateOrProvinceName-X509": "Uusimaa",
  "localityName-X509": "Helsinki",
  "organizationName-X509": "Aalto University",
  "organizationalUnitName-X509": "Smartcom",
  "commonName-X509": "JaanTaponen",
  "emailAddress-PKCS": "jaan.taponen@aalto.fi",
  "UTCTime": "2021-04-17 12:11:39 UTC",
}
```
The wrapper code can be found in the [certInfo.js](./certInfo.js) but optionally you can add the following script tag to your HTML

```console
<script type="text/javascript" src="https://raw.githubusercontent.com/AaltoSmartCom/x509-certificate-parser/master/certificate-parser-min.js"></script
```

and then call the ```function decodeCert(cert)``` function with your encoded certificate.
