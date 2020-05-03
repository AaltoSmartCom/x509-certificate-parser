function decodeCert(cert) {
    der = atob(cert),
    asn1 = ASN1.decode(der),
    dump = function (e, append) {
      var s = append, t = e.typeName(), added = false;
      var content = t != 'NULL' ? String(e.content()).toString() : "NULL"

      if (t == 'SEQUENCE') {
        added = true;
      } else if (t == 'SET') {
        added = false;
      } else if (String(t).match('\[[0-9]\]')) {
      } else if (t == 'NULL') {
      } else if (t == 'BIT_STRING') {
      } else if (t == 'INTEGER') {
        s.push(content);
        added = true;
      } else if (t == 'OBJECT_IDENTIFIER') {
        var temp = content.split('.').join("").toString();
        temp = temp.split(" ")
        s.push(temp[2] + "-" + temp[4]); // may need to be shifted
        added = true;
      } else if (t == 'OCTET_STRING') {
        if (content != "(1 elem)") {
          s.push(content)
        }
      } else if (t == 'UTF8String') {
        s.push(content);
        added = true;
      } else if (t == 'PrintableString') {
        s.push(content);
        added = true;
      } else if (t == 'IA5String') {
        s.push(content);
        added = true;
      } else if (t == 'UTCTime') {
        s.push([String("UTCTime").toString(), content]);
        added = true;
      } else {
        s.push(content + "  " + t + " " + t.length)
        added = true;
      }

      if (e.sub) e.sub.forEach(function (e1) {
        if (added) {
          dump(e1, s)
        }
        else {
          s.push(dump(e1, []));
        }
      });
      return s;
    };

  listDump = dump(asn1, [])
  //console.log(listDump)
  listE = []

  for (var i = 0; i < listDump.length; i++) {
    if (Array.isArray(listDump[i])) {
      if (listDump[i].length == 2 && !listDump[i][0].startsWith("(2048 bit)")) { //strip cert binary value
        var dict = {};
        dict[listDump[i][0]] = listDump[i][1]
        listE.push(dict)
      } else if ((listDump[i].length == 7)) { //unecesssary boolean striå
        var dict = {};
        dict[listDump[i][0]] = listDump[i][1][0]
        listE.push(dict)
      }
    } else if (String(listDump[i]).startsWith("sha")) {
      var dict = {};
      var ebin = "encryptionAlgo"
      dict[ebin] = listDump[i]
      listE.push(dict)
    }
  }

  //Move list one dimension up so we get the object structure benefits.
  var result = {};
  for (var i = 0; i < listE.length; i++) {
    result[Object.keys(listE[i])[0]] = listE[i][Object.keys(listE[i])[0]];
  }
  return result
}
