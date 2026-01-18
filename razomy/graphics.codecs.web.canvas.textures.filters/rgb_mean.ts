export function rgbMean(pTab: any) {
  var m = [0, 0, 0];
  for (var i = 0; i < pTab.length; i++) {
    m[0] += pTab[i][0];
    m[1] += pTab[i][1];
    m[2] += pTab[i][2];
  }

  m[0] /= pTab.length;
  m[1] /= pTab.length;
  m[2] /= pTab.length;
  return m;
}
