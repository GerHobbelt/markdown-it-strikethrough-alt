// Process --strikethrough--
// Will not recognize '---' or '-test-'

'use strict';

module.exports = function strikethrough_alt_plugin(md) {

  function scanDelims(src, posMax, start) {
    var pos = start, count, can_open, can_close,
        max = posMax,
        marker = src.charCodeAt(start);
    while (pos < max && src.charCodeAt(pos) === marker) { pos++; }
    count = pos - start;
    can_open  = true;
    can_close = true;
    return {
      can_open:  can_open,
      can_close: can_close,
      length:    count
    };
  }

  function tokenize(state, silent) {
    var scanned, token, len, ch,
    start = state.pos,
    marker = state.src.charCodeAt(start);

    if (silent) { return false; }

    if (marker !== 0x2D) { return false; } // -

    scanned = scanDelims(state.src, state.posMax, state.pos);
    len = scanned.length;
    ch = String.fromCharCode(marker);

    if (len !== 2) { return false; }

    token         = state.push('text', '', 0);
    token.content = ch + ch;

    state.delimiters.push({
      marker: marker,
      jump:   0,
      token:  state.tokens.length - 1,
      level:  state.level,
      end:    -1,
      open:   scanned.can_open,
      close:  scanned.can_close
    });

    state.pos += scanned.length;

    return true;
  }

  function postProcess(state) {
    var i,
        startDelim,
        endDelim,
        token,
        delimiters = state.delimiters,
        max = state.delimiters.length;

    for (i = 0; i < max; i++) {
      startDelim = delimiters[i];

      if (startDelim.marker !== 0x2D /* - */) {
        continue;
      }

      if (startDelim.end === -1) {
        continue;
      }

      endDelim = delimiters[startDelim.end];

      token         = state.tokens[startDelim.token];
      token.type    = 's_open';
      token.tag     = 's';
      token.nesting = 1;
      token.markup  = '--';
      token.content = '';

      token         = state.tokens[endDelim.token];
      token.type    = 's_close';
      token.tag     = 's';
      token.nesting = -1;
      token.markup  = '--';
      token.content = '';
    }
  }

  md.inline.ruler.before('emphasis', 'strikethrough_alt_plugin', tokenize);
  md.inline.ruler2.before('emphasis', 'strikethrough_alt_plugin', postProcess);
};
